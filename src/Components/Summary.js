import React from 'react';
import { Header, Icon, Button, Segment, List, Table } from 'semantic-ui-react';
import { saveAsJson } from './files';

const insertIfExists = (key, source, target) => {
    for (let k of Object.keys(source)) {
        if (k.toLowerCase() === key) {
            target[key] = source[k];
        }
    }
}

const prepareData = (results) => {
    let data = {
        users: {},
        contents: {},
        routing: [],
    };

    ['from', 'to', 'cc'].forEach(key => insertIfExists(key, results, data.users));
    ['message-id', 'subject', 'thread-topic', 'mime-version', 'content-type', 'content-language',].forEach(key => insertIfExists(key, results, data.contents));

    if ('Received' in results) {
        for (let line of results['Received']) {
            let row = {};

            let by = line.match(/by [-.:\w]*/);
            if (by !== null && by.length > 0) {
                row['target'] = by[0].replace('by ', '').toLowerCase();
            }

            let from = line.match(/^from [-.:\w]*/);
            if (from != null && from.length > 0) {
                row['source'] = from[0].replace('from ', '').toLowerCase();
            }

            data.routing.push(row);
        }
    }

    return data;
};

export default (props) => {
    let data = prepareData(props.results);

    return (
        <Segment basic>
            <Button icon labelPosition='right' onClick={saveAsJson(JSON.stringify(data, null, 2), 'email-metadata-analyzer-summary.json')}>
                Download JSON
                <Icon name='download' />
            </Button>
            <Header as='h3' disabled={Object.keys(data.users).length === 0}>
                <Icon name='users' />
                <Header.Content>Stakeholders</Header.Content>
            </Header>
            <List bulleted relaxed items={Object.keys(data.users).map(k => k + ': ' + data.users[k])}></List>
            <Header as='h3' disabled={Object.keys(data.contents).length === 0}>
                <Icon name='file alternate' />
                <Header.Content>Contents</Header.Content>
            </Header>
            <List bulleted relaxed items={Object.keys(data.contents).map(k => k + ': ' + data.contents[k])}></List>
            <Header as='h3' disabled={Object.keys(data.contents).length === 0}>
                <Icon name='globe' />
                <Header.Content>Routing</Header.Content>
            </Header>
            {data.routing.length > 0 ? <Table>
                <Table.Header>
                    <Table.HeaderCell>Source</Table.HeaderCell>
                    <Table.HeaderCell>Target</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                    {data.routing.map(key => (
                        <Table.Row key={key}>
                            <Table.Cell>{key.source}</Table.Cell>
                            <Table.Cell>{key.target}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table> : null}
        </Segment>
    );
};
