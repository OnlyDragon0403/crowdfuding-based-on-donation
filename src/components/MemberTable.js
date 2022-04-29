import React, {useState} from 'react';
import { Table, Button, Icon } from 'semantic-ui-react'
import { useSelector, useDispatch } from "react-redux";
import { sortdata, filterSelector , selectMemberMatrix } from "../slices/filter";

const MemberTable = () => {

  const dispatch = useDispatch();
  const reverse_users = useSelector(filterSelector);

  // initialize tronweb
  let {column, data, direction} = reverse_users;

  const [selectedMember, setSelectedMember] = useState(0);

  const setMember = (member) => {
    setSelectedMember(member);
    dispatch(selectMemberMatrix(member));
  }

  return (
    <>
      <Table sortable celled fixed textAlign='center'>
            <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell
                      sorted={column === 'type' ? direction : null}
                      onClick={() => dispatch(sortdata('type'))}
                  >
                      TYPES
                  </Table.HeaderCell>
                  <Table.HeaderCell>MEMBER ID</Table.HeaderCell>
                  <Table.HeaderCell>L1</Table.HeaderCell>
                  <Table.HeaderCell>L2</Table.HeaderCell>
                  <Table.HeaderCell>L3</Table.HeaderCell>
                  <Table.HeaderCell>MATRIX</Table.HeaderCell>
                  <Table.HeaderCell>PAYMENT</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map(({ MEMBERID , type, levels }, index) => (
                <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{type}</Table.Cell>
                    <Table.Cell>{MEMBERID}</Table.Cell>
                    {levels.map(( item, index ) =>
                      <Table.Cell key={index}>{item}</Table.Cell>
                    )}
                    <Table.Cell>
                      <Button icon labelPosition='left' color='blue' size='medium' onClick={e => setMember(index)}>
                        <Icon name='eye' />
                        Visualize
                      </Button>
                    </Table.Cell>
                    <Table.Cell>Payment</Table.Cell>
                </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </>
  );
}

export default MemberTable;
