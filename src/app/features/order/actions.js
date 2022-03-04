import axios from "axios";
import {
  GET_INVOICE,
  GET_ORDER,
  LOADING,
  SET_FORM_ORDER,
  SUCCESS,
} from "./constans";

export const createOrders = (data) => {
  return async (dispatch) => {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    dispatch({ type: LOADING });
    await axios
      .post("https://backend-foodstore.herokuapp.com/api/orders", data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        window.alert("success");
        window.location.reload();
        dispatch({ type: SUCCESS });
      })
      .catch((err) => console.log(err));
  };
};

export const setFormOrder = (formType, formValue) => {
  return { type: SET_FORM_ORDER, formType, formValue };
};

export const getOrders = () => {
  return async (dispatch) => {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    dispatch({ type: LOADING });
    await axios
      .get(`https://backend-foodstore.herokuapp.com/api/orders`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: GET_ORDER, payload: res.data.data });
        dispatch({ type: SUCCESS });
      })
      .catch((err) => console.log(err));
  };
};

export const getOrdersById = (id) => {
  return async (dispatch) => {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    // dispatch({ type: LOADING });
    await axios
      .get(`https://backend-foodstore.herokuapp.com/api/orders/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: GET_ORDER, payload: res.data.order_items });
        // dispatch({ type: SUCCESS });
      })
      .catch((err) => console.log(err));
  };
};

export const getInvoices = () => {
  return async (dispatch) => {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    dispatch({ type: LOADING });
    await axios
      .get(`https://backend-foodstore.herokuapp.com/api/invoices`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: GET_INVOICE, payload: res.data });
        dispatch({ type: SUCCESS });
      })
      .catch((err) => console.log(err));
  };
};
