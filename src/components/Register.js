import React, { useState } from "react";
import Eye from "../assets/eye.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/register.css";
import axios from "axios";

const Register = ({ setRegister }) => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (input.password.trim() && input.username.length < 5) {
      valid = false;
      errors.username = "username must be of 5 char";
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
    setRegister(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    try {
      if (isValid()) {
        setLoading(true);
        const response = await axios.post(
          "https://story-server-jtcw.onrender.com/signup",
          {
            username: input.username,
            password: input.password,
          }
        );
        if (response.data.message === "success") {
          toast.success("User created");
          setInput({ username: "", password: "" });
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
            <h2 style={{ textAlign: "center" }}>Register</h2>
            <div className="input-body">
              <div className="input-div">
                <label className="label">Username</label>
                <input
                  className="username"
                  type="text"
                  placeholder="Enter Username"
                  name="username"
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
              }}
            >
              <button
                className="register-btnn"
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: loading && "grey",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
