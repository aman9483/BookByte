import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { bookReducer, bookDetailsReducer } from './reducer/bookReducer';
import { userReducer } from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducer';
import {newOrderReducer} from './reducer/orderReducer'
import {myOrdersReducer} from './reducer/orderReducer'
import {orderDetailsReducer} from './reducer/orderReducer'
const reducer = combineReducers({
  books: bookReducer,
  bookDetails: bookDetailsReducer,
  user: userReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
});


let initialState = {
       cart: {
         cartItems: localStorage.getItem("cartItems")
           ? JSON.parse(localStorage.getItem("cartItems"))
           : [],

           shippingInfo: localStorage.getItem("shippingInfo")
           ? JSON.parse(localStorage.getItem("shippingInfo"))
           :{},

         
       },
     };
     

const middleWare = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
