import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {ROUTES_PATH} from "./index";
import {jwtUtils} from "../utils/jwtUtils";

const PrivateRoute = (props) => {
  // BrowseRouter로 부터 넘어오는 props를 파악하는게 중요.
  // path, location ...
  console.log(props);

  const { component: RouteComponent, ...rest } = props;

  const token = useSelector(state => state.Auth.token);

  // 아래 view가 리턴되지 않도록 한다.
  // redirectUrl은 로그인이 성공후 돌아갈 화면이다.
  if (!jwtUtils.isAuth(token)) {
    return <Redirect to={`${ROUTES_PATH.Login}?redirectUrl=${props.path}`} />
  }

  return (
    <Route
      {...rest}
      render = {
        routeProps => <RouteComponent {...routeProps} />
      }
    />
  );
}

export default PrivateRoute
