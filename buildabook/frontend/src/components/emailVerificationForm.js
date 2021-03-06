import React from 'react'
import { Form, Button,  Message, Segment } from 'semantic-ui-react'
import axios from 'axios'

const INITIAL_USER = {
    email: "",
    verificationCode: ""
}

function handleVerificationComplete() {
  window.location.href = '/login'
}


function catchErrors(error, displayError) {
  let errorMsg;
  if (error.response) {
    // The request was made and the server responsed with a status code that is not in the range of 2XX
    errorMsg = error.response.data;
    console.error("Error response", errorMsg);

    // For Cloudinary image uploads
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    // The request was made, but no response was received
    errorMsg = error.request;
    console.error("Error request", errorMsg);
  } 
  else {
    // Something else happened in making the request that triggered an error
    errorMsg = error.message;
    console.error("Error message", errorMsg);
  }
  displayError(errorMsg);

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
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/verifyUser`, payload)
            setSuccess(true)
            setMessage(response.data.message)
            handleVerificationComplete()
            setUser(INITIAL_USER)
        } catch (error){
            setError(true)
            catchErrors(error,setError)
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
        
            <Segment>
                <Message    
                    attached
                    icon="book"
                    header="Verify Your Email"
                    color='green'  
                />
                <Form 
                    padded='true'
                    onSubmit={handleSubmit}
                    disabled={Boolean(disabled)} 
                    loading={Boolean(loading)} 
                    success={Boolean(success)} 
                    error={Boolean(error)}
                >
                <Message error content={'Error: ' + 'Incorrect Email and or Verification code'} />
                <Message success content={'Success'} />
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
        </>
    )


}

export default EmailVerificationForm