import React from "react";
import All from "../assets/all.jpg";
import Medical from "../assets/medical.jpg";
import Fruits from "../assets/fruits.jpg";
import { useNavigate } from "react-router-dom";
import World from "../assets/world.jpg";
import India from "../assets/india.jpg";
import "../style/storyicon.css";

const StoryIcon = () => {
  const navigate = useNavigate();
  return (
    <div className="icons-body">
      <div className="icons">
        <div onClick={() => navigate(`/`)} className="icon">
          <img className="icon-img" src={All} alt="all" />
          <div className="icon-shadow">
            <h4 className="icon-txt">All</h4>
          </div>
        </div>
        <div onClick={() => navigate(`/story/medical`)} className="icon">
          <img className="icon-img" src={Medical} alt="all" />
          <div className="icon-shadow">
            <h4 className="icon-txt">Medical</h4>
          </div>
        </div>
        <div onClick={() => navigate(`/story/fruit`)} className="icon">
          <img className="icon-img" src={Fruits} alt="all" />
          <div className="icon-shadow">
            <h4 className="icon-txt">Fruits</h4>
          </div>
        </div>
        <div onClick={() => navigate(`/story/world`)} className="icon">
          <img className="icon-img" src={World} alt="all" />
          <div className="icon-shadow">
            <h4 className="icon-txt">World</h4>
          </div>
        </div>
        <div onClick={() => navigate(`/story/india`)} className="icon">
          <img className="icon-img" src={India} alt="all" />
          <div className="icon-shadow">
            <h4 className="icon-txt">India</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryIcon;
