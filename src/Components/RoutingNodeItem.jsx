import React, { Component } from 'react';
import { copyToClipboard } from './files';
import { Popup, List } from 'semantic-ui-react';

class RoutingNodeItemAttribute extends Component {
    state = { popupVisible: false };

    handleOpen = () => {
        this.setState({ popupVisible: true });
        this.timeout = setTimeout(() => this.handleClose(), 600);
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

export default (node) => (
    node !== undefined ?
        <List relaxed selection>
            {'dns' in node ? <RoutingNodeItemAttribute header='Domain name' description={node['dns']} /> : null}
            {'ipv4' in node ? <RoutingNodeItemAttribute header='IPv4' description={node['ipv4']} /> : null}
            {'ipv6' in node ? <RoutingNodeItemAttribute header='IPv6' description={node['ipv6']} /> : null}
        </List> : null
);
