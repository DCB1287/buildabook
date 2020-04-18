import React from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import axios from 'axios'
import userData from '../placeholder data/user'

const INITIAL_FORM_VALUES = {
    verificationCode: "",
}

function PasswordValidationForm() {
    const [disabled, setDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [validate, setValidate] = React.useState("")
    const [formValues, setFormValues] = React.useState(INITIAL_FORM_VALUES)

    async function handleValidation(event) {
        event.preventDefault()
        try {
            setLoading(true)
            setDisabled(true)
            setError(false)
            setSuccess(false)
            const payload = {...formValues}
            console.log(payload)
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/verifyUser`, payload)
            setMessage(response.message)
            setSuccess(true)
            setFormValues(INITIAL_FORM_VALUES)
        } catch (error){
            setError(true)
            setMessage(error)
        } finally {
            setLoading(false)
            setDisabled(false)
        }
    }

    function handleValidationFormChange(event) {
        const { name, value } = event.target
        setFormValues(prevState => ({...prevState, [name]: value }) ) 
      }

    return (
        <>
            <Message 
                icon='pencil'
                header='Validate Your Password'
                color='blue'
                attached
            />
            <Form 
                onSubmit={handleValidation} 
                loading={loading} 
                disabled={disabled}
                success={success}
                error={error}
            >
                <Message success content={message}/>
                <Message error content={message}/>
                <Form.Input 
                    icon="lock"
                    iconposition='left'
                    label='Validate'
                    placeholder='Enter code here'
                    name='verificationCode'
                    value={formValues.verificationCode}
                    onChange={handleValidationFormChange}
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

export default PasswordValidationForm