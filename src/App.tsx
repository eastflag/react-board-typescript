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
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">HOME</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav bd-highlight">
            <Nav className="mr-auto flex-grow-1">
              <Nav.Link href="#home">게시판</Nav.Link>
              <Nav.Link href="#link">등록</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              {/*<span className="flex-grow-1"></span>*/}
              <Nav.Link href="#link" className="ml-auto">로그인</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" component={BoardList}></Route>
          <Route path="/board-register" component={BoardRegister}></Route>
          <Route path="/board-view/:id" component={BoardView}></Route>
          <Route path="/board-edit/:id" component={BoardEdit}></Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
