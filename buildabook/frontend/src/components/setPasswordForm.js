import React from 'react'
import { Form, Button,  Message, Segment } from 'semantic-ui-react'
import axios from 'axios'

const INITIAL_USER = {
    email: "",
    password: "",
    matchPassword: ""
}

function SetPasswordForm() {
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
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/`)
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
        <Message    
            attached
            icon="book"
            header="Set Your Password"
            color='green'  
        />
        <Form 
            padded
            fluid 
            onSubmit={handleSubmit} 
            disabled={Boolean(disabled)} 
            loading={Boolean(loading)} 
            success={Boolean(success)} 
            error={Boolean(error)}
            widths={5}
        >
        <Message error content={message} />
        <Message success content={message} />
            <Form.Input 
                icon="mail"
                iconPosition='left'
                label='Email'
                placeholder="Email"
                value={user.username}
                onChange={handleFormChange}
            />
            <Form.Input 
                icon="lock"
                iconPosition='left'
                label='Password'
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={handleFormChange}
            />
            <Form.Input 
                icon="lock"
                iconPosition='left'
                label='Password'
                type="password"
                placeholder="Retype your password"
                value={user.matchPassword}
                onChange={handleFormChange}
            />
            <Button 
                disabled={disabled || loading}
                color='green' 
                icon='send'
                iconPosition='left'
                type='submit'
                content="Submit"
            />
        </Form>          
    </>
    )
}

export default SetPasswordForm