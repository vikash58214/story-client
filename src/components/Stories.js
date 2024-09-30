import React from "react";

const Stories = ({ data }) => {
  return (
    <div className="story-body">
      <img className="story-images" src={data.slides[0].image} alt="demo" />
      <div className="story-txt-div">
        <p>{data.slides[0].heading}</p>
        <p>{data.slides[0].description}</p>
      </div>
    </div>
  );
};

export default Stories;
