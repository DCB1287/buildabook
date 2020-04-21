import React from 'react'
import { Form, Button,  Message } from 'semantic-ui-react'
import axios from 'axios'

const INITIAL_USER = {
    email: "",
}

function handleLogin() {
  window.location.href = '/Login'
}


function SetPasswordForm() {
    const [user, setUser] = React.useState(INITIAL_USER)
    const [disabled, setDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState("")
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
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/forgotPassword`, payload)
            setMessage("Success: Check your email!")
            handleLogin()
        } catch (error){
            setError(true)
            setMessage("Something went wrong. Try again Later")
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
        <Message    
            attached
            icon="book"
            header="Forgot Your Password?  We'll Send You an Email"
            color='green'  
        />
        <Form 
            padded
            fluid 
            onSubmit={handleSubmit} 
            disabled={disabled} 
            loading={loading} 
            success={success} 
            error={error}
            widths={5}
        >
        <Message error content={message} />
        <Message success content={message} />
            <Form.Input 
                icon="mail"
                iconposition='left'
                label='Email'
                placeholder="Email"
                name='email'
                value={user.email}
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
    </>
    )
}

export default SetPasswordForm