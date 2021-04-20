import React from 'react';
import './App.css';
import Container from "react-bootstrap/Container";
import BoardList from "./pages/board-list/BoardList";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import BoardRegister from './pages/board-register/BoardRegister';
import BoardView from "./pages/board-view/BoardView";

function App() {
  return (
    <Container className="p-5">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={BoardList}></Route>
          <Route path="/board-register" component={BoardRegister}></Route>
          <Route path="/board-view/:id" component={BoardView}></Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
