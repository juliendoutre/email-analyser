import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

export default () => (
  <Header as="h1" icon textAlign="center">
    <Icon name="mail" circular />
    <Header.Content>
      Email Analyser
    </Header.Content>
    <Header.Subheader>
      Parse an email headers to get more insights into its metadata.
    </Header.Subheader>
  </Header>
);
