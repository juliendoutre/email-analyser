import React, { Component } from 'react';
import { Form, Tab, Message, Button } from 'semantic-ui-react';
import Table from './Table';
import parse from './parser';
import JSON from './Json';
import Graph from './Graph';
import Summary from './Summary';


export default class extends Component {
    state = { email: '', results: {}, messageHidden: true, activeIndex: 0 };

    handleChange = (_, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        this.setState({ results: {}, messageHidden: true, activeIndex: 0 });
        const results = parse(this.state.email);
        this.setState({ results: results });
        this.setState({ messageHidden: Object.keys(results).length !== 0 });
    }

    handleDismiss = () => {
        this.setState({ messageHidden: true });
    };

    handleClear = () => {
        this.setState({ email: '', loading: false, results: {}, messageHidden: true });
    };

    handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

    render() {
        return (
            <div>
                <Form style={{ textAlign: 'center', marginTop: '3em' }}>
                    <Form.TextArea placeholder='Email contents' name='email' value={this.state.email} onChange={this.handleChange} rows={15} />
                    <Button onClick={this.handleSubmit} >Analyse</Button>
                    <Button onClick={this.handleClear} color='orange' disabled={this.state.email.length === 0}>Clear</Button>
                </Form>
                <Message warning hidden={this.state.messageHidden} onDismiss={this.handleDismiss}>
                    <Message.Header>Could not parse any header...</Message.Header>
                    <p>Please enter an other input to parse.</p>
                </Message>
                <Tab activeIndex={this.state.activeIndex} onTabChange={this.handleTabChange} panes={[
                    { menuItem: 'Summary', render: () => <Tab.Pane><Summary results={this.state.results} /></Tab.Pane> },
                    { menuItem: 'Graph', render: () => <Tab.Pane><Graph results={this.state.results} /></Tab.Pane> },
                    { menuItem: 'Table', render: () => <Tab.Pane><Table results={this.state.results} /></Tab.Pane> },
                    { menuItem: 'JSON', render: () => <Tab.Pane><JSON results={this.state.results} /></Tab.Pane> },
                ]} hidden={Object.keys(this.state.results).length === 0} style={{ marginTop: '3em' }} defaultActiveIndex={0} />
            </div>
        );
    }
};
