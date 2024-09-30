import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/bookmarks.css";
import AddStories from "../components/AddStories";
import Login from "../components/Login";
import Register from "../components/Register";

const Bookmarks = ({
  setNewStory,
  newStory,
  login,
  setLogin,
  setRegister,
  register,
}) => {
  const token = localStorage.getItem("token");
  const userID = localStorage.getItem("userID");
  const [slides, setSlides] = useState([]);
  const fetchSlide = async () => {
    try {
      const response = await axios.get(
        `https://story-server-jtcw.onrender.com/saved-stories/${userID}`
      );
      setSlides(response.data.savedSlides);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    fetchSlide();
  }, [userID]);
  return (
    <>
      {token ? (
        <>
          <div className="bookmarks-body">
            <h1>Your Bookmarks</h1>
            <div className="bookmarks-containers">
              {slides.map((slide) => (
                <div className="story-body">
                  <img
                    className="story-images"
                    src={slide.slides.image}
                    alt="demo"
                  />
                  <div className="story-txt-div">
                    <p>{slide.slides.heading}</p>
                    <p>{slide.slides.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {newStory && <AddStories setNewStory={setNewStory} />}
        </>
      ) : (
        <>
          <h1>Page not found</h1>
          {login && <Login setLogin={setLogin} />}
          {register && <Register setRegister={setRegister} />}
        </>
      )}
    </>
  );
};

export default Bookmarks;
