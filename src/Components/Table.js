import React from 'react';
import { Table, Button, Icon, Segment } from 'semantic-ui-react';
import { saveAsCSV } from './files';


export default (props) =>
    <Segment basic>
        <Button icon labelPosition='right' onClick={saveAsCSV(props.results, 'email-analyzer-metadata-headers.csv')}>Download CSV<Icon name='download' /></Button>
        <Table selectable basic='very'>
            <Table.Body>
                {Object.keys(props.results).map(key => (
                    <Table.Row key={key}>
                        <Table.Cell>
                            {key}
                        </Table.Cell>
                        <Table.Cell>
                            <Segment basic style={{ overflow: 'auto', width: '45vw', whiteSpace: 'nowrap' }} > {Array.isArray(props.results[key]) ? props.results[key].join('\n') : props.results[key]}</Segment>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </Segment >;
