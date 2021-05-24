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
    return decoded.id;
  },
  getName: (token) => {
    const decoded = jwtDecode(token)
    return decoded.name;
  },
  getRoles: (token) => {
    const decoded = jwtDecode(token)
    return decoded['roles'];
  },
}
