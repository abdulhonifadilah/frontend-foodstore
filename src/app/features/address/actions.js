import {
  GET_ADDRESS,
  GET_KEC,
  GET_KELURAHAN,
  GET_KOTA_KAB,
  GET_PROV,
  LOADING,
  SET_FORM_ADDRESS,
  SET_FORM_DEFAULT,
  SET_ID,
  SUCCESS,
} from "./constans";
import axios from "axios";

export const getAddresses = () => async (dispatch) => {
  try {
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    await axios
      .get("https://backend-foodstore.herokuapp.com/api/delivery-addresses", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: GET_ADDRESS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export const createAddresses = (data) => {
  return async (dispatch) => {
    dispatch({type:LOADING})
    let {token} = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem('auth')) : {};

    await axios.post('https://backend-foodstore.herokuapp.com/api/delivery-addresses', data, {
        headers: {
            authorization : `Bearer ${token}`
        }
    }).then((res) => {
      window.alert("success")
        dispatch({
          type: SUCCESS,
        });
        dispatch({
          type: SET_FORM_DEFAULT,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateAddresses = (id, form) => {
    return async (dispatch) => {
    dispatch({type:LOADING})

      let {token} = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem('auth')) : {};
  
      await axios.put(`https://backend-foodstore.herokuapp.com/api/delivery-addresses/${id}`, form, {
          headers: {
              authorization : `Bearer ${token}`
          }
      }).then((res) => {
          window.alert("success")
          dispatch({
            type: SUCCESS,
          });
          dispatch({
            type: SET_FORM_DEFAULT,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

export const deleteAddresses=(id)=>async(dispatch)=>{
  dispatch({type:LOADING})
    
  let {token} = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem('auth')) : {};
  
      await axios.delete(`https://backend-foodstore.herokuapp.com/api/delivery-addresses/${id}`, {
          headers: {
              authorization : `Bearer ${token}`
          }
      }).then((res) => {
          window.alert("success")
          dispatch({
            type: SUCCESS,
          });
        })
        .catch((err) => {
          console.log(err);
        });
}

export const setFormAddress = (formValue, formData) => {
  return { type: SET_FORM_ADDRESS, formValue, formData };
};

export const setIdAddresses = (payload) => {
    return { type: SET_ID, payload };
  };
  export const setFormAddressDefault = (payload) => {
    return { type: SET_FORM_DEFAULT };
  };
export const getProv = () => {
  return async (dispatch) => {
    await axios
      .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((res) => {
        dispatch({
          type: GET_PROV,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getKotaKab = (id) => {
  return async (dispatch) => {
    await axios.get(`http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`)
      .then((res) => {
        dispatch({
          type: GET_KOTA_KAB,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getKecamatan = (id) => {
  return async (dispatch) => {
    await axios.get(`http://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`)
      .then((res) => {
        dispatch({
          type: GET_KEC,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getKelurahan = (id) => {
  return async (dispatch) => {
    await axios.get(`http://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id}`)
      .then((res) => {
        dispatch({
          type: GET_KELURAHAN,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
