import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import Header from './Components/Header';
import Ribbon from './Components/Ribbon';

export default () => (
  <div className="App">
    <Ribbon />
    <Container style={{ paddingTop: '3em' }} textAlign='left'>
      <Header />
    </Container>
  </div>
);
