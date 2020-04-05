import React from 'react';
import { Header, Icon, Button, Segment, List, Table, Divider, Popup } from 'semantic-ui-react';
import { saveAsJson } from './files';

const insertIfExists = (key, source, target) => {
    for (let k of Object.keys(source)) {
        if (k.toLowerCase() === key) {
            target[key] = source[k];
        }
    }
}

const getEmailListFromField = (key, source) => {
    let emailRegexp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    for (let k of Object.keys(source)) {
        if (k.toLowerCase() === key.toLowerCase()) {
            let result = source[k].match(emailRegexp);
            return result !== null ? result : [];
        }
    }
    return [];
}

const prepareData = (results) => {
    let data = {
        users: {
            From: getEmailListFromField('From', results),
            To: getEmailListFromField('To', results),
            Cc: getEmailListFromField('Cc', results),
            'Return-Path': getEmailListFromField('Return-Path', results),
        },
        contents: {},
        routing: [],
    };

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

const emailListItem = (email, header) => (
    <List.Item>
        <List.Content floated='right'><Popup inverted style={{ opacity: 0.8 }} content='Check if this email address has been compromised on IHaveBeenPwned' trigger={<Button icon='zoom' circular onClick={() => document.location.href = 'https://haveibeenpwned.com/'} />} /></List.Content>
        <List.Content>
            <List.Header>{email}</List.Header>
            <List.Description>{header}</List.Description>
        </List.Content>
    </List.Item>
);

export default (props) => {
    let data = prepareData(props.results);

    return (
        <Segment basic>
            <Button icon labelPosition='right' onClick={saveAsJson(JSON.stringify(data, null, 2), 'email-metadata-analyzer-summary.json')}>
                Download JSON
                <Icon name='download' />
            </Button>
            <Header as='h3'>
                <Icon name='users' />
                <Header.Content>Stakeholders</Header.Content>
            </Header>
            <Header as='h4'>Sender</Header>
            <List relaxed selection>
                {data.users.From.map(user => emailListItem(user, 'From'))}
                {data.users['Return-Path'].map(user => emailListItem(user, 'Return-Path'))}
            </List>
            <Divider />
            <Header as='h4'>Recipient(s)</Header>
            <List relaxed selection>
                {data.users.To.map(user => emailListItem(user, 'To'))}
                {data.users.Cc.map(user => emailListItem(user, 'Cc'))}
            </List>
            <Divider />



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
