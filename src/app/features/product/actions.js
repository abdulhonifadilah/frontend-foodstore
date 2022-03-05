import {
  GET_CATEGORY,
  GET_PRODUCT,
  GET_TAG,
  LOADING,
  SET_FORM,
  SUCCESS,
  SET_ID,
  IMAGE_PREVIEW,
  SET_FORM_DEFAULT,
  SET_PAGINATION,
  FILTER_PRODUCT,
  OPEN_DETAIL,
  CLOSE_DETAIL,
} from "./constants";
import axios from "axios";

export const getProducts = (params) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });

    let filter = `category=${params.category}`;
    params.tags.map((e) => (filter += `&tags=${e}`));
    const res = await axios.get(`https://backend-foodstore.herokuapp.com/api/product?${filter}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data.data,
    });
    dispatch({ type: SUCCESS });
  } catch (err) {
    console.log(err);
  }
};

export const setDataWithPagination = (data, pagination)=> {
  return (dispatch)=>{
    let payload = data.slice(pagination.firstPost, pagination.lastPost);
    // console.log(payload);
    dispatch({
      type: GET_PRODUCT,
      payload
    });
  }
}

export const createProduct = (form) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    let data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("description", form.description);
    data.append("category", form.category);
    data.append("tags", form.tags);
    data.append("image", form.image);
    for (let i = 0; i < form.tags.length; i++) {
      data.append("tags", form.tags[i]);
    }

    await axios
      .post("http://localhost:3000/api/product", data, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch({ type: SUCCESS });
        dispatch({ type: SET_FORM_DEFAULT });
        window.alert("success");
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = (id, form) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    let data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("description", form.description);
    data.append("category", form.category);
    data.append("tags", form.tags);
    data.append("image", form.image);
    for (let i = 0; i < form.tags.length; i++) {
      data.append("tags", form.tags[i]);
    }
    await axios
      .put(`http://localhost:3000/api/product/${id}`, data, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch({ type: SUCCESS });
        dispatch({ type: SET_FORM_DEFAULT });
        window.alert("success");
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    await axios
      .delete(`https://backend-foodstore.herokuapp.com/api/product/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        window.alert("success");
        dispatch({ type: SUCCESS });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export const openDetail = (data)=>{
  return{type:OPEN_DETAIL, payload:data}
}
export const closeDetail = ()=>{
  return{type:CLOSE_DETAIL}
}

export const setForm = (formType, formValue) => {
  return { type: SET_FORM, formType, formValue };
};
export const setPagination = (formType, formValue) => {
  return { type: SET_PAGINATION, formType, formValue };
};
export const setFilter = (formType, formValue) => {
  return { type: FILTER_PRODUCT, formType, formValue };
};

export const setId = (payload) => {
  return { type: SET_ID, payload };
};

export const setImagePreview = (payload) => {
  return { type: IMAGE_PREVIEW, payload };
};

export const setFormDefault = () => {
  return { type: SET_FORM_DEFAULT };
};
export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("https://backend-foodstore.herokuapp.com/api/categories");
    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createCategories = (data) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    await axios
      .post("https://backend-foodstore.herokuapp.com/api/categories", data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch({ type: SUCCESS });
        dispatch({ type: SET_FORM_DEFAULT });
        window.alert("success");
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export const deleteCategories = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    await axios
      .delete(`https://backend-foodstore.herokuapp.com/api/categories/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        window.alert("success");
        dispatch({ type: SUCCESS });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export const updateCategories = (id, form) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    await axios
      .put(
        `https://backend-foodstore.herokuapp.com/api/categories/${id}`,
        { name: form.name },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        window.alert("success");
        dispatch({ type: SUCCESS });
        dispatch({ type: SET_FORM_DEFAULT });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export const getTags = () => async (dispatch) => {
  try {
    const res = await axios.get("https://backend-foodstore.herokuapp.com/api/tags");
    dispatch({
      type: GET_TAG,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createTags = (data) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    await axios
      .post("https://backend-foodstore.herokuapp.com/api/tags", data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch({ type: SUCCESS });
        dispatch({ type: SET_FORM_DEFAULT });
        window.alert("success");
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export const updateTags = (id, form) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    await axios
      .put(
        `https://backend-foodstore.herokuapp.com/api/tags/${id}`,
        { name: form.name },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        window.alert("success");
        dispatch({ type: SUCCESS });
        dispatch({ type: SET_FORM_DEFAULT });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export const deleteTags = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    await axios
      .delete(`https://backend-foodstore.herokuapp.com/api/tags/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        window.alert("success");
        dispatch({ type: SUCCESS });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
