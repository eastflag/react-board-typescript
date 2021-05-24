import React from 'react';
import {Redirect, Route, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ROUTES_PATH} from "./index";
import {jwtUtils} from "../utils/jwtUtils";

import {setToken} from "../redux/reducers/AuthReducer";

const PrivateRoute = (props) => {
  // BrowseRouter로 부터 넘어오는 props를 파악하는게 중요.
  // path, location ...
  console.log(props);

  const dispatch = useDispatch();
  const history = useHistory();
  const { component: RouteComponent, ...rest } = props;

  const token = useSelector(state => state.Auth.token);

  // 아래 view가 리턴되지 않도록 한다. jwtUtils.getRoles() 실행시 에러 발생함.
  // 이후에 useEffect가 실행된다.
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
