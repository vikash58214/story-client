import React, { useEffect, useState } from "react";
import "../style/navbar.css";
import hamburger from "../assets/hamburger.png";
import { useNavigate } from "react-router-dom";
import Bookmarkicon from "../assets/Bookmarkicon.jpg";
import avtar from "../assets/man.png";
import axios from "axios";
const Navbar = ({ setRegister, setLogin, setNewStory }) => {
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const [hamb, setHambActive] = useState(false);
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const handleHamburger = () => {
    setHamburgerActive(!hamburgerActive);
  };

  const handleHamb = () => {
    setHambActive(!hamb);
  };
  const handlexhamp = () => {
    setHambActive(false);
  };

  const closeHamburder = () => {
    setHamburgerActive(false);
  };

  const handleBookmarks = () => {
    setHamburgerActive(false);
    navigate("/bookmarks");
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
    setHambActive(false);
    setRegister(true);
  };
  const handleNewStory = () => {
    setHamburgerActive(false);
    setNewStory(true);
  };
  const handleLogin = () => {
    setHambActive(false);
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
          <div className="nav-top-icons">
            <button onClick={handleBookmarks} className="register-btn">
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
                <div className="max-dis">
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
                <div className="nav-top-icon">
                  <div
                    style={{
                      display: "flex",
                      width: "70%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="avtar">
                      <img src={avtar} alt="avtar" />
                    </div>
                    <p
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {username}
                    </p>
                    <button onClick={closeHamburder} className="x-2">
                      X
                    </button>
                  </div>
                  <button className="register-btn" onClick={handleNewStory}>
                    Add story
                  </button>
                  <button onClick={handleBookmarks} className="register-btn">
                    <div>
                      <img
                        style={{ width: "16px", marginTop: "4px" }}
                        src={Bookmarkicon}
                        alt="bookmark"
                      />
                    </div>
                    <div>Bookmarks</div>
                  </button>
                  <button className="register-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="nav-button-container">
            <button className="register-btn" onClick={handleRegister}>
              Register Now
            </button>
            <button className="sign-btn" onClick={handleLogin}>
              Sign In
            </button>
          </div>
          <div className="logout-vk">
            <div onClick={handleHamb}>
              <img src={hamburger} alt="hamburger" />
            </div>
            {hamb && (
              <div className="logout-sm">
                <div className="x-sm" onClick={handlexhamp}>
                  X
                </div>
                <div className="logout-dm">
                  <button className="sign-btnn" onClick={handleLogin}>
                    Login
                  </button>
                  <button className="register-btn" onClick={handleRegister}>
                    Register
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
