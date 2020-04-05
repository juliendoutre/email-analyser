import React from 'react';
import { Header, Icon, Button, Segment, List, Table, Divider, Popup } from 'semantic-ui-react';
import { saveAsJson, copyToClipboard } from './files';
import { getStringIfExists, getEmailListFromField, parseRoutingNodes } from './parsing';


const prepareData = (results) => {
    let data = {
        users: {
            From: getEmailListFromField('From', results),
            To: getEmailListFromField('To', results),
            Cc: getEmailListFromField('Cc', results),
            'Return-Path': getEmailListFromField('Return-Path', results),
        },
        contents: {
            'Message-Id': getStringIfExists('Message-Id', results),
            'Date': getStringIfExists('Date', results),
            'Subject': getStringIfExists('Subject', results),
            'MIME-Version': getStringIfExists('MIME-Version', results),
            'Content-Type': getStringIfExists('Content-Type', results),
            'Content-Language': getStringIfExists('Content-Language', results),
        },
        routing: parseRoutingNodes('Received' in results ? results['Received'] : []),
    };

    return data;
};

const emailListItem = (email, header) => (
    <List.Item>
        <List.Content floated='right'><Popup inverted style={{ opacity: 0.8 }} content='Check if this email address has been compromised on IHaveBeenPwned' trigger={<Button icon='zoom' circular onClick={() => document.location.href = 'https://haveibeenpwned.com/'} />} /></List.Content>
        <List.Content floated='right'><Popup inverted style={{ opacity: 0.8 }} content='Copy to clipboard' trigger={<Button icon='copy' circular onClick={() => copyToClipboard(email)} />} /></List.Content>
        <List.Content>
            <List.Header>{email}</List.Header>
            <List.Description>{header}</List.Description>
        </List.Content>
    </List.Item>
);

const routingNodeItem = (node) => (
    node !== undefined ?
        <List relaxed selection>
            {'dns' in node ?
                <List.Item>
                    <List.Content floated='right'><Popup inverted style={{ opacity: 0.8 }} content='Perform a DNS lookup search' trigger={<Button icon='at' circular disabled />} /></List.Content>
                    <List.Content floated='right'><Popup inverted style={{ opacity: 0.8 }} content='Copy to clipboard' trigger={<Button icon='copy' circular onClick={() => copyToClipboard(node['dns'])} />} /></List.Content>
                    <List.Header>Domain Name</List.Header>
                    {node['dns']}
                </List.Item> : null}
            {'ipv4' in node ?
                <List.Item>
                    <List.Content floated='right'><Popup inverted style={{ opacity: 0.8 }} content='Perform a DNS reverse lookup' trigger={<Button icon='cloud' circular disabled />} /></List.Content>
                    <List.Content floated='right'><Popup inverted style={{ opacity: 0.8 }} content='Copy to clipboard' trigger={<Button icon='copy' circular onClick={() => copyToClipboard(node['ipv4'])} />} /></List.Content>
                    <List.Header>IPv4</List.Header>
                    {node['ipv4']}
                </List.Item> : null}
            {'ipv6' in node ?
                <List.Item>
                    <List.Content floated='right'><Popup inverted style={{ opacity: 0.8 }} content='Perform a DNS reverse lookup' trigger={<Button icon='cloud' circular disabled />} /></List.Content>
                    <List.Content floated='right'><Popup inverted style={{ opacity: 0.8 }} content='Copy to clipboard' trigger={<Button icon='copy' circular onClick={() => copyToClipboard(node['ipv6'])} />} /></List.Content>
                    <List.Header>IPv6</List.Header>
                    {node['ipv6']}
                </List.Item> : null}
        </List> : null
);

export default (props) => {
    let data = prepareData(props.results);

    return (
        <Segment basic>
            <Button icon labelPosition='right' onClick={saveAsJson(JSON.stringify(data, null, 2), 'email-metadata-analyzer-summary.json')}>
                Download JSON
                <Icon name='download' />
            </Button>

            <Header as='h2'>
                <Icon name='users' />
                <Header.Content>Stakeholders</Header.Content>
            </Header>
            <Header as='h4' disabled={data.users.From.length === 0 && data.users["Return-Path"].length === 0}>Sender</Header>
            <List relaxed selection>
                {data.users.From.map(user => emailListItem(user, 'From'))}
                {data.users['Return-Path'].map(user => emailListItem(user, 'Return-Path'))}
            </List>
            <Divider />
            <Header as='h4' disabled={data.users.To.length === 0 && data.users.Cc.length === 0}>Recipient(s)</Header>
            <List relaxed selection>
                {data.users.To.map(user => emailListItem(user, 'To'))}
                {data.users.Cc.map(user => emailListItem(user, 'Cc'))}
            </List>

            <Divider />

            <Header as='h2' disabled={Object.keys(data.contents).length === 0}>
                <Icon name='file alternate' />
                <Header.Content>Contents</Header.Content>
            </Header>
            <Table basic='very' selectable>
                <Table.Body>
                    {
                        Object.keys(data.contents).map(k => <Table.Row disabled={data.contents[k] === ""}>
                            <Table.Cell width={3}><b>{k}</b></Table.Cell>
                            <Table.Cell width={11}>{data.contents[k]}</Table.Cell>
                            <Table.Cell width={2} textAlign='center'>
                                <Popup inverted style={{ opacity: 0.8 }} content='Copy to clipboard' trigger={<Button icon='copy' circular disabled={data.contents[k] === ""} onClick={() => copyToClipboard(data.contents[k])} />} />
                            </Table.Cell>
                        </Table.Row>)
                    }
                </Table.Body>
            </Table>

            <Divider />

            <Header as='h2' disabled={Object.keys(data.contents).length === 0}>
                <Icon name='globe' />
                <Header.Content>Routing</Header.Content>
            </Header>

            {data.routing.length > 0 ?
                <Table columns={3}>
                    <Table.Header>
                        <Table.HeaderCell>Timestamp</Table.HeaderCell>
                        <Table.HeaderCell>Source</Table.HeaderCell>
                        <Table.HeaderCell>Target</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {data.routing.map(record => (
                            <Table.Row key={record}>
                                {('timestamp' in record) ? <Table.Cell>{record['timestamp']}</Table.Cell> : <Table.Cell></Table.Cell>}
                                {('source' in record) ? <Table.Cell>{routingNodeItem(record['source'])}</Table.Cell> : <Table.Cell></Table.Cell>}
                                {('target' in record) ? <Table.Cell>{routingNodeItem(record['target'])}</Table.Cell> : <Table.Cell></Table.Cell>}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table> : null}
        </Segment>
    );
};
