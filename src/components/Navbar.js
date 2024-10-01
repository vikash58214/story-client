import React, { useEffect, useState } from "react";
import "../style/navbar.css";
import hamburger from "../assets/hamburger.png";
import { useNavigate } from "react-router-dom";
import Bookmarkicon from "../assets/Bookmarkicon.jpg";
import avtar from "../assets/man.png";
import axios from "axios";
const Navbar = ({ setRegister, setLogin, setNewStory }) => {
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const handleHamburger = () => {
    setHamburgerActive(!hamburgerActive);
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "https://story-server-jtcw.onrender.com/getUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserName(response.data.username);
      localStorage.setItem("userID", response.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const handleRegister = () => {
    setRegister(true);
  };
  const handleNewStory = () => {
    setNewStory(true);
  };
  const handleLogin = () => {
    setLogin(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar-body">
      {token ? (
        <div className="nav-login-container">
          <button
            onClick={() => {
              navigate("/bookmarks");
            }}
            className="register-btn"
          >
            <div>
              <img
                style={{ width: "16px", marginTop: "4px" }}
                src={Bookmarkicon}
                alt="bookmark"
              />
            </div>
            <div>Bookmarks</div>
          </button>
          <button className="register-btn" onClick={handleNewStory}>
            Add story
          </button>
          <div className="avtar">
            <img src={avtar} alt="avtar" />
          </div>
          <div className="hamburger-div">
            <img
              style={{ cursor: "pointer" }}
              onClick={handleHamburger}
              src={hamburger}
              alt="hamburger"
            />
            {hamburgerActive && (
              <div className="logout-div">
                <div>
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: "0",
                    }}
                  >
                    {username}
                  </p>
                  <button className="register-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="nav-button-container">
          <button className="register-btn" onClick={handleRegister}>
            Register Now
          </button>
          <button className="sign-btn" onClick={handleLogin}>
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
