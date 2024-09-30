import React, { useState } from "react";
import tableEdit from "../assets/tabler_edit.jpg";
import "../style/yourstory.css";
const YourStory = ({
  userStories,
  setEditStory,
  viewStory,
  setNewStory,
  setStoryData,
}) => {
  const [showAllStory, setShowAllStory] = useState(false);
  const handleEdit = (e, storyData) => {
    e.stopPropagation();
    setEditStory(true);
    setStoryData(storyData);
  };
  return (
    <div className="all-body">
      <h1 style={{ marginTop: "0px" }}>Your Stories</h1>
      {userStories && userStories.length > 0 ? (
        <>
          <div className="your-story-container">
            {userStories
              .slice(0, showAllStory ? userStories.length : 4)
              .map((userStory, index) => (
                <div
                  key={index}
                  onClick={() => viewStory(userStory.slides, userStory._id)}
                  className="story-body"
                >
                  <img
                    className="story-images"
                    src={userStory.slides[0].image}
                    alt="demo"
                  />
                  <div className="story-txt-div">
                    <p>{userStory.slides[0].heading}</p>
                    <p>{userStory.slides[0].description}</p>
                  </div>
                  <div className="edit-div">
                    <button
                      onClick={(e) => handleEdit(e, userStory)}
                      className="edit-btn"
                    >
                      <div>
                        <img src={tableEdit} alt="editicon" />
                      </div>
                      <div>Edit</div>
                    </button>
                  </div>
                </div>
              ))}
          </div>
          {userStories.length > 4 && (
            <button
              className="show-more-btn"
              onClick={() => setShowAllStory(!showAllStory)}
            >
              {showAllStory ? "See Less" : "See More"}
            </button>
          )}
        </>
      ) : (
        <h1>You have no any story</h1>
      )}
    </div>
  );
};

export default YourStory;
