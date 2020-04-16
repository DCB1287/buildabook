import React, { useState, useEffect } from 'react'
import userData from '../placeholder data/user'
import { Header, Image, Form, Button, Modal, Segment, Icon } from 'semantic-ui-react'

function UpdateBio(props) {

    //Based state for contact
    const INITIAL_BIO = {       
        bio: ""
    }

    //React states for the contact component
    const [bio, setBio] = React.useState(INITIAL_BIO)
    const [user, setUsers] = useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const [modalOpen, handleOpen] = React.useState(false)

    //handles change in the form to populate bio fields
    function handleChange (event) {
        const {bio, value} = event.target
        setBio(prevstate => ({ ...prevstate, [bio]: value }))
    }

    //Handles opening and closing the modal.  
    //When the form is canceled, the state of contact is reset
    function closeModal() {
        handleOpen(!modalOpen)
        setBio(INITIAL_BIO)
     }


     useEffect(() => {
       
        //Get user test data
        const fetchUser = async () => {
            setUsers(userData[0])     
        }
        fetchUser();
    },[user])

        return (
            <>          
            <td>
                <Modal     
                trigger={<Button color='green'  floated="left" onClick={closeModal} >Update Bio </Button>}    
                open={modalOpen}  
                         
            >
                <Segment>
                    <Header>Edit Bio</Header>
                     <Form error={Boolean(error)} loading={loading} onSubmit={closeModal}>
                        <Form.Input 

                            fluid    
                            icon="edit Outline"
                            iconPosition="left"
                            label="Bio"
                            placeholder="bio"
                            name="bio"
                            value={user.bio}
                            onChange={handleChange}
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

export default UpdateBio