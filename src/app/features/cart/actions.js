import axios from "axios";
import { ADD_CART, GET_CART, LOADING, SUCCESS } from "./constants";

export const addToCart = (data) => async (dispatch) => {
  try {
    const cart = [];
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    dispatch({ type: LOADING });
    cart.push(data);
    await axios
      .put(
        `http://localhost:3000/api/carts`,
        { items: cart },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        window.alert("success");
        dispatch({
          type: ADD_CART,
          payload: res.data,
        });
        dispatch({ type: SUCCESS });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export const getToCart = () => async (dispatch) => {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  await axios
    .get(`http://localhost:3000/api/carts`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res,
      });
    })
    .catch((err) => console.log(err));
};
