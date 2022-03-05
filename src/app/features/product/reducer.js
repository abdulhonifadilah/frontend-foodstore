import {
  FILTER_PRODUCT,
  GET_CATEGORY,
  GET_PRODUCT,
  GET_TAG,
  CREATE_CATEGORY,
  LOADING,
  SUCCESS,
  SET_FORM,
  IMAGE_PREVIEW,
  SET_ID,
  SET_FORM_DEFAULT,
  SET_PAGINATION,
  OPEN_DETAIL,
  CLOSE_DETAIL,
} from "./constants";

let initialState = {
  category: [],
  tag: [],
  data: [],
  filter: {
    name: "",
    category: "",
    tags: [],
  },
  id: "",
  form: {
    name: "",
    price: "",
    category: "",
    tags: [],
    image: "",
  },
  detail: { status: false, data:{}},
  imagePreview: "",
  pagination: { totalPage: 0, postPerPage: 10,currentPage:1, lastPost: 0, firstPost: 0 },
  error: false,
  status: false,
};

export default function productReducer(
  state = initialState,
  { type, payload, formType, formValue }
) {
  switch (type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: payload,
      };
    case SET_PAGINATION:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          [formType]: formValue,
        },
      };
    case GET_TAG:
      return {
        ...state,
        tag: payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        data: payload
      };
    case FILTER_PRODUCT:
      return {
        ...state,
        filter: {
          ...state.filter,
          [formType]: formValue,
        }
      };
    case CREATE_CATEGORY:
      return { ...state };
    case SET_FORM:
      return {
        ...state,
        status: false,
        form: {
          ...state.form,
          [formType]: formValue,
        },
      };
    case IMAGE_PREVIEW:
      return {
        ...state,
        imagePreview: payload,
      };
    case SET_ID:
      return {
        ...state,
        id: payload,
      };
    case SET_FORM_DEFAULT:
      return {
        ...state,
        id: "",
        form: {
          name: "",
          price: "",
          category: "",
          tags: [],
          image: "",
          description: "",
        },
        imagePreview: "",
      };
      case OPEN_DETAIL:
        return{
          ...state,
          detail:{
            ...state.detail,
            status: true,
            data:payload,
          }
        }
        case CLOSE_DETAIL:
        return{
          ...state,
          detail:{
            ...state.detail,
            status: false,
            data:{},
          }
        }
    case LOADING:
      return { ...state, status: false };
    case SUCCESS:
      return { ...state, status: true };
    default:
      return state;
  }
}
