import React, { Component } from 'react';
import { Header, Icon, Button, Segment, List, Table, Divider, Popup } from 'semantic-ui-react';
import { saveAsJson, copyToClipboard } from './files';
import { getStringIfExists, getEmailListFromField, parseRoutingRecords } from './parsing';


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
        routing: parseRoutingRecords('Received' in results ? results['Received'] : []),
    };

    return data;
};

class EmailListItem extends Component {
    state = { popupVisible: false };

    handleOpen = () => {
        this.setState({ popupVisible: true });
        this.timeout = setTimeout(() => this.handleClose(), 1000);
    };

    handleClose = () => {
        this.setState({ popupVisible: false });
        clearTimeout(this.timeout);
    };

    render() {
        return (
            <Popup
                inverted
                content='Copied to clipboard!'
                on='click'
                open={this.state.popupVisible}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                trigger={
                    <List.Item onClick={() => copyToClipboard(this.props.email)} >
                        <List.Content floated='right'><Popup inverted style={{ opacity: 0.8 }} content='Check if this email address has been compromised on HaveIBeenPwned' trigger={<Button icon='zoom' circular onClick={() => document.location.href = 'https://haveibeenpwned.com/'} />} /></List.Content>
                        <List.Content>
                            <List.Header>{this.props.email}</List.Header>
                            <List.Description>{this.props.header}</List.Description>
                        </List.Content>
                    </List.Item >
                }
            />
        );
    }
};

class RoutingNodeItemAttribute extends Component {
    state = { popupVisible: false };

    handleOpen = () => {
        this.setState({ popupVisible: true });
        this.timeout = setTimeout(() => this.handleClose(), 1000);
    };

    handleClose = () => {
        this.setState({ popupVisible: false });
        clearTimeout(this.timeout);
    };

    render() {
        return (
            <Popup
                inverted
                content='Copied to clipboard!'
                on='click'
                open={this.state.popupVisible}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                trigger={
                    <List.Item onClick={() => copyToClipboard(this.props.description)} >
                        <List.Content>
                            <List.Header>{this.props.header}</List.Header>
                            <List.Description>{this.props.description}</List.Description>
                        </List.Content>
                    </List.Item>
                }
            />
        );
    }
};

const routingNodeItem = (node) => (
    node !== undefined ?
        <List relaxed selection>
            {'dns' in node ? <RoutingNodeItemAttribute header='Domain name' description={node['dns']} /> : null}
            {'ipv4' in node ? <RoutingNodeItemAttribute header='IPv4' description={node['ipv4']} /> : null}
            {'ipv6' in node ? <RoutingNodeItemAttribute header='IPv6' description={node['ipv6']} /> : null}
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
                {data.users.From.map(user => <EmailListItem email={user} header='From' />)}
                {data.users['Return-Path'].map(user => <EmailListItem email={user} header='Return-Path' />)}
            </List>
            <Divider />
            <Header as='h4' disabled={data.users.To.length === 0 && data.users.Cc.length === 0}>Recipient(s)</Header>
            <List relaxed selection>
                {data.users.To.map(user => <EmailListItem email={user} header='To' />)}
                {data.users.Cc.map(user => <EmailListItem email={user} header='Cc' />)}
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
                <Table>
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
