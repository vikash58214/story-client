import React, { useEffect, useState } from "react";
import Vector from "../assets/Vector.png";
import Vector1 from "../assets/Vector1.png";
import DownloadIcon from "../assets/downloadIcon.png";
import DownloadedIcon from "../assets/downloadedIcon.png";
import SavedBlue from "../assets/saveBlue.png";
import Save from "../assets/save.png";
import LoadingImg from "../assets/loadingImg.jpg";

import ShareIcon from "../assets/shareIcon.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/viewstories.css";
import Register from "./Register";
import Login from "./Login";

const ViewStories = ({
  setViewStory,
  story,
  login,
  storyId,
  setLogin,
  setRegister,
  register,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedStories, setSavedStories] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [likes, setLikes] = useState([]);
  const [downloaded, setDownloaded] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const userID = localStorage.getItem("userID");
  const token = localStorage.getItem("token");

  const fetchStory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://story-server-jtcw.onrender.com/fetchStory/${storyId}`
      );
      setLikes(response.data.slides[currentIndex].likes);
      setLikeCount(response.data.slides[currentIndex].likes.length);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `https://story-server-jtcw.onrender.com/user/${userID}`
      );
      setSavedStories(response.data.savedStories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    fetchUser();
  }, [userID]);

  useEffect(() => {
    fetchStory();
  }, [currentIndex, storyId]);

  const handleNext = () => {
    if (currentIndex < story.length - 1) {
      setDownloaded(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDownloaded(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSave = async (storyID) => {
    if (!token) {
      setLogin(true);
      return;
    }

    if (isSaving) {
      return;
    }

    try {
      const response = await axios.post(
        "https://story-server-jtcw.onrender.com/save-story",
        {
          userId: userID,
          storyId: storyID,
        }
      );

      if (response.data.message === "saved") {
        toast.success("Story saved");
        setSavedStories([...savedStories, storyID]);
      } else if (response.data.message === "unsaved") {
        toast.info("Story unsaved");
        setSavedStories(savedStories.filter((id) => id !== storyID));
      }
    } catch (error) {
      console.error("Error saving/unsaving story:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLikes = async (index) => {
    if (!token) {
      setLogin(true);
      return;
    }
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      const response = await axios.post(
        `https://story-server-jtcw.onrender.com/like/${storyId}`,
        {
          userID,
          index,
        }
      );

      const { message } = response.data;

      if (message === "liked") {
        const updatedLikes = [...likes, userID];
        setLikes(updatedLikes);
        setLikeCount(likeCount + 1);
      } else if (message === "unliked") {
        const updatedLikes = likes.filter((id) => id !== userID);
        setLikes(updatedLikes);
        setLikeCount(likeCount - 1);
      } else {
        console.log("Error liking/unliking the story");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadStory = async (imageUrl) => {
    if (!token) {
      setLogin(true);
      return;
    }
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = imageUrl.split("/").pop();
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
      setDownloaded(true);
      toast.success("Image download Started");
    } catch (error) {
      console.error("Failed to download image:", error);
      toast.error("Private Image Url");
    }
  };
  const handleShare = (slideid) => {
    const storyUrl = `${window.location.origin}/stories/${slideid}`;
    navigator.clipboard
      .writeText(storyUrl)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
        toast.error("Failed to copy link.");
      });
  };

  return (
    <>
      <div className="view-body">
        {story && story[currentIndex] ? (
          <div className="view-container">
            <div className="left-btn">
              <button
                className="nxt-prev"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                <img src={Vector1} alt="vector" />
              </button>
            </div>
            <div className="story-img-body">
              {loading ? (
                <img className="view-img" src={LoadingImg} alt="loading" />
              ) : (
                <>
                  <img
                    className="view-img"
                    src={story[currentIndex].image}
                    alt="story"
                  />
                  <div className="img-front-body">
                    <div className="story-top-div">
                      <button
                        className="story-x"
                        onClick={() => {
                          setViewStory(false);
                        }}
                      >
                        X
                      </button>
                      <button
                        onClick={() => handleShare(story[currentIndex]._id)}
                        className="story-x"
                      >
                        <img src={ShareIcon} alt="shareIcon" />
                      </button>
                    </div>
                    <div className="mid-sec">
                      <div onClick={handlePrevious} className="left-sm"></div>
                      <div onClick={handleNext} className="left-sm"></div>
                    </div>
                    <div className="story-bottom-div">
                      <p>{story[currentIndex].heading}</p>
                      <p style={{ fontSize: "small" }}>
                        {story[currentIndex].description}
                      </p>
                      <div>
                        {userID ? (
                          <button
                            onClick={() => handleSave(story[currentIndex]._id)}
                          >
                            <img
                              src={
                                Array.isArray(savedStories) &&
                                savedStories.includes(story[currentIndex]._id)
                                  ? SavedBlue
                                  : Save
                              }
                              alt="save"
                            />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              console.log("login");
                            }}
                          >
                            <img src={Save} alt="save" />
                          </button>
                        )}
                        <div
                          onClick={() =>
                            downloadStory(story[currentIndex].image)
                          }
                          className="downloadDiv"
                        >
                          {downloaded ? (
                            <img src={DownloadedIcon} alt="downloadIcon" />
                          ) : (
                            <img src={DownloadIcon} alt="downloadIcon" />
                          )}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "12px",
                          }}
                        >
                          <button onClick={() => handleLikes(currentIndex)}>
                            {Array.isArray(likes) && likes.includes(userID)
                              ? "❤️"
                              : "🤍"}
                          </button>
                          <p
                            style={{
                              fontSize: "small",
                              height: "auto",
                            }}
                          >
                            {likeCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="left-btn">
              <button
                className="nxt-prev"
                onClick={handleNext}
                disabled={currentIndex === story.length - 1}
              >
                <img src={Vector} alt="vector" />
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <ToastContainer />
      {register && <Register setRegister={setRegister} />}
      {login && <Login setLogin={setLogin} />}
    </>
  );
};

export default ViewStories;
