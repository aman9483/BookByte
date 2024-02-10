import React, { useRef, useState, useEffect } from "react";
import "./form.css";
import Loader from "../components/loader/loader";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../action/userAction";
import User from '../assests/user-solid.svg';
import Password from '../assests/lock-solid.svg'
import Email from '../assests/email.svg'
import Profile from '../assests/profile.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTabRef = useRef(null);
  const registerTabRef = useRef(null);
  const switcherTabRef = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState(Profile);
  const [avatarPreview, setAvatarPreview] = useState(Profile);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    if (user.status === true) {
   
      toast.success("Login Successful!",toastOptions)
    }
  else if( user.status===false) {
    toast.error("Invalid email or password. Please try again.", toastOptions)

  }
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);

    }
  }, [dispatch, navigate, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTabRef.current.classList.add("shiftToNeutral");
      switcherTabRef.current.classList.remove("shiftToRight");

      registerTabRef.current.classList.remove("shiftToNeutralForm");
      loginTabRef.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTabRef.current.classList.add("shiftToRight");
      switcherTabRef.current.classList.remove("shiftToNeutral");

      registerTabRef.current.classList.add("shiftToNeutralForm");
      loginTabRef.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTabRef}></button>
              </div>
              <form className="loginForm" ref={loginTabRef} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <img src={Email} alt="email" id="email-icon" style={{ width: '30px', height: '30px' }} />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <img src={Password} alt="password" style={{ width: '30px', height: '30px' }} />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTabRef}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <img src={User} alt="user" id="user-icon" style={{ width: '30px', height: '30px' }} />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <img src={Email} alt="email" id="email-icon" style={{ width: '30px', height: '30px' }} />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <img src={Password} alt="password" style={{ width: '30px', height: '30px' }} />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
          
          <ToastContainer position="top-right" />
        </>
      )}
    </>
  );
};

export default LoginSignUp;
