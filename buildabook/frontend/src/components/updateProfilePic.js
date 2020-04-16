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

const INITIAL_PROFILEPIC = {
    profilePic: "",
    
}

function UpdateProfilePic() {
    const [modalOpen, setModalOpen] = React.useState(false)
    const [error, setError] = React.useState("")
    const [success, setSuccess] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const [mediaPreview, setMediaPreview] = React.useState("");
    const [user, setUser] = React.useState(INITIAL_PROFILEPIC)

    

   
    //Handles the change for the input fields
    function handleInputChange(event) {
        const { name, value, files } = event.target;
        if (name === "media") {
            setUser(prevState => ({ ...prevState, media: files[0] }));
            setMediaPreview(window.URL.createObjectURL(files[0]));
        } else {
            setUser(prevState => ({ ...prevState, [name]: value }));
        }
    }

    //Get Cloudinary Url
    async function handleImageUpload(media) {
        setLoading(true)
        const data = new FormData();
        data.append("file", media);
        data.append("upload_preset", "buildabook");
        data.append("api_key", "915379326722133");
        console.log(user.media)
        const response = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
        const mediaUrl = response.data.url;
        return mediaUrl;
      }

    async function handleSubmit(event) {
        const author = JSON.parse(cookie.get('token')).user.username
        console.log(author)
        try {
            event.preventDefault()
            setLoading(true)
            //Upload the image to cloudinary or if one does not exist, use default profile picture
            let image;
            if (user.profilePic) {
                image = await handleImageUpload(user.profilePic)
            } else {
                image = "https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png"
            }
            //Create the payload
            const {profilePic} = user
            const payload = {profilePic}
            console.log(payload)
            //Call the API
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/book/add`, payload)

            //Set Messages and reset the profile pic state
            setSuccess(response.message)
            setError("")
            setUser(INITIAL_PROFILEPIC)
        } catch(error) {
            setError(error)
            console.log(error)
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
                        setUser(INITIAL_PROFILEPIC);
                        setSuccess("")
                        setError("")
                    }}>Update Profile Pic</Button>} 
                open={modalOpen}
            >
            {isLoggedIn ?  
                (
                <Segment>
                   
                    <br />
                        <Form error={Boolean(error)} success={Boolean(success)} loading={loading} onSubmit={handleSubmit} disabled={loading}>
                            <Message success header="Success" content={success} />
                            
                            <Form.Group>
                                  
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
                                onClick={() => {setModalOpen(false); setUser(INITIAL_PROFILEPIC);}}
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

export default UpdateProfilePic