import React from 'react'
import { Form, Button,  Message, Segment, Container } from 'semantic-ui-react'
import axios from 'axios'

const INITIAL_USER = {
    email: "",
    verificationCode: ""
}

function EmailVerificationForm() {

    const [user, setUser] = React.useState(INITIAL_USER)
    const [disabled, setDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [success, setSuccess] = React.useState(false)


    async function handleSubmit(event) {
        event.preventDefault()
        try {
            setLoading(true)
            setDisabled(true)
            setError(false)
            setSuccess(false)
            const payload = {...user}
            console.log(payload)
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/`, payload)
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

    return (
        <>
        <Container>
            <Segment>
                <Message    
                    attached
                    icon="book"
                    header="Verify Your Email"
                    color='green'  
                />
                <Form 
                    padded='true'
                    fluid='true' 
                    onSubmit={handleSubmit} 
                    disabled={Boolean(disabled)} 
                    loading={Boolean(loading)} 
                    success={Boolean(success)} 
                    error={Boolean(error)}
                >
                <Message error content={message} />
                <Message success content={message} />
                    <Form.Input 
                        icon="mail"
                        iconposition='left'
                        label='Email'
                        type='email'
                        placeholder="Email"
                        name='email'
                        value={user.email}
                        onChange={handleFormChange}
                    />
                    <Form.Input 
                        icon="lock"
                        iconposition='left'
                        label='Verification Code'
                        placeholder="Verification Code"
                        name='verificationCode'
                        value={user.verificationCode}
                        onChange={handleFormChange}
                    />
                    <Button 
                        disabled={disabled || loading}
                        color='green' 
                        icon='send'
                        iconposition='left'
                        type='submit'
                        content="Submit"
                    />
                </Form>  
            </Segment>
        </Container>        
        </>
    )


}

export default EmailVerificationForm