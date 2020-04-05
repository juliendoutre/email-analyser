import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import Header from './Components/Header';
import Ribbon from './Components/Ribbon';
import Form from './Components/Form';
import Info from './Components/Info';

export default () => (
  <div className="App">
    <Ribbon />
    <Info />
    <Container style={{ paddingTop: '3em', paddingBottom: '3em' }} textAlign='left'>
      <Header />
      <Form />
    </Container>
  </div>
);
