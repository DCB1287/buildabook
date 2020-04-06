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
const INITIAL_CHAPTER = {
    title: "",
    text: "",
    author: "",
    upvoteCount: 1
}

function CreateNewChapter() {
    const [modalOpen, setModalOpen] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const [chapter, setChapter] = React.useState(INITIAL_CHAPTER)

    //handles change in the form to populate chapter fields
    function handleChange (event) {
        const {name, value} = event.target
        setChapter(prevstate => ({ ...prevstate, [name]: value }))
    }

    //handles submitting the chapter entry
    function handleSubmit (event) {
        event.preventDefault()
        try {
            setLoading(true)
            setDisabled(true)
            setSuccess(false)
            setError(false)
            //set Author to chapter

            const payload = {...chapter}
            //post chapter to database

            setSuccess("Your submission has been posted")
        } catch (error) {
            setError(error)
        } finally {
            setDisabled(false)
            setLoading(false)
        }
    }

    return (
        <>
            <Modal  trigger={
                                <Button 
                                    attached='bottom'  
                                    content='Add Chapter' 
                                    color='green'
                                    floated='right'
                                    onClick={ () => setModalOpen(true)}
                                />
                            }
                    open={modalOpen}
            >
            
                {!isLoggedIn ?
                    (
                        <>
                        <Segment>
                            <Message 
                                attached
                                icon='book'
                                header='Submit Your Chapter'
                                color='green'
                            />
                            <br />
                            <Form error={Boolean(error)} success={success} loading={loading} onSubmit={handleSubmit} disabled={loading}>
                                <Message success header="Success: " content={success} />
                                <Message error header="Oops! " content={error} />
                                <Form.Input 
                                    required
                                    label='Title'
                                    placeholder='Title'
                                    name='title'
                                    value={chapter.title}
                                    onChange={handleChange}
                                />
                                <Form.Field
                                    required
                                    control='textarea'
                                    label="Chapter Submission"
                                    placeholder="Write your entry here"
                                    name="text"
                                    value={chapter.text} 
                                    onChange={handleChange}
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
                                            setModalOpen(false)
                                            setChapter(INITIAL_CHAPTER)
                                        }
                                    }
                                    icon="window close outline"
                                    color="red"
                                    content="Cancel"
                                />
                            </Form>
                        </Segment>
                        </>
                    ) : (
                        <Login />
                    )

                }
            </Modal>
        </>
    )
}

export default CreateNewChapter