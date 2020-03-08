import React from 'react'
import { Label, Header, Icon, Container } from 'semantic-ui-react'

function Chapter(props) {
    return (
        <>
        <Container text>
            <Label as='a' href={`/user/${props.chapter._id}`} ribbon color='blue' >
                <Icon name='user' />
                Author: {props.chapter.author}
            </Label>
            <Header as='h2' content={props.chapter.title} />
            {props.chapter.text}
        </Container>
       </>
    )
}

export default Chapter