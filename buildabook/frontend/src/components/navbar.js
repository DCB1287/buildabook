import React from 'react'
import { Button, Menu, Container, Segment, Visibility} from 'semantic-ui-react'
import cookie from 'js-cookie'

var loggedIn = cookie.get('token')

function handleLogout() {
    cookie.remove("token");
    window.location.href = '.Login'
}


function Navbar() {

    const [fixed] = React.useState(false)

    const path = window.location.pathname

    function showLoginOrLogout() {
        if (!loggedIn) { 
          return (
            <>
            <Button as='a' inverted={!fixed} href='/login'>
                Log in
            </Button>
            <Button as='a' inverted={!fixed} primary={fixed}  href='/signup'>
                Sign Up
            </Button>
            </>
          )
        } else {
          return (
            <>
            <Button as='a' inverted={!fixed} primary={fixed}  href='/Account'>
                Account
            </Button>
            <Button as='a' inverted={!fixed} primary={fixed}  href='/' onClick={handleLogout}>
                Log out
            </Button>
            </>
          )
        }
      }
 
    return (
        <Visibility
          once={false}
        >
          <Segment 
            inverted
            style={{
                'paddingTop':'0px',
                'paddingBottom':'0px'
            }}
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing
              secondary={!fixed}
              size='large'
              color='green'
            >
              <Container>
                <Menu.Item as='h1'>
                  BuildABook
                </Menu.Item>
                <Menu.Item as='a' active={path === '/'} href='/'>
                  Home
                </Menu.Item>
                <Menu.Item as='a' active={path === '/books'} href='/books'>
                  Books
                </Menu.Item>
                <Menu.Item position='right'>
                    {showLoginOrLogout()}
                </Menu.Item> 
              </Container>
            </Menu>
          </Segment>
        </Visibility>
    )
}

export default Navbar