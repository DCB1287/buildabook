import React from 'react'
import {Button, Label, Icon} from 'semantic-ui-react'
import axios from 'axios'
import _ from 'lodash'
import cookies from 'js-cookie'



function UpVoteButton(props) {
    const [active, setActive] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const [upvoteCount, setUpvoteCount] = React.useState(props.chapter.upvoteCount)
    const [userID, setUserID] = React.useState(JSON.parse(cookies.get('token')).user.id)
    const [upvoteList, setUpvoteList] = React.useState([])

    // React.useEffect(() => {
           //if the user is logged in, get upVoteList
        //   if (userID) {
        //     //get user's upvote list
        //     const fetchUpVoteList = async () => {
        //         const response = await axios.get(`${process.env.BASE_URL}/api/user/upvoteList?=${userID}`)
        //         setUpvoteList(response.data)
        //     }
        //     fetchUpVoteList()
        //     //if this chapter's id is found in that list, set button to active
        //     if (_.find(upvoteList, props.chapter_id)) {
        //         setActive(true)
        //     }
        //   }
    // },[upvoteList])

    function handleUpVote(event) {
        event.preventDefault()
        try {
            setDisabled(true)
            const id = props.chapter._id
            // let url = `${process.env.REACT_APP_BASE_URL}/api/chapter/upVote`
            // if (active) {
            //     url = `${process.env.REACT_APP_BASE_URL}/api/chapter/downVote`
            // }
            // const response = axios.post(url, id)
            // setUpvoteCount(response.data)
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
            <Button as='div' labelPosition='right' onClick={handleUpVote} loading={disabled} disabled={disabled}>
                <Button color='red' inverted={!active}>
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