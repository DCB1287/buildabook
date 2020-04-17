import React from 'react'
import EmailVerificationForm from '../components/emailVerificationForm'
import ResendEmailVerificationForm from '../components/resendEmailVerificationForm'
import {  Grid, Segment } from 'semantic-ui-react'

function EmailVerification() {

    return (
        <>
        <Segment>
            <Segment.Inline>
                <Grid columns={2} padded >
                    <Grid.Column floated='left' width={8}>
                        <EmailVerificationForm />
                        
                    </Grid.Column>
                    <Grid.Column floated='right' width={8}>
                        <ResendEmailVerificationForm />
                    </Grid.Column>
                </Grid>
            </Segment.Inline>
        </Segment>
        </>
    )
}

export default EmailVerification