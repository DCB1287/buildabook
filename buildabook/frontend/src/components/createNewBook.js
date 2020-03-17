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
    numberOfChapters: 0,
    duration: 0,
    media: "",
    prompt: ""
}

function CreateNewBook() {
    const [modalOpen, setModalOpen] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const [mediaPreview, setMediaPreview] = React.useState("");
    const [book, setBook] = React.useState(INITIAL_BOOK)

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
    async function handleImageUpload() {
        setLoading(true)
        const data = new FormData();
        data.append("file", book.media);
        data.append("upload_preset", "buildabook");
        data.append("api_key", "915379326722133");
        console.log(book.media)
        const response = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
        const mediaUrl = response.data.url;
        return mediaUrl;
      }

    async function handleSubmit(event) {
        try {
            event.preventDefault()
            setLoading(true)
            //const mediaUrl = await handleImageUpload()
            //const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/book/create)
            setSuccess("Your book has been added!")
            setError("")
            setModalOpen(false)
            setBook(INITIAL_BOOK)
        } catch(error) {
            setError(error)
            setSuccess("")
        } finally {
            setLoading(false)
            setDisabled(false)
        }
    }

    return (
        <>
            <Modal 
                trigger={<Button color='green' floated='right' onClick={ () => setModalOpen(true)}>+BuildABook</Button>} 
                open={modalOpen}
            >
            {!isLoggedIn ?  
                (
                <Segment>
                    <Message 
                        attached
                        icon="book"
                        header="Build a Book!"
                        color='green'  
                    />
                    <br />
                        <Form error={Boolean(error)} success={success} loading={loading} onSubmit={handleSubmit} disabled={loading}>
                            <Message success header="Success" content={success} />
                            <Message error header="Oops!" content={error} />
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
                                name="media"
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
                                onClick={ () => { 
                                        setModalOpen(false);
                                        setBook(INITIAL_BOOK);
                                    }
                                }   
                                icon="window close outline"
                                color="red"
                                content="Cancel"
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