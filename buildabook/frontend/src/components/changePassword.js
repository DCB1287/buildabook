import React from 'react'
import userData from '../placeholder data/user'
import { Header, Form, Button, Modal, Segment, Message } from 'semantic-ui-react'
import axios from 'axios'
import cookie from 'js-cookie'

function ChangePassword(props) {

    const INITIAL_USER = {
        email: "",
        password: "",
        newPassword: "",
        matchPassword: ""
    }

    //React states for the contact component
    const [user, setUser] = React.useState(INITIAL_USER)
    const [disabled, setDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [modalOpen, setModalOpen] = React.useState(false)

    React.useEffect(() => {
        if (Boolean(success)) {
            const timer = setTimeout(() => { setModalOpen(false) }, 2000);
            return () => clearTimeout(timer);
        }
      }, [success]);

    async function handleSubmit(event) {
        event.preventDefault()
        console.log(user)
        try {
            if (user.newPassword != user.matchPassword) {
                setMessage("Your passwords do not match")
                console.log("@#$@#")
            } else {
                setLoading(true)
                setDisabled(true)
                setError(false)
                setSuccess(false)
                let token = cookie.get('token')
                const userId = JSON.parse(token).user.id
                const { password, newPassword } = user
                const payload = { password, newPassword, userId}
                console.log(payload)
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/changePassword`, payload)
                
                setMessage(response.data.message)
                setUser(INITIAL_USER)
            }
            } catch (error){
            setError(true)
        } finally {
            setLoading(false)
            setDisabled(false)
        }
    }
    
    function handleFormChange(event) {
        const { name, value } = event.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    }

    //Handles opening and closing the modal.  
    //When the form is canceled, the state of contact is reset
    function closeModal() {
        setModalOpen(!modalOpen)
        setUser(INITIAL_USER)
     }

        return (
            <>     
            <td>     
                <Modal     
                trigger={<Button color='green'  floated="left" onClick={closeModal} >Change Password </Button>}    
                open={modalOpen}           
                >
                <Segment>
                    <Header>Change Password</Header>
                    <Form error={Boolean(error)} success={Boolean(success)} loading={loading} onSubmit={handleSubmit} disabled={loading}>
                        <Message success content="Your password has been changed" />
                        <Message error content={message} />
                        <Form.Input 
                            icon="lock"
                            iconposition='left'
                            label='Enter Your Existing Password'
                            type="password"
                            name='password'
                            placeholder="Enter Your Existing Password"
                            onChange={handleFormChange}
                        />


                        <Form.Input 
                            icon="lock"
                            iconposition='left'
                            label='Enter New Password'
                            type="password"
                            name='newPassword'
                            placeholder="Enter New Password"
                            onChange={handleFormChange}
                        />
                        <Form.Input 
                            icon="lock"
                            iconposition='left'
                            label='Re-type New Password'
                            type="password"
                            name='matchPassword'
                            placeholder="Re-type New Password"  
                            onChange={handleFormChange}
                        />

                        <Button
                            disabled={loading}
                            loading={loading}
                            icon="upload"
                            type="submit"
                            color="green"
                            content="Save Changes"
                        />
                        <Button
                            disabled={loading}
                            loading={loading}
                            icon="cancel"
                            type="button"
                            color="red"
                            content="Cancel"
                            onClick={closeModal}
                        />
                    </Form>
                    </Segment>
                    </Modal>
                

            </td>
            </>

        )
    }

export default ChangePassword