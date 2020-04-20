import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { BrowserRouter as Redirect} from 'react-router-dom';
import axios from 'axios'
import _ from 'lodash'
import bookData from '../placeholder data/book'
import userData from '../placeholder data/user'
import { Icon, Segment, Table } from 'semantic-ui-react'
import ContributionsTable from '../components/ContributionsTable'
import UpdateBio from '../components/updateBio'
import ChangePassword from '../components/changePassword'
import cookie from 'js-cookie'
var loggedIn = cookie.get('token')

const INITIAL_USER = {
    username: "",
    email: ""
}



function Account(props) {
    const match = useRouteMatch()
    const [books, setBooks] = React.useState([]);
    const [user, setUser] = useState(INITIAL_USER)
    const [loading, setLoading] = React.useState(true)
    const [email] = React.useState({email: JSON.parse(loggedIn).user.email})

    useEffect(() => {
       
        //Get Book data
        const fetchUser = async () => {
        try {
            setLoading(true)
            const payload = email
            console.log(email)
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/getByUserEmail`, payload)
            console.log(response.data)
            setUser(response.data)
        } catch (error){
            console.log("bad")
        } finally {
            console.log("finally")
        }
         
        }
        fetchUser();
    },[])


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
<UpdateBio />
<ChangePassword />
                
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

      <Table.Row>
        <Table.Cell>
          <Icon name='thumbs up' /> Total Upvotes
        </Table.Cell>
        <Table.Cell>{user.upvoteTotal}</Table.Cell>
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
