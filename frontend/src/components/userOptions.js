import React, { useState } from "react";
import './navbar.css'
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";

import DashboardIcon from "@material-ui/icons/Dashboard";
// import PersonIcon from "@material-ui/icons/Person";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";

import { logout } from "../action/userAction";
import { useDispatch } from "react-redux";

const UserOptions = ({ user }) => {

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltIcon />, name: "orders", func: order },
    { icon: <ListAltIcon />, name: "profile", func: account },
    { icon: <ListAltIcon />, name: "logout", func: logoutUser },
    { icon: <ListAltIcon />, name: "cart", func: Cart }
  ];

  function dashboard() {
    if (user.role === "admin") {
      navigate("/admin/dashboard");
    }
  }

  function order() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function logoutUser() {
    dispatch(logout());
   
    navigate("/login");
  }

  
  function Cart() {
    navigate("/cart");
  }


  return (
    <div>

     
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="left"
        icon={<img
          className="speedDialIcon"
          src={user.avatar.url ? user.avatar.url : "<profile>"}
          alt="my"
        />}
      >
        <SpeedDialAction icon={<DashboardIcon />} tooltipTitle="Dashboard" onClick={dashboard} />

        {options.map((item) => (
          <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
        ))}
      </SpeedDial>
    </div>
  );
};

export default UserOptions;
