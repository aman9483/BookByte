import axios from 'axios'

import {ALL_BOOK_REQUESTS, ALL_BOOK_SUCCESS, ALL_BOOK_FAILURE,  CLEAR_ERRORS,ALL_BOOK_DETAILS_REQUESTS, ALL_BOOK_DETAILS_SUCCESS,ALL_BOOK_DETAILS_FAILURE} from '../constant/bookConstant';

export const getBooks = ()=> async(dispatch)=>{

    try{

        dispatch({

            type: ALL_BOOK_REQUESTS
        })

        const {data} = await axios("/api/v1/getAllBooks");

        dispatch({

            type: ALL_BOOK_SUCCESS,
            payload: data
        })


    }catch(e){

        dispatch({

            type: ALL_BOOK_FAILURE,
            payload: e.response.data.message
        })

    }
};

// ... Other imports

export const getBooksDetails = (id) => async (dispatch) => {
    try {
      dispatch({
        type: ALL_BOOK_DETAILS_REQUESTS,
      });
  
      const { data } = await axios.get(`/api/v1/getBooks/${id}`);
  
      if (data.book) {
        dispatch({
          type: ALL_BOOK_DETAILS_SUCCESS,
          payload: data.book,
        });
      } else {
        // Handle the case where data.book is not present in the response
        dispatch({
          type: ALL_BOOK_DETAILS_FAILURE,
          payload: "Book details not found", // You can customize this message
        });
      }
    } catch (e) {
      dispatch({
        type: ALL_BOOK_DETAILS_FAILURE,
        payload: e.response.data.message,
      });
    }
  };
  
  // ... Rest of the code
  
export const clearErrors= ()=> async(dispatch)=>{

    dispatch({

        type: CLEAR_ERRORS
    })


}

