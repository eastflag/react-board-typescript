import React from 'react';
import './App.css';
import Container from "react-bootstrap/Container";
import BoardList from "./pages/board-list/BoardList";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import BoardRegister from './pages/board-register/BoardRegister';
import BoardView from "./pages/board-view/BoardView";
import BoardEdit from "./pages/board-edit/BoardEdit";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

function App() {
  return (
    <Container fluid className="p-0">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">HOME</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto flex-grow-1">
            <Nav.Link href="/">게시판</Nav.Link>
            <Nav.Link href="/board-register">등록</Nav.Link>
            <span className="flex-grow-1"></span>
            <Nav.Link href="/login">로그인</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid className="px-3 py-2">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={BoardList}></Route>
            <Route path="/board-register" component={BoardRegister}></Route>
            <Route path="/board-view/:id" component={BoardView}></Route>
            <Route path="/board-edit/:id" component={BoardEdit}></Route>
          </Switch>
        </BrowserRouter>
      </Container>
    </Container>
  );
}

export default App;
