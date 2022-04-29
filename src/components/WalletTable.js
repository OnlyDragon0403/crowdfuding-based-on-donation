import React from 'react';
import { Table } from 'semantic-ui-react'
import { useSelector } from "react-redux";
import { walletSelector } from "../slices/filter";

const WalletTable = () => {

  const price = [5,20,50];
  const wallets = useSelector(walletSelector);
  // initialize tronweb

  return (
    <>
      <Table sortable celled fixed textAlign='center'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Wallet</Table.HeaderCell>
                    <Table.HeaderCell>1</Table.HeaderCell>
                    <Table.HeaderCell>2</Table.HeaderCell>
                    <Table.HeaderCell>3</Table.HeaderCell>
                    <Table.HeaderCell>4</Table.HeaderCell>
                    <Table.HeaderCell>5</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    Object.keys(wallets).map(( wallet_name , index) => {
                        if(index == 0)
                            return  (
                                    <Table.Row key={index}>
                                        <Table.Cell>{wallet_name}</Table.Cell>
                                        <Table.Cell colSpan='5'>{wallets[wallet_name]}</Table.Cell>
                                    </Table.Row>
                                    )
                        else
                            return  (
                                    <Table.Row key={index}>
                                        <Table.Cell>{wallet_name}</Table.Cell>
                                        {wallets[wallet_name].map((val , index) => (
                                            <Table.Cell key={index}>{val}</Table.Cell>
                                        ))}
                                    </Table.Row>
                                    )
                    })
                }
            </Table.Body>
        </Table>
    </>
  );
}

export default WalletTable;
