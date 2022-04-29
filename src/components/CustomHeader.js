import React, { Component } from 'react';
import { Header, Segment, Grid, Button, Icon, Image, Message } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, postsSelector } from "../slices/filter";

export default class CustomHeader extends Component {
  componentDidMount() {
    // Initialise TronWeb
  }

  render() {
    return (
      <>
        <Header as='h2' icon inverted textAlign='center' style={{ color : 'black' }}>
              <Segment style={{ padding: '3em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <Header as='h3' style={{ fontSize: '2em' }}>
                        THE 21ST  CENTURY FUNDRAISING METHOD 
                      </Header>
                        <Message info>Individuals, Businesses & Organizations</Message>
                      <Header as='h3' style={{ fontSize: '2em' }}>
                        PEER TO PEER TRANSACTIONS
                      </Header>
                        <Message info>Donations are delivered directly to the individual's tronlink wallet.</Message>
                    </Grid.Column>
                    <Grid.Column floated='right' width={6}>
                      <Image bordered rounded size='small' src='/images/avatar/avatar.png' />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column textAlign='center'>
                      {
                        this.props.currentNet ? 
                        <Button color='blue' inverted size='huge'>Join</Button> :
                        <Message info>
                          <Header as='h1'>Hello, world!</Header>
                          <h3 style={{color : 'Olive'}}>
                            The GIVER becomes the RECEIVER.
                          </h3>
                        </Message>
                      }
                      
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
        </Header>
      </>
    )
  }
}

  