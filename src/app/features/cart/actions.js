import axios from "axios";
import { ADD_CART, GET_CART, LOADING_CART, SUCCESS_CART } from "./constants";

export const addToCart = (data) => async (dispatch) => {
  try {
    const cart = [];
    dispatch({
      type: LOADING_CART,
    });
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    cart.push(data);
    await axios
      .put(
        `https://backend-foodstore.herokuapp.com/api/carts`,
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
        dispatch({
          type: SUCCESS_CART,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: SUCCESS_CART,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const getToCart = () => async (dispatch) => {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  await axios
    .get(`https://backend-foodstore.herokuapp.com/api/carts`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res,
      });
      // dispatch({
      //   type: SUCCESS_CART,
      // });
    })
    .catch((err) => console.log(err));
};
