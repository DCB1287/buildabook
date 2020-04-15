import React from 'react'
import { Label, Header, Icon, Container, Segment } from 'semantic-ui-react'
import UpVoteButton from './upVoteButton'

function Chapter(props) {
    const [chapter, setChapter] = React.useState(props.chapter)

    return (
        <>
        <Container text>
            {chapter.text ? (
                <>
                <Label as='a' href={`/user/${chapter.author}`}  color='blue' >
                    <Icon name='user' />
                    Author: {chapter.author}
                </Label>
                <UpVoteButton chapter={chapter} latest={props.latest} />
                <Header as='h2' content={chapter.title} />    
                {chapter.text}
                </>
                ) : (
                <>
                    <Segment text textAlign='center' placeholder>
                        <Header as='h2' content="No winner yet! Check back later!"/>
                    </Segment>
                </>
                ) 
            }
            
        </Container>
       </>
    )
}

export default Chapter