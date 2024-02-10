import {ADD_TO_CART, REMOVE_CART_ITEM, save_shipping_info } from "../constant/cartConstant"
import shippingInfo from "../pages/shippingInfo";


export const cartReducer = (state = {cartItems: [], shippingInfo: {} } , action) => {

    switch (action.type) {
        case ADD_TO_CART:

        const item = action.payload;

        const isItemExist = state.cartItems.find(

            (i)=>i.book===item.book
        );

        if(isItemExist){

            return{

                ...state,
                cartItems: state.cartItems.map((i)=>

                    i.book===isItemExist.book? item: i
                ),
            }


        }else{


             return{

                ...state,
                cartItems :[...state.cartItems, item]
             }
        }

        case REMOVE_CART_ITEM:
            return {
              ...state,
              cartItems: state.cartItems.filter((i) => i.book !== action.payload),
            };

            case save_shipping_info:

                  return {

                       ...state,

                       shippingInfo: action.payload
                  }
      
            
           
    
        default:

            return state;
           
    }

    


}