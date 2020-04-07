import React from 'react';
import {
  Button, Modal, Header, Container, List,
} from 'semantic-ui-react';

export default () => (
  <Modal trigger={(
    <Button
      basic
      size="huge"
      style={{
        position: 'absolute',
        top: '0',
        border: '0',
        left: '0',
        width: '3.2em',
        marginLeft: '3em',
        marginTop: '2em',
      }}
      icon="info"
    />
  )}
  >
    <Header as="h1" icon="info circle" content="Info" />
    <Modal.Content>
      <Container text textAlign="justified">
        <Header size="medium">What is this website?</Header>
        <p>Emails are sent with a few extra information other than their plain contents. They can be useful to assess a message's origin, its path from an email server to an other, the protocols used, its content nature, etc.</p>
        <p>These metadata are rarely displayed by email clients and are not easy for a human to read. This website purpose is to help oneself to extract meaningful information from them.</p>
        <Header size="medium">How can I use it?</Header>
        <p>
          Just copy/paste an email metadata string in the form text area and click on
          <i>Analyse</i>
          .
        </p>
        <p>Currently, four views are available:</p>
        <List bulleted>
          <List.Item>
            <b>Summary</b>
            {' '}
            displays the most common parsed headers
          </List.Item>
          <List.Item>
            <b>Graph</b>
            {' '}
            displays a network chart of the message trip through email servers
          </List.Item>
          <List.Item>
            <b>Table</b>
            {' '}
            and
            {' '}
            <b>JSON</b>
            {' '}
            dispays the raw headers under CSV and JSON formats.
          </List.Item>
        </List>
        <Header size="medium">I don't feel comfortable with entering personal email data on a website, is it safe?</Header>
        <p>This is a legitimate concern!</p>
        <p>This website does not perform any call to a backend that would process the results. Everything is computed inside your browser.</p>
        <p>
          You can read the code on GitHub if you want to check it:
          <a href="https://github.com/juliendoutre/email-analyser">https://github.com/juliendoutre/email-analyser</a>
        </p>
        <p>
          You can even deploy the website from the code on your machine (just follow the
          <a href="https://github.com/juliendoutre/email-analyser/blob/master/README.md">README</a>
          {' '}
          instructions to get started).
        </p>
        <Header size="medium">How do I find an email headers?</Header>
        <p>
          They are usually avaible in an email client message
          <i>Details</i>
          {' '}
          panel.
        </p>
        <p>
          The following page can help you to get them from various clients :
          <a href="https://support.google.com/mail/answer/29436?hl=en">https://support.google.com/mail/answer/29436?hl=en</a>
          .
        </p>
      </Container>
    </Modal.Content>
  </Modal>
);
