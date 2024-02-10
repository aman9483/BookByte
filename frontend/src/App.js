import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/navbar";
import Home from "./pages/home";
import Shop from "./pages/shop";
import Cart from "./pages/cart";
import Wishlist from "./pages/wishlist";
import Order from "./pages/order";
import Login from "./pages/loginSignupForm";
import ProtectedRoute from "./components/Route/protectedRoute";
import Profile from "./pages/profile";
import UpdateProfile from "./components/UpdateProfile.js";
import UpdatePassword from "./components/UpdatePassword.js";
import BookDetails from "./pages/bookDetails.js";
import Shipping from "./pages/shippingInfo.js";
import ConfirmOrder from './pages/ConfirmOrder.js';
import axios from 'axios';
import Payment from './pages/payment.js';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './pages/orderSuccess.js'
import MyOrder from "./pages/MyOrder.js";
import  OrdersDetails from './pages/OrdersDetails.js'
import About from './pages/about.js'
// import Dashboard from './Admin/Dashboard.js'

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book/:id" element={<BookDetails />} />

          <Route exact path="/account" element={<ProtectedRoute />}>
            <Route index element={<Profile />} />
          </Route>

          <Route exact path="/me/update" element={<ProtectedRoute />}>
            <Route index element={<UpdateProfile />} />
          </Route>

          <Route exact path="/password/update" element={<ProtectedRoute />}>
            <Route index element={<UpdatePassword />} />
          </Route>

          <Route exact path="/login/shipping" element={<ProtectedRoute />}>
            <Route index element={<Shipping />} />
          </Route>

          <Route exact path="/order/confirm" element={<ProtectedRoute />}>
            <Route index element={<ConfirmOrder />} />
          </Route>

          {stripeApiKey && (
            <Route path="/process/payment" element={<ProtectedRoute />}>
              <Route
                index
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            </Route>
          )}

<Route exact path="/success" element={<ProtectedRoute />}>
            <Route index element={<OrderSuccess />} />
          </Route>

          <Route exact path="/orders" element={<ProtectedRoute />}>
            <Route index element={<MyOrder />} />
          </Route>

          <Route exact path="/order/:id" element={<ProtectedRoute />}>
            <Route index element={<OrdersDetails />} />
          </Route>


          {/* <Route exact path="/admin/dashboard" element={<ProtectedRoute />}>
            <Route index element={< Dashboard />} />
          </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
