import React from 'react';
import { Table } from 'semantic-ui-react'
import { useSelector } from "react-redux";
import { spaceSelector , companyInfoSelector } from "../slices/filter";

const CustomTable = () => {

  const { spaces_info } = useSelector(companyInfoSelector);
  const space = useSelector(spaceSelector);
  console.log("spaces_info", spaces_info);
  // initialize tronweb

  return (
    <>
      <Table sortable celled fixed textAlign='center'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Space</Table.HeaderCell>
                    <Table.HeaderCell>Owner ID</Table.HeaderCell>
                    <Table.HeaderCell>Member ID in current Space {space + 1}</Table.HeaderCell>
                    <Table.HeaderCell>Member TYPE</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {spaces_info.length > space && spaces_info.length != 0 && spaces_info[space].map(( item , index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{index+1}</Table.Cell>
                        <Table.Cell>{space + 1}</Table.Cell>
                        <Table.Cell>{item['owner_ID']}</Table.Cell>
                        <Table.Cell>{item['member_ID']}</Table.Cell>
                        <Table.Cell>{item['member_TYPE'] == '1' ? "Re-entry" : "Upgrade"}</Table.Cell>
                    </Table.Row>
                ))}
                {
                    spaces_info.length > space && spaces_info.length ?
                    (<Table.Row >
                        <Table.Cell colSpan='3'>Total Count</Table.Cell>
                        <Table.Cell>{spaces_info[space].length}</Table.Cell>
                    </Table.Row>) :
                    (<></>)
                }
            </Table.Body>
        </Table>
    </>
  );
}

export default CustomTable;
