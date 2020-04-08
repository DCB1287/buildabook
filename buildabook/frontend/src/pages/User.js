import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import {
  Container,  Divider,  Dropdown,  Grid, Header, Image, List, Menu, Segment, Form, Button, Icon, Modal, Label
} from 'semantic-ui-react'
import axios from 'axios'
import _ from 'lodash'

import ContributionsTable from '../components/ContributionsTable'
import CreateNewBook from '../components/createNewBook'
import booksData from '../placeholder data/book'
import bookData from '../placeholder data/book';
import userData from '../placeholder data/user';
import cookie from 'js-cookie'

var loggedIn = cookie.get('token')

function User(props) {
const match = useRouteMatch()

  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(true)

  

  //Placeholder get data
  if (loading) {
    setBooks(bookData)
    setLoading(false)
  }

  if(!loggedIn){
  return (
    <>
      <h4 class="ui horizontal divider header">
        <i class="address card icon"></i>
  User Information
  

        </h4>
      <div class="ui small image">
        <img src="https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png" />    
      </div>
      <table class="ui definition table">
        <tbody>
          <tr>
            <td class="two wide column">Full Name</td>
            <td></td>
          </tr>

          <tr>
            <td>Account Type</td>
            <td></td>
          </tr>

          <tr>
            <td>Date Account created</td>
            <td></td>
          </tr>

          <tr>
            <td>Bio</td>
            <td></td>
          </tr>

        </tbody>      
      </table>

      <p></p>
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


        } else {
            return (
                <>

      <h4 class="ui horizontal divider header">
        <i class="address card icon"></i>
  User Information
  

</h4>


      <div class="ui small image">
        <img src="https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png" />
        
        
      </div>

      <Modal 
                trigger={<Button color='blue' animated='vertical' >
                        <Button.Content hidden><Icon name='pencil' /></Button.Content>
                        <Button.Content visible>Edit Profile Picture</Button.Content>
                    </Button>} 
               
                         
            >
                <Segment>
                    <Header>Edit Profile Picture</Header>
                  
                    <Form.Input 
                            fluid
                            icon="picture"
                            iconPosition="left"
                            label="Picture (URL Address)"
                            placeholder="Picture"
                            name="picture"
                            
                        />

<Button
                            disabled={loading}
                            loading={loading}
                            icon="upload"
                            type="submit"
                            color="green"
                            content="Save Changes"
                        />
                        
                       
                        
                        <Button
                            disabled={loading}
                            loading={loading}
                            icon="cancel"
                            type="button"
                            color="red"
                            content="Cancel"
                           
                        />
                </Segment>
                </Modal>

     
      <table class="ui definition table">

      
     

        <tbody>
          <tr>
            <td class="two wide column">Full Name</td>
            <td></td>

            
          </tr>
          

          <tr>
            <td>Account Type</td>

            <td></td>
            
          </tr>

          <tr>
            <td>Date Account created</td>
            <td></td>
          </tr>

          <tr>
            <td>Bio</td>
            <td></td>

            <Modal 
                trigger={<Button color='blue' animated='vertical' >
                    
                        <Button.Content hidden><Icon name='pencil' /></Button.Content>
                        <Button.Content visible>Edit Bio</Button.Content>
                    </Button>} 
               
                         
            >
                <Segment>
                    <Header>Edit Bio</Header>
                  
                    <Form.Input 
                            fluid
                            icon='pencil'
                            iconPosition="left"
                            label="Edit Bio"
                            placeholder="Edit Bio"
                            name="Edit Bio"
                            
                        />

<Button
                            disabled={loading}
                            loading={loading}
                            icon="upload"
                            type="submit"
                            color="green"
                            content="Save Changes"
                        />
                        
                       
                        
                        <Button
                            disabled={loading}
                            loading={loading}
                            icon="cancel"
                            type="button"
                            color="red"
                            content="Cancel"
                           
                        />
                </Segment>
                </Modal>
          </tr>


        </tbody>

       
      </table>
     

    
      <Modal 
                trigger={<Button color='blue' animated='vertical' >
                        <Button.Content hidden><Icon name='pencil' /></Button.Content>
                        <Button.Content visible>Change Password</Button.Content>
                    </Button>} 
               
                         
            >
                <Segment>
                    <Header>Change Password</Header>
                  
                        <Form.Input 
                        
                            fluid
                           
                            icon="lock icon"
                            iconPosition="left"
                            
                            label="Enter existing password"      
                            placeholder="Existing password"
                            type = "password"
                            name="name"
                           
                        />
                        <Form.Input 
                            fluid
                            icon="lock icon"
                            iconPosition="left"
                            label="Enter New Password"
                            placeholder="Enter New Password"
                            type = "password"
                            name="cellphone"
                            
                        />
                        <Form.Input 
                            fluid
                            icon="lock icon"
                            iconPosition="left"
                            label="Repeat New Password"
                            placeholder="Repeat New Password"
                            type = "password"
                            name="workphone"
                            
                        />

<Button
                            disabled={loading}
                            loading={loading}
                            icon="upload"
                            type="submit"
                            color="green"
                            content="Save Changes"
                        />
                       
                        
                        <Button
                            disabled={loading}
                            loading={loading}
                            icon="cancel"
                            type="button"
                            color="red"
                            content="Cancel"
                           
                        />
                </Segment>
                </Modal>
               



      <p></p>
      <h4 class="ui horizontal divider header">
        <i class="pencil alternate icon"></i>

        

  Contributions
</h4>


      <>
      <h4>This is currently just pulling every book, need to edit to make it display particular users contributions</h4>
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
        } 
}
export default User