import React, { Fragment } from "react";
import "./cart.css";
import { useSelector, useDispatch } from "react-redux";
import { AddToCart, removeItemsFromCart } from "../action/cartAction.js";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(AddToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(AddToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/shop">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="h-screen bg-white-100 pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3 space-y-6">
                {cartItems.map((item) => (
                  <div
                    className="bg-white p-6 shadow-md sm:flex sm:justify-start"
                    key={item.book}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full rounded-lg sm:w-40"
                    />
                   
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {item.name}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">
                          {item.size}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 items-center">
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">{`₹${item.price}`}</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                            onClick={() => deleteCartItems(item.book)}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                        <div className="flex items-center border-gray-100">
                          <span
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            onClick={() =>
                              decreaseQuantity(item.book, item.quantity)
                            }
                          >
                            {" "}
                            -{" "}
                          </span>
                          <input
                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            value={item.quantity}
                            readOnly
                          />
                          <span
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            onClick={() =>
                              increaseQuantity(
                                item.book,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Sub total */}
              <div className="mt-8 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">{`₹${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Shipping</p>
                  <p className="text-gray-700">₹18</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">{`₹${cartItems.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}`}</p>
                    <p className="text-sm text-gray-700">including GST</p>
                  </div>
                </div>
                <button className="mt-6 w-full rounded-md bg-orange-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={checkoutHandler}>
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
