import { ADD_CART, GET_CART, LOADING_CART, SUCCESS_CART } from "./constants";

let initialState = {
  data: [],
  status: false,
  loading:true,
};

export default function cartReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_CART:
      return {
        ...state,
        data: payload,
      }
    case GET_CART:
      return {
        ...state,
        data: payload.data,
        status:true
      }
      case LOADING_CART:
        return{
          ...state,
          loading: true,
        }
        case SUCCESS_CART:
          return{
            ...state,
            loading:false
          }
    default:
      return state;
  }
}
