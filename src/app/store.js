import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./features/auth/reducer";
import productReducer from "./features/product/reducer";
import cartReducer from "./features/cart/reducer"
import addressReducer from "./features/address/reducer";
import orderReducer from "./features/order/reducer";

let rootReducers = combineReducers({
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));


export default store;