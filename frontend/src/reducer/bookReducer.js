
import {ALL_BOOK_REQUESTS, ALL_BOOK_SUCCESS, ALL_BOOK_FAILURE,  CLEAR_ERRORS, ALL_BOOK_DETAILS_REQUESTS, ALL_BOOK_DETAILS_SUCCESS,ALL_BOOK_DETAILS_FAILURE} from '../constant/bookConstant'

export const bookReducer = (state = { books: [] }, action) => {

    switch (action.type) {
        case ALL_BOOK_REQUESTS:
      
          return {
            loading: true,
            books: [],
          };
        case ALL_BOOK_SUCCESS:
          return {
            loading: false,
            books: action.payload.books,
            bookCount: action.payload.bookCount,
            // resultPerPage: action.payload.resultPerPage,
            // filteredProductsCount: action.payload.filteredProductsCount,
          };
    
     
        case ALL_BOOK_FAILURE:
       
          return {
            loading: false,
            error: action.payload,
          };
    
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return state;
      }
    };

    
export const bookDetailsReducer = (state = { book: {} }, action) => {

    switch (action.type) {
        case ALL_BOOK_DETAILS_REQUESTS:
      
          return {
            loading: true,
            ...state,
          };
        case ALL_BOOK_DETAILS_SUCCESS:
          return {
            loading: false,
            book: action.payload,
            bookCount: action.payload.bookCount,
            // resultPerPage: action.payload.resultPerPage,
            // filteredProductsCount: action.payload.filteredProductsCount,
          };
    
     
        case ALL_BOOK_DETAILS_FAILURE:
       
          return {
            loading: false,
            error: action.payload,
          };
    
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return state;
      }
    };