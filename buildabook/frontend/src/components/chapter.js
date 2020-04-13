import React from 'react'
import { Label, Header, Icon, Container } from 'semantic-ui-react'
import UpVoteButton from './upVoteButton'

function Chapter(props) {
    const [chapter, setChapter] = React.useState(props.chapter)

    return (
        <>
        <Container text>
            <Label as='a' href={`/user/${chapter.author}`}  color='blue' >
                <Icon name='user' />
                Author: {chapter.author}
            </Label>
            <UpVoteButton chapter={chapter} latest={props.latest} />
            <Header as='h2' content={chapter.title} />
            {chapter.text}
        </Container>
       </>
    )
}

export default Chapter