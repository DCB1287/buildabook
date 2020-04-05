import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Button,Container,Header,Icon,Menu,Responsive,Segment,Visibility,} from 'semantic-ui-react'


const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h4'
      color="green"
      content='Build A Book'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h1'
      color="green"
      content=' An Intuitive Way to Crowdsource the Writing process and to Collectively Be Able to Contribute to the Publication of a Book with Other Users '
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />

    <Button animated primary size='medium' href="/signup" >
      <Button.Content visible content='Sign Up Today' />
      <Button.Content hidden>
        <Icon name='right arrow' />
      </Button.Content>
    </Button>
  </Container>
)

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive >
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}




const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>

    <Segment style={{ padding: '8em 0em' }} vertical>
    </Segment>

   
  </ResponsiveContainer>

)

export default HomepageLayout