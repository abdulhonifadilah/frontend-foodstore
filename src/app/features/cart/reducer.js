import { ADD_CART, GET_CART, LOADING, SUCCESS } from "./constants";

let initialState = {
  data: [],
  status: false,
  
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
      }
      case LOADING:
        return{
          ...state,
          status: false,
        }
        case SUCCESS:
          return{
            ...state,
            status:true
          }
    default:
      return state;
  }
}
