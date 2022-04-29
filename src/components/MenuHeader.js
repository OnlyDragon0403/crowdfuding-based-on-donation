import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Image, Menu, Dropdown, Icon, Header } from 'semantic-ui-react';

export default class MenuHeader extends Component {
  constructor (props) {
    super(props);
    this.state = {
      menuFixed : false,
      connected : false
    }
  }
  render() {
    const menuStyle = {
      border: 'none',
      borderRadius: 0,
      boxShadow: 'none',
      marginBottom: '1em',
      transition: 'box-shadow 0.5s ease, padding 0.5s ease',
    }
    const fixedMenuStyle = {
      backgroundColor: '#000',
      border: '1px solid #ddd',
      boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    }
    return (
      <>
        <Menu
          borderless
          fixed={this.state.menuFixed ? 'top' : undefined}
          style={this.state.menuFixed ? fixedMenuStyle : menuStyle}
        >
          <Container text >
            <Menu.Item as='a' header>
              <Image size='mini' src='/logo.svg' />
            </Menu.Item>
            <Menu.Item header as='h3' style={{ textTransform : 'uppercase', color : 'white' }} >
              Donation based crowdfunding
            </Menu.Item>
            
            <Menu.Menu position='right' style={{ alignItems : "center" }}>
              <Header as='h4'>
                <Icon name={ this.state.connected ? 'linkify' : 'unlinkify' } style={{ color : 'white' }}/>
                <Header.Content>
                  <Dropdown text={this.state.connected ? 'Connected' : 'Disconnected'} pointing className='link item' style={{ color : 'white' }}>
                    <Dropdown.Menu>
                      {
                        this.state.connected ? 
                        <Dropdown.Item >
                          <Icon name='unlinkify' />
                          Disconnect
                        </Dropdown.Item> 
                          :
                        <Dropdown.Item >
                          <Icon name='linkify' />
                          Connect
                        </Dropdown.Item>
                      }
                      <Dropdown.Divider />
                      <Dropdown.Item >
                        <Icon name='user circle' />
                        My profile
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Header.Content>
              </Header>
            </Menu.Menu>
          </Container>
        </Menu>
      </>
    );
  }
}
