import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/viewSharedStory.css";
import "../style/viewstories.css";

const ViewSharedStory = () => {
  const navigate = useNavigate();
  const { slideID } = useParams();
  const [slide, setSlide] = useState({});
  const fetchSlide = async () => {
    try {
      const response = await axios.get(
        `https://story-server-jtcw.onrender.com/story/slide/${slideID}`
      );
      setSlide(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSlide();
  }, [slideID]);

  const goHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="view-bodyy">
        <button onClick={goHome} className="home-btn">
          Go to home page
        </button>
        <div className="story-img-body">
          <img className="view-img" src={slide.image} alt="story" />
          <div className="img-front-body">
            <div className="story-bottom-div">
              <p>{slide.heading}</p>
              <p style={{ fontSize: "small" }}>{slide.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSharedStory;
