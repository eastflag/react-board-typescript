import React from 'react';
import './App.css';
import Container from "react-bootstrap/Container";
import BoardList from "./components/BoardList";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import BoardRegister from './components/BoardRegister';

function App() {
  return (
    <Container className="p-5">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={BoardList}></Route>
          <Route path="/add" component={BoardRegister}></Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
