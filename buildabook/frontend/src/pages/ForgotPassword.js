import React from 'react'
import { Segment, Grid, Container } from 'semantic-ui-react'
import SetPasswordForm from '../components/setPasswordForm'


function ForgotPassword() {
    

    

    


    return (
        <>
        <Container>
            <Segment padding>
                    <Grid.Column floated='right'>
                        <SetPasswordForm />
                    </Grid.Column>
                
                
            </Segment>
        </Container>
        </>
    )
}

export default ForgotPassword