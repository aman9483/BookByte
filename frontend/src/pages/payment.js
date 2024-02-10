import React, { useEffect, useRef } from "react";
import {useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
import "./payment.css";
import { createOrder,clearErrors } from "../action/orderAction";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const payBtn = useRef(null);
  const navigate = useNavigate();
  const stripe = useStripe();
  const element = useElements();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const {error} = useSelector((state)=>state.newOrder)

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    description: "Payment for Order #12345", 
    // Add other required properties based on your server expectations
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !element) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: element.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        console.error("Payment failed:", result.error.message);
        payBtn.current.disabled = false;
        // Handle the error, e.g., show error message to the user
      } else {
        if (result.paymentIntent.status === "succeeded") {

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order))
          navigate("/success");
        }
      }

    } catch (error) {
      console.error("Unexpected error:", error);
      payBtn.current.disabled = false;
      // Handle unexpected errors, e.g., show a generic error message
    }
  };

  useEffect(()=>{

       if(error){

            console.log(error);

            dispatch(clearErrors())
       }
      },[dispatch, error, navigate])

  return (
    <>
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>

          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>

          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>

          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
