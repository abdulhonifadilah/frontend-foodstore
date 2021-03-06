import {
  REQUEST_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from "./constants";
import axios from "axios";

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const userLoggedIn = (form) => {
  return async (dispatch) => {
    await axios
      .post("https://backend-foodstore.herokuapp.com/auth/login", form
      ).then((res) => {
        let { data } = res;
        if (data.error) {
          window.alert(data.message);
        } else {
          localStorage.setItem("auth", JSON.stringify(res.data));
          window.location.reload();
          dispatch({
            type: USER_LOGIN,
            payload: res.data,
          });
        }
      });
  };
};

export const userRegister = (form) => {
  return async (dispatch) => {
    dispatch({
      type: REQUEST_REGISTER,
    });
    await axios
      .post("https://backend-foodstore.herokuapp.com/auth/register", form)
      .then(() => {
        dispatch({
          type: USER_REGISTER,
        });
        window.alert("success");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    await axios
      .post("https://backend-foodstore.herokuapp.com/auth/logout", null, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let { data } = res;
        if (data.error === 0) {
          localStorage.removeItem("auth");
          dispatch({
            type: USER_LOGOUT,
          });
        }
      });
  };
};
