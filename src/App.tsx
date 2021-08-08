import React, {useEffect, useState} from 'react';
import './App.css';
import Container from "react-bootstrap/Container";
import BoardList from "./pages/board-list/BoardList";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import BoardRegister from './pages/board-register/BoardRegister';
import BoardView from "./pages/board-view/BoardView";
import BoardEdit from "./pages/board-edit/BoardEdit";
import {Nav, Navbar} from "react-bootstrap";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up/SignUp";

// 3rd react-toastify
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./routes/PrivateRoute";
import {jwtUtils} from "./utils/JwtUtils";
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "./redux/reducers/AuthReducer";
import Home from "./pages/Home";


function App(props: any) {
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.Auth.token);

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  const logout = () => {
    dispatch(setToken(''));
  }

  return (
    <>
      <BrowserRouter>
        <Container fluid className="p-0">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Link to="/" className="navbar-brand">HOME</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto flex-grow-1">
                <Link to="/board-list" className="nav-link">게시판</Link>
                <Link to="/board-register" className="nav-link">글등록</Link>
                <span className="flex-grow-1"></span>
                {
                  isAuth ? <Nav.Link onClick={logout}>로그아웃</Nav.Link> :
                    <Link to="/login" className="nav-link">로그인</Link>
                }

              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
        <Container fluid className="px-3 py-2">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/board-list" component={BoardList}></Route>
            <PrivateRoute path="/board-register" component={BoardRegister}></PrivateRoute>
            <Route path="/board-view/:id" component={BoardView}></Route>
            <PrivateRoute path="/board-edit/:id" component={BoardEdit}></PrivateRoute>
            <Route path="/login" component={Login}></Route>
            <Route path="/sign-up" component={SignUp}></Route>
          </Switch>
        </Container>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
