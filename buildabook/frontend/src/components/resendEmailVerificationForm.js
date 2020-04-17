import React from 'react'
import { Form, Button,  Message, Segment } from 'semantic-ui-react'
import axios from 'axios'

const INITIAL_USER = {
    email: "",
    verificationCode: ""
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
  } else if(errorMsg == null)
    console.log("booty")

  else {
    // Something else happened in making the request that triggered an error
    errorMsg = error.message;
    console.error("Error message", errorMsg);
  }
  displayError(errorMsg);

}

function ResendEmailVerificationForm() {

    const [user, setUser] = React.useState(INITIAL_USER)
    const [disabled, setDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [success, setSuccess] = React.useState(false)

    async function handleResend(event){
        event.preventDefault()
        try{

            setLoading(true)
            setDisabled(true)
            setError(false)
            setSuccess(false)
            const payload = {...user}
            console.log(payload)
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/resend`, payload)
            setSuccess(true)
            setMessage(response.data.message)
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
                    header="Didn't Get Your Email?"
                    color='green'  
                />
                <Form 
                    padded='true'
                    fluid='true' 
                    onSubmit={handleResend}
                    disabled={Boolean(disabled)} 
                    loading={Boolean(loading)} 
                    success={Boolean(success)} 
                    error={Boolean(error)}
                >
                <Message error content={'Success! ' + message} />
                <Message success content={'Error: ' + message} />
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
                    <Button 
                        disabled={disabled || loading}
                        color='green' 
                        icon='send'
                        iconposition='left'
                        type='submit'
                        content="Resend"
                    />
                </Form> 
            </Segment>     
        </>
    )


}

export default ResendEmailVerificationForm