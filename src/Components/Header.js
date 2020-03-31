import React from 'react';
import { Header, Icon, Label } from 'semantic-ui-react'


export default () =>
    <Header as='h1' icon textAlign='center'>
        <Icon name='mail' circular />
        <Header.Content>
            Email Analyser
            <Label color='blue'>
                BETA
            </Label>
        </Header.Content>
    </Header>;
