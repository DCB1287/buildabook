import React from 'react'
import { Form, Button, Segment, Grid, Message, Divider } from 'semantic-ui-react'
import axios from 'axios'
import SetPasswordForm from '../components/setPasswordForm'
import PasswordValidationForm from '../components/passwordValidationForm'


function ForgotPassword() {
    

    

    


    return (
        <>
            <Segment placeholder padding>
                <Grid columns={2} >
                    <Grid.Column floated='right'>
                        <SetPasswordForm />
                    </Grid.Column>
                    <Grid.Column >
                        <PasswordValidationForm />
                    </Grid.Column>
                </Grid>
                <Divider vertical>Or</Divider>
            </Segment>
        </>
    )
}

export default ForgotPassword