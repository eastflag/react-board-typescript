import React from 'react';
import logo from './logo.svg';
import './App.css';
import Container from "react-bootstrap/Container";
import BoardList from "./components/BoardList";
import {Button, Col, Row} from "react-bootstrap";

function App() {
  return (
    <Container className="p-5">
      <Row className="mb-3">
        <Col><Button variant="primary">등 록</Button></Col>
      </Row>
      <BoardList></BoardList>
    </Container>
  );
}

export default App;
