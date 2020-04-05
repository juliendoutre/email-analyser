import React from 'react';
import { Header, Icon, Button, Segment, List, Table, Divider, Popup } from 'semantic-ui-react';
import { saveAsJson } from './files';

const getStringIfExists = (key, source) => {
    for (let k of Object.keys(source)) {
        if (k.toLowerCase() === key.toLowerCase()) {
            return source[k];
        }
    }

    return "";
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

const parseNode = (str) => {
    let node = {};

    let ipv4 = str.match(/[\s(,;[](?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\s),;\]]/);
    if (ipv4 !== null && ipv4.length > 0) {
        node['ipv4'] = ipv4[0].replace(/^[\s(,;[]/, '').replace(/[\s),;\]]$/, '');
    }

    let ipv6 = str.match(/([0-9a-f]|:){1,4}(:([0-9a-f]{0,4})*){1,7}/i);
    if (ipv6 !== null && ipv6.length > 0) {
        node['ipv6'] = ipv6[0];
    }

    let dns = str.match(/((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}/);
    if (dns !== null && dns.length > 0) {
        node['dns'] = dns[0];
    }

    return node;
};

const parseRoutingNodes = (lines) => {
    let nodes = [];

    for (let line of lines) {
        let node = {};

        line = line.replace('\n', ' ').replace('\t', ' ');

        let dateStartIndex = line.indexOf(';');
        if (dateStartIndex !== -1) {
            node['timestamp'] = line.substring(dateStartIndex + 1, line.length);
            line = line.substring(0, dateStartIndex);
        }

        let byStartIndex = line.indexOf('by ');
        if (byStartIndex !== -1) {
            node['target'] = parseNode(line.substring(byStartIndex + 3, line.length));
            line = line.substring(0, byStartIndex);
        }

        let fromStartIndex = line.indexOf('from ');
        if (fromStartIndex !== -1) {
            node['source'] = parseNode(line.substring(fromStartIndex + 5, line.length));
        }

        nodes.push(node);
    }

    return nodes;
};

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

const copyToClipboard = (text) => {
    let tag = document.createElement("textarea");
    tag.innerText = text;
    document.body.appendChild(tag);

    tag.select();
    tag.setSelectionRange(0, 99999);

    document.execCommand("copy");
    tag.remove();
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
                    <List.Content floated='right'><Popup inverted style={{ opacity: 0.8 }} content='Perform a DNS lookup search' trigger={<Button icon='at' circular />} /></List.Content>
                    <List.Content floated='right'><Popup inverted style={{ opacity: 0.8 }} content='Copy to clipboard' trigger={<Button icon='copy' circular onClick={() => copyToClipboard(node['dns'])} />} /></List.Content>
                    <List.Header>Domain Name</List.Header>
                    {node['dns']}
                </List.Item> : null}
            {'ipv4' in node ?
                <List.Item>
                    <List.Content floated='right'><Popup inverted style={{ opacity: 0.8 }} content='Perform a DNS reverse lookup' trigger={<Button icon='cloud' circular />} /></List.Content>
                    <List.Content floated='right'><Popup inverted style={{ opacity: 0.8 }} content='Copy to clipboard' trigger={<Button icon='copy' circular onClick={() => copyToClipboard(node['ipv4'])} />} /></List.Content>
                    <List.Header>IPv4</List.Header>
                    {node['ipv4']}
                </List.Item> : null}
            {'ipv6' in node ?
                <List.Item>
                    <List.Content floated='right'><Popup inverted style={{ opacity: 0.8 }} content='Perform a DNS reverse lookup' trigger={<Button icon='cloud' circular />} /></List.Content>
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
                                {('timestamp' in record) ? <Table.Cell>{record['timestamp']}</Table.Cell> : null}
                                {('source' in record) ? <Table.Cell>{routingNodeItem(record['source'])}</Table.Cell> : null}
                                {('target' in record) ? <Table.Cell>{routingNodeItem(record['target'])}</Table.Cell> : null}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table> : null}
        </Segment>
    );
};
