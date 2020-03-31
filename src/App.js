import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import Header from './Components/Header';
import Ribbon from './Components/Ribbon';
import Form from './Components/Form';

export default () => (
  <div className="App">
    <Ribbon />
    <Container style={{ paddingTop: '3em' }} textAlign='left'>
      <Header />
      <Form />
    </Container>
  </div>
);
