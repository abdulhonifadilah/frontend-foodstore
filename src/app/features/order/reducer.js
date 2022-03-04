import { GET_INVOICE, LOADING, SET_FORM_ORDER, SUCCESS, GET_ORDER } from "./constans";

let initialState = {
  invoice: {data:[], status:false},
  order:{data:[], status:false},
  status: false,
  form:{
    delivery_fee:15000,
    delivery_address:"",
  }
};

export default function orderReducer(state = initialState, { type, payload,formType,formValue }) {
  switch (type) {
    case LOADING:
      return {
        ...state,
        status: false,
      };
      case SET_FORM_ORDER:
        return{
          ...state,
          form:{
            ...state.form,
            [formType] : formValue,
          }
        }
    case SUCCESS:
      return {
        ...state,
        status: true,
      };
    case GET_INVOICE:
      return {
        ...state,
        invoice: {data:payload, status:true},
      };
      case GET_ORDER:
        return{
          ...state,
          order:{data:payload, status:true}
        }
    default:
      return state;
  }
}
