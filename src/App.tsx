import React from 'react';
import './App.css';
import Container from "react-bootstrap/Container";
import BoardList from "./pages/board-list/BoardList";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import BoardRegister from './pages/board-register/BoardRegister';
import BoardView from "./pages/board-view/BoardView";
import BoardEdit from "./pages/board-edit/BoardEdit";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

function App() {
  return (
    <>
      <BrowserRouter>
        <Container fluid className="p-0">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Link to="/" className="navbar-brand">HOME</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto flex-grow-1">
                <Link to="/" className="nav-link">게시판</Link>
                <Link to="/board-register" className="nav-link">등록</Link>
                <span className="flex-grow-1"></span>
                <Link to="/login" className="nav-link">로그인</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
        <Container fluid className="px-3 py-2">
          <Switch>
            <Route exact path="/" component={BoardList}></Route>
            <Route path="/board-register" component={BoardRegister}></Route>
            <Route path="/board-view/:id" component={BoardView}></Route>
            <Route path="/board-edit/:id" component={BoardEdit}></Route>
          </Switch>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
