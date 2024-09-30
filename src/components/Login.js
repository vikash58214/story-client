import React, { useState } from "react";
import Eye from "../assets/eye.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const Login = ({ setLogin }) => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [view, setView] = useState(false);

  const handleView = () => {
    setView(!view);
  };

  const isValid = () => {
    let errors = {};
    let valid = true;
    if (!input.username.trim()) {
      valid = false;
      errors.username = "Username is required";
    }
    if (!input.password.trim()) {
      valid = false;
      errors.password = "Password is required";
    }

    setErrors(errors);
    return valid;
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleclose = () => {
    setLogin(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isValid()) {
        const response = await axios.post(
          "https://story-server-jtcw.onrender.com/login",
          {
            username: input.username,
            password: input.password,
          }
        );
        if (response.data.message === "success") {
          localStorage.setItem("token", response.data.token);
          window.alert("login success");
          setLogin(false);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="register-body">
        <div className="register-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button className="x" onClick={handleclose}>
                X
              </button>
            </div>
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <div className="input-body">
              <div className="input-div">
                <label className="label">Username</label>
                <input
                  className="username"
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  value={input.username}
                  onChange={handleChange}
                />
              </div>
              <div className="input-div">
                <label className="label">Password</label>
                <div className="password-div">
                  <input
                    className="password"
                    type={view ? "input" : "password"}
                    placeholder="Enter Password"
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                  />
                  <img
                    onClick={handleView}
                    style={{ height: "20px", cursor: "pointer" }}
                    src={Eye}
                    alt="eyeicon"
                  />
                </div>
              </div>
            </div>
            <div style={{ color: "red" }}>
              {errors.username}
              <br />
              {errors.password}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "14%",
              }}
            >
              <button className="register-btnn">Login</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
