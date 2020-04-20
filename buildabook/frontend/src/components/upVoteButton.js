import React from 'react'
import {Button, Label, Icon} from 'semantic-ui-react'
import axios from 'axios'
import cookies from 'js-cookie'

var id = cookies.get('token')

function UpVoteButton(props) {
    const [active, setActive] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const [upvoteCount, setUpvoteCount] = React.useState(props.chapter.upvoteCount)
    const [userId] = React.useState(JSON.parse(id).user.id)


    React.useEffect(() => {
           //if the user is logged in, get upVoteList
          if (userId) {
            //get user's upvote list
            const fetchUpVoteList = async () => {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/chapter/isUpvoted?chapterId=${props.chapter._id}&userId=${userId}`)
                console.log(response.data.message)
                if (response.data.message == true) {
                    console.log("parsed as true")
                    setActive(true)
                } else {
                    console.log("parsed as false")
                    setActive(false)
                }
            }
            fetchUpVoteList()
          }
    },[])

    console.log(active)
    async function handleUpVote(event) {
        event.preventDefault()
        try {
            setDisabled(true)
            const chapterId = props.chapter._id
            const payload = {chapterId, userId}
            console.log(payload)
            let url = `${process.env.REACT_APP_BASE_URL}/api/chapter/upvoteInc`
            if (active) {
                url = `${process.env.REACT_APP_BASE_URL}/api/chapter/upvoteDec`
            }
            const response = await axios.post(url, payload)
            console.log(response)
            const response2 = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/chapter/upVoteCount?id=${props.chapter._id}`)
            setUpvoteCount(response2.data.upvoteCount)
            if (active) {
                setUpvoteCount(upvoteCount - 1)
            } else {
                setUpvoteCount(upvoteCount + 1)
            }
            setActive(!active)
        } catch (error) {
            setActive(active)
        } finally {
            setDisabled(false)
        }
    }

    return (
        <>
            <Button as='div' labelPosition='right' onClick={handleUpVote} loading={disabled} disabled={!Boolean(userId)}>
                <Button color='red' inverted={!active}  >
                    <Icon name='heart' />
                    Like
                </Button>
                <Label as='a' basic color='red' pointing='left' >
                    {upvoteCount}
                </Label>
            </Button>
        </>
    )
}

export default UpVoteButton