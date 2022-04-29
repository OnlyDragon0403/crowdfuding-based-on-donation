import React from 'react';
import { Table } from 'semantic-ui-react'
import { useSelector } from "react-redux";
import { levelSelector , spaceSelector } from "../slices/filter";

const LevelTable = () => {

  const price = [100, 500, 2500, 12500, 62500];
  const percent = [5 , 20, 50];
  const levels = useSelector(levelSelector);
  const space = useSelector(spaceSelector);

  const getTotalDonation = () => {
      let totalDonation = 0;
      levels.forEach((item , index) => {
         totalDonation += item * price[space] * percent[index] / 100;
      });
      return totalDonation;
  }
  // initialize tronweb

  return (
    <>
      <Table sortable celled fixed textAlign='center'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Level</Table.HeaderCell>
                    <Table.HeaderCell>Wallet</Table.HeaderCell>
                    <Table.HeaderCell>Donation $</Table.HeaderCell>
                    <Table.HeaderCell>Received</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {levels.map(( item , index) => (
                <Table.Row key={index}>
                    <Table.Cell>{index+1}</Table.Cell>
                    <Table.Cell>{item}</Table.Cell>
                    <Table.Cell>{price[space] * percent[index] / 100}</Table.Cell>
                    <Table.Cell>{item * price[space] * percent[index] / 100}</Table.Cell>
                </Table.Row>
                ))}
                {
                    levels.length ?
                    (<Table.Row >
                        <Table.Cell colSpan='3'>Total Matrix Donation</Table.Cell>
                        <Table.Cell>{getTotalDonation()}</Table.Cell>
                    </Table.Row>) :
                    (<></>)
                }
            </Table.Body>
        </Table>
    </>
  );
}

export default LevelTable;
