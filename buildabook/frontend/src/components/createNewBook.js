import React from 'react'
import axios from 'axios'
import { Modal, 
    Button, 
    Form, 
    Message,
    Segment,
    Select, 
    Input,
    Image } from 'semantic-ui-react'
import cookie from 'js-cookie'
import Login from '../pages/Login'

const isLoggedIn = cookie.get("token")

const INITIAL_BOOK = {
    title: "",
    author: "",
    numberOfChapters: 0,
    duration: 0,
    image: "",
    writingPrompt: ""
}

function CreateNewBook() {
    const [modalOpen, setModalOpen] = React.useState(false)
    const [error, setError] = React.useState("")
    const [success, setSuccess] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const [mediaPreview, setMediaPreview] = React.useState("");
    const [book, setBook] = React.useState(INITIAL_BOOK)

    React.useEffect(() => {
        if (Boolean(success)) {
            const timer = setTimeout(() => { setModalOpen(false) }, 2000);
            return () => clearTimeout(timer);
        }
      }, [success]);

    const durationOptions = [
        {key: 's', text: "30 Seconds", value: 30 },
        {key: 'm', text: "5 minutes", value: 300 },
        {key: 'h', text: "1 hour", value: 3600 },
    ]
    const chapterOptions = [
        {key: '1', text: "1", value: 1},
        {key: '2', text: "2", value: 2},
        {key: '3', text: "3", value: 3},
        {key: '4', text: "4", value: 4},
        {key: '5', text: "5", value: 5},
    ]
    
    //Handles the change for the input fields
    function handleInputChange(event) {
        const { name, value, files } = event.target;
        if (name === "media") {
            setBook(prevState => ({ ...prevState, media: files[0] }));
            setMediaPreview(window.URL.createObjectURL(files[0]));
        } else {
            setBook(prevState => ({ ...prevState, [name]: value }));
        }
    }

    //Handles the change for the select fields
    function handleSelectChange(event, result) {
        const {name, value} = result
        setBook(prevState => ({ ...prevState, [name]: value }))
    }


    //Get Cloudinary Url
    async function handleImageUpload(media) {
        setLoading(true)
        const data = new FormData();
        data.append("file", media);
        data.append("upload_preset", "buildabook");
        data.append("api_key", "915379326722133");
        console.log(book.media)
        const response = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
        const mediaUrl = response.data.url;
        return mediaUrl;
      }

    async function handleSubmit(event) {
        const author = JSON.parse(cookie.get('token')).user.id
        console.log(author)
        try {
            event.preventDefault()
            setLoading(true)
            //Upload the image to cloudinary or if one does not exist, use default book picture
            let image;
            if (book.image) {
                image = await handleImageUpload(book.image)
            } else {
                image = "https://png.pngtree.com/png-vector/20190307/ourlarge/pngtree-vector-open-book-icon-png-image_782619.jpg"
            }
            //Create the payload
            const {title, numberOfChapters, duration, writingPrompt} = book
            const payload = {title, numberOfChapters, duration, writingPrompt, author, image}
            //Call the API
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/book/add`, payload)

            //Set Messages and reset the book state
            setSuccess(response.message)
            setError("")
            setBook(INITIAL_BOOK)
        } catch(error) {
            setError(error)
        } finally {
            setLoading(false)
            setDisabled(false)
        }
    }

    return (
        <>
            <Modal 
                trigger={<Button color='green' floated='right' onClick={ () => 
                    {
                        setModalOpen(true); 
                        setBook(INITIAL_BOOK);
                        setSuccess("")
                        setError("")
                    }}>+BuildABook</Button>} 
                open={modalOpen}
            >
            {isLoggedIn ?  
                (
                <Segment>
                    <Message 
                        attached
                        icon="book"
                        header="Build a Book!"
                        color='green'  
                    />
                    <br />
                        <Form error={Boolean(error)} success={Boolean(success)} loading={loading} onSubmit={handleSubmit} disabled={loading}>
                            <Message success header="Success" content={success} />
                            
                            <Form.Group>
                                <Form.Field
                                    width={8}
                                    control="input"
                                    required
                                    label="Title"
                                    placeholder="Title"
                                    name="title"
                                    value={book.title} 
                                    onChange={handleInputChange}
                                />

                                <Form.Field 
                                    width={4}
                                    required
                                    control={Select}
                                    options={chapterOptions}
                                    label="Number of Chapters"
                                    placeholder="Number of Chapters"
                                    name="numberOfChapters"
                                    value={book.numberOfChapters} 
                                    onChange={handleSelectChange}
                                />
                                <Form.Field 
                                    width={2}
                                    required
                                    control={Select}
                                    options={durationOptions}
                                    label="Duration"
                                    placeholder="Duration"
                                    name="duration"
                                    value={book.duration} 
                                    onChange={handleSelectChange}
                                />
                            </Form.Group>
                            <Form.Field
                                control={Input}
                                name="image"
                                type="file"
                                label="Media"
                                accept="image/*"
                                content="Select Image"
                                onChange={handleInputChange}
                            />
                            <Image src={mediaPreview} rounded centered size="medium" inline />
                            <Form.Field
                                required
                                control='textarea'
                                label="Prompt"
                                placeholder="What is your book about?"
                                name="writingPrompt"
                                value={book.writingPrompt} 
                                onChange={handleInputChange}
                            />
                            <Button 
                                disabled={disabled || loading}
                                icon="send"
                                type="submit"
                                color="green"
                                content="Submit"
                            />
                            <Button 
                                disabled={disabled || loading}
                                icon='cancel'
                                color='red'
                                content='Cancel'
                                onClick={() => {setModalOpen(false); setBook(INITIAL_BOOK);}}
                            />
                        </Form>
                    </Segment>
                    ):(
                        <Segment>
                            <Login />
                        </Segment>
                    )}
            </Modal>
        </>
    )
}

export default CreateNewBook