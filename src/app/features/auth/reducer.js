import {
  REQUEST_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from "./constants";

let auth = JSON.parse(localStorage.getItem("auth"));
const initialState = auth
  ? { loggedIn: true, role: auth.user.role, auth }
  : { user: null, token: null, loggedIn: false };

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_LOGIN:
      return { ...state, user: payload.user, token: payload.token };
    case USER_LOGOUT:
      return { ...state, user: null, token: null, loggedIn: false };
    case USER_REGISTER:
      return {
        ...state,
        register: true,
      };
    case REQUEST_REGISTER:
      return {
        ...state,
        register: false,
      };
    default:
      return state;
  }
}
