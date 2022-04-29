import React, { useState, useEffect } from 'react';
import { Grid, Header, Step } from 'semantic-ui-react'
import MemberTable from './MemberTable';
import LevelTable from './LevelTable';
import WalletTable from './WalletTable';
import CustomTable from './CustomTable';
import { useSelector, useDispatch } from "react-redux";
import { filterSelector , companyInfoSelector , fetchMemberWallet , fetchMembersBySpace , fetchCompanyInfo } from "../slices/filter";


const Content = () => {

  const spaceArray = ['Space 1', 'Space 2', 'Space 3', 'Space 4', 'Space 5'];
  const { curSpace, selectedMember } = useSelector(filterSelector);
  const { wallet, spaces } = useSelector(companyInfoSelector);

  const dispatch = useDispatch();

  const [selectedSpace, setSelectedSpace] = useState(0);
  const [selectedMemberID, setSelectedMemberID] = useState(0);

  const setTab = (space) => {
    setSelectedSpace(space);
    dispatch(fetchMembersBySpace(selectedMemberID , space));
  }

  const setMemberID = (member_ID) => {
    setSelectedMemberID( member_ID );
    dispatch(fetchMembersBySpace(member_ID , selectedSpace));
  }

  useEffect(() => {
    dispatch(fetchMembersBySpace( selectedMemberID , selectedSpace ));
    dispatch(fetchMemberWallet(selectedMemberID));
    dispatch(fetchCompanyInfo());
  }, [dispatch]);

  return (
    <>
      {/* Heads up! Override division color to make it visible on dark background. */}
      <style>
      {`
        .ui.grid.divided:not([class*="vertically divided"]) > .row > .column {
            box-shadow: -1px 0 0 0 #d4d4d4;
        }
        .ui[class*="vertically divided"].grid > .row:before {
            box-shadow: 0 -1px 0 0 rgba(212, 212, 212, 1.0);
        }
      `}
      </style>
      <Header as='h2' inverted textAlign='center' color='grey'>
        The number of entered members into this crowdsale : 781.
      </Header>
      <Grid columns={1} divided>
        <Grid.Row >
            <Grid.Column width={16}>
                <Header as='h2' inverted textAlign='center' color='blue'>
                    Re-entry and Upgrade Infomation
                </Header>
                <CustomTable />
            </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns={2} divided>
        <Grid.Row >
            <Grid.Column width={10}>
                <Header as='h2' inverted textAlign='center' color='blue'>
                    My Infomation

                </Header>
                <Header as='h1' inverted textAlign='center' color='red'>
                    Member ID List with same address in Space {selectedSpace + 1} : "{selectedMemberID}"
                </Header>
            </Grid.Column>
            <Grid.Column width={6}>
                <Header as='h2' inverted textAlign='center' color='blue'>
                    Company's Infomation
                </Header>
                <Grid.Row >
                    {/* <CustomTable /> */}
                <Header as='h1' inverted textAlign='center' color='red'>
                    The Number of Total member in  space {selectedSpace + 1} : "{spaces[selectedSpace] ? spaces[selectedSpace] : 0}"
                </Header>

                </Grid.Row>
            </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns={2} divided>
        <Grid.Row >
            <Grid.Column width={10}>
              <Step.Group ordered >
                {spaceArray.map((item, index) => {
                  if(index < curSpace)
                    return (
                      <Step completed link key={index} onClick={() => setTab(index)}>
                        <Step.Content>
                          <Step.Title>{item}</Step.Title>
                        </Step.Content>
                      </Step>
                    )
                  else if (index == curSpace)
                    return (
                      <Step active link key={index} onClick={() => setTab(index)}>
                        <Step.Content>
                          <Step.Title>{item}</Step.Title>
                        </Step.Content>
                      </Step>
                    )
                  else
                    return (
                      <Step link key={index} onClick={() => setTab(index)}>
                        <Step.Content>
                          <Step.Title>{item}</Step.Title>
                        </Step.Content>
                      </Step>
                    )
                })}
              </Step.Group>
              <MemberTable />
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as='h2' style={{padding : "0.75em"}}>
                SPACE {curSpace + 1} PAYMENT  : ID {selectedMember + 1}
              </Header>
              <LevelTable />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row >
            <Header as='h2' style={{padding : "0.75em"}}>
                Wallet Infomation
            </Header>
            <WalletTable />
        </Grid.Row>
      </Grid>
    </>
  );
}

export default Content;
