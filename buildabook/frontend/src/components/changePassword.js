import React, { useState, useEffect } from 'react'
import userData from '../placeholder data/user'
import { Header, Form, Button, Modal, Segment } from 'semantic-ui-react'
import axios from 'axios'

function ChangePassword(props) {

    const INITIAL_USER = {
        password: "",
        matchPassword: ""
    }

    //React states for the contact component
    const [user, setUser] = React.useState(INITIAL_USER)
    const [disabled, setDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [modalOpen, handleOpen] = React.useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            setLoading(true)
            setDisabled(true)
            setError(false)
            setSuccess(false)
            const payload = {...user}
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/changePassword`, payload)
            setMessage(response.message)
            setUser(INITIAL_USER)
        } catch (error){
            setError(true)
            setMessage(error)
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
        handleOpen(!modalOpen)
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
                     <Form error={Boolean(error)} loading={loading} onSubmit={closeModal}>

                     <Form.Input 
                icon="lock"
                iconposition='left'
                label='Enter Your Existing Password'
                type="password"
                placeholder="Enter Your Existing Password"
                onChange={handleFormChange}
            />


                <Form.Input 
                icon="lock"
                iconposition='left'
                label='Enter New Password'
                type="password"
                placeholder="Enter New Password"
                onChange={handleFormChange}
            />
            <Form.Input 
                icon="lock"
                iconposition='left'
                label='Re-type New Password'
                type="password"
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