import jwtDecode from "jwt-decode";

export const jwtUtils = {
  isAuth: (token) => {
    if (!token) {
      return false;
    }
    const decoded = jwtDecode(token);
    // console.log(decoded);
    if (decoded.exp > new Date().getTime() / 1000) {
      return true;
    } else {
      return false;
    }
  },
  getId: (token) => {
    const decoded = jwtDecode(token)
    return decoded.jti;
  },
  getName: (token) => {
    const decoded = jwtDecode(token)
    return decoded.subject;
  },
  getRoles: (token) => {
    const decoded = jwtDecode(token)
    return decoded['roles'];
  },
}
