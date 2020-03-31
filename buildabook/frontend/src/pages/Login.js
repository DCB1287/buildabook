import React from 'react'
import { Button, Form, Icon, Message, Segment, Container } from 'semantic-ui-react'
import axios from 'axios'
import cookie from "js-cookie"

const INITIAL_USER = { 
  password: "",
  email: ""
}

//This will give the user a token we can track and navigate to the contacts page
function handleLogin(token) {
  cookie.set("token", token);
  window.location.href = '/contacts'
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
  } else {
    // Something else happened in making the request that triggered an error
    errorMsg = error.message;
    console.error("Error message", errorMsg);
  }
  displayError(errorMsg);

}


function Login() {
  const [user, setUser] = React.useState(INITIAL_USER)
  const [disabled, setDisabled] = React.useState("true")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  //Disables the form until the form is properly filled out
  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el)) 
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])


  //Updates the form to put into user whenever there's a change
  function handleChange(event) {
    const { name, value } = event.target
    setUser(prevState => ({...prevState, [name]: value }) ) 
  }

  //make request to login user
  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setLoading(true)
      setError('')
      // "${process.env.BASE_URL}/"
      const url = `${process.env.BASE_URL}/api/users/login`                      //This URL will need to be changed 
      const payload = { ...user}
      console.log(user)
      const response = await axios.post(url, payload)
      handleLogin(response.data)
      console.log(response.data)

    } catch (error) {
      catchErrors(error, setError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <Container style={{'padding-top':'10px'}}>
      
    <Message 
      attached
      icon="privacy"
      header="Welcome!"
      content="Login in with email and password"
      color="blue"
    />
    <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}> 
      <Message 
        error
        header="Error!"
        content={"Incorrect Username or Password"}
      />
      <Segment>
        <Form.Input 
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <Form.Input 
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          label="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
        <Button
          disabled={disabled || loading}
          icon="sign in"
          type="submit"
          color="orange"
          content="Login"
        />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help" />
      Forgot Password?{" "}
      <a href="/forgotpassword">Click here</a>
    </Message>
    </Container>
    </>
    )
}

export default Login