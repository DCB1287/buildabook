import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios'
import _ from 'lodash'
import bookData from '../placeholder data/book'
import userData from '../placeholder data/user'
import { Icon, Header, Modal, Button, Segment, Table, Form } from 'semantic-ui-react'
import ContributionsTable from '../components/ContributionsTable'
import cookie from 'js-cookie'
var loggedIn = cookie.get('token')




const INITIAL_BIO = {       
    bio: ""
}

function Account(props) {
    const match = useRouteMatch()
    const [bio, setBio] = React.useState(INITIAL_BIO)
    const [books, setBooks] = React.useState([]);
    const [user, setUsers] = useState([])
    const [loading, setLoading] = React.useState(true)
    const [modalOpen, handleOpen] = React.useState(false)
    const [error, setError] = React.useState('')


    //handles change in the form to populate bio fields
    function handleChange (event) {
        const {bio, value} = event.target
        setBio(prevstate => ({ ...prevstate, [bio]: value }))
    }

    function closeModal(){
        handleOpen(!modalOpen)
      }
   

    useEffect(() => {
       
        //Get Book data
        const fetchUser = async () => {
            setUsers(userData[0])
         
        }
        fetchUser();
    },[user])


//Placeholder get data
if (loading) {
  setBooks(bookData)
  setLoading(false)
}

if(loggedIn){
    return (
        <>  
        
<h4 class="ui horizontal divider header">
        <i class="address card icon"></i>
 Account Information
 
        </h4>
       
        <img class="ui centered medium circular image"  src={user.profilePic}></img>
<td>
        <Modal 
                trigger={<Button color='green'  floated="left" onClick={closeModal} >Update Bio </Button>}  
                className="updateBioForm"  
                open={modalOpen}        
            >
               
                <Segment>
                    <Header content={"Update Bio"} /> 
                    <Form error ={Boolean(error)} loading={loading} onSubmit={closeModal}> 
                    
                        <Form.Input 
                            fluid    
                            icon="edit Outline"
                            iconPosition="left"
                            label="bio"
                            placeholder="bio"
                            name="bio"
                            value = {user.bio}
                            onChange={handleChange}
                            
                        />
                                     
                        <Button
                            disabled={loading}
                            loading = {loading}
                            icon="cancel"
                            type="submit"
                            color="green"
                            content="Save Changes"
                        />
                        <Button
                            disabled={loading}
                            loading = {loading}
                            icon="upload"
                            type="button"
                            color="red"
                            content="Cancel"
                            onClick={closeModal}
                        />
                    
                    </Form>
                </Segment>
                </Modal>

</td>

     <Table celled striped>
       
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell textAlign="center" colSpan='3'>Basic Information </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell collapsing>
          <Icon name='calendar icon' /> Member Since
        </Table.Cell>
        <Table.Cell></Table.Cell>
       
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name='user icon' /> Username
        </Table.Cell>
        <Table.Cell>{user.username}</Table.Cell>
       
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name='edit outline' /> Bio
        </Table.Cell>
        <Table.Cell>{user.bio}</Table.Cell>
     
      </Table.Row>
      
      <Table.Row>
        <Table.Cell>
          <Icon name='dollar sign' /> Account Type
        </Table.Cell>    
        <Table.Cell>Free (Premium Coming Soon!)</Table.Cell>   
      </Table.Row>     
      <Table.Row>
      </Table.Row> 
         
    </Table.Body>  
    
  </Table>


  
  <h4 class="ui horizontal divider header">
  <i class="pencil alternate icon"></i>
  Contributions
</h4>
<h4>This is currently just pulling every book, need to edit to make it display particular users contributions</h4>
      <>
        <Segment raised loading={loading}>

          <ContributionsTable books={books} />
        </Segment>
      </>

      <p></p>
      <h4 class="ui horizontal divider header">
        <i class="comments icon"></i>
 Comments
</h4>
           
        </>
    )  

}else{
    //If user tries to access account page w/o being logged in, redirect to Homepage
    return (
        (<Redirect to="/Homepage" />) 
    )
}

}

export default Account