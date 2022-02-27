import {
  CREATE_ADDRESS,
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

let initialState = {
  data: [],
  location: {},
  provinsi: { data: [], status: false },
  kota_kab: { data: [], status: false },
  kecamatan: { data: [], status: false },
  kelurahan: { data: [], status: false },
  id:"",
  form: {
    name: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
    detail: "",
  },
  createAddress: {},
  status:false
};

export default function addressReducer(
  state = initialState,
  { type, payload, formValue, formData }
) {
  switch (type) {
    case GET_ADDRESS:
      return {
        ...state,
        data: payload,
      };
    case SET_FORM_ADDRESS:
      return {
        ...state,
        form: {
          ...state.form,
          [formValue]: formData,
        },
      };
    case LOADING:
      return {
        ...state,
        status:false
      };
      case SUCCESS:
      return {
        ...state,
        status:true
      };
case SET_ID:
  return{
    ...state,
    id: payload
  }
    case CREATE_ADDRESS:
      return {
        ...state,
        createAddress: payload,
      };
    case GET_PROV:
      return {
        ...state,
        provinsi: { data: payload.provinsi, status: true },
      };
    case GET_KOTA_KAB:
      return {
        ...state,
        kota_kab: { data: payload.kota_kabupaten, status: true },
      };
    case GET_KEC:
      return {
        ...state,
        kecamatan: { data: payload.kecamatan, status: true },
      };
    case GET_KELURAHAN:
      return {
        ...state,
        kelurahan: { data: payload.kelurahan, status: true },
      };
      case SET_FORM_DEFAULT:
        return{
          ...state,
          id:"",
          form: {
            name: "",
            provinsi: "",
            kabupaten: "",
            kecamatan: "",
            kelurahan: "",
            detail: "",
          },
          status:false
        }
    default:
      return state;
  }
}
