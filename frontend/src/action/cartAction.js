import { ADD_TO_CART, REMOVE_CART_ITEM,save_shipping_info  } from "../constant/cartConstant";
import axios from 'axios';

export const AddToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/v1/getBooks/${id}`);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        book: data.book._id,
        name: data.book.name,
        price: data.book.price,
        image: data.book.images[0].url,
        stock: data.book.Stock,
        quantity,
      }
    });


    const updatedState = getState();

  
    localStorage.setItem("cartItems", JSON.stringify(updatedState.cart.cartItems));
  } catch (error) {
   
    console.error("Error adding to cart:", error);
  }
};




export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


export const saveShippingInfo = (data) => async (dispatch) => {

  dispatch({

        type: save_shipping_info,

        payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));


}