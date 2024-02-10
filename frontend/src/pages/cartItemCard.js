import React from "react";
import "./cartItemCard.css";
import { Link } from "react-router-dom";
import Loader from '../components/loader/loader'; // Import your loader component

const CartItemCard = ({ item, deleteCartItems, isLoading }) => {
  return (
    <div className="CartItemCard">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <img src={item.image} alt="ssa" />
          <div>
            <Link to={`/book/${item.book}`}>{item.name}</Link>
            <span>{`Price: ₹${item.price}`}</span>
            <p onClick={() => deleteCartItems(item.book)}>Remove</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItemCard;
