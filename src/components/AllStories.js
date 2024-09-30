import React, { useEffect, useState } from "react";
import "../style/allstories.css";
import axios from "axios";
import Stories from "./Stories";
import YourStory from "./YourStory";
import EditStory from "./EditStory";
import Loader from "./Loader"; // Assuming you have a Loader component or can create one.

const AllStories = ({ viewStory, setNewStory }) => {
  const [showAllFood, setShowAllFood] = useState(false);
  const [showAllIndia, setShowAllIndia] = useState(false);
  const [showAllWorld, setShowAllWorld] = useState(false);
  const [showAllMedical, setShowAllMedical] = useState(false);

  const [datas, setData] = useState([]);
  const [userStories, setUserStories] = useState([]);
  const [editStory, setEditStory] = useState(false);

  const [loading, setLoading] = useState(true); // Loading state
  const [loadingUserStories, setLoadingUserStories] = useState(true); // Loading state for user stories

  const userID = localStorage.getItem("userID");
  const token = localStorage.getItem("token");
  const [storyData, setStoryData] = useState({});

  const fetchStories = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        `https://story-server-jtcw.onrender.com/getStory`
      );
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
      setData([]);
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  const fetchUserStories = async () => {
    try {
      setLoadingUserStories(true); // Start loading user stories
      const response = await axios.get(
        `https://story-server-jtcw.onrender.com/getUserStory/${userID}`
      );
      setUserStories(response.data);
    } catch (error) {
      console.log(error);
      setUserStories([]);
    } finally {
      setLoadingUserStories(false); // Stop loading after data is fetched
    }
  };

  useEffect(() => {
    fetchUserStories();
  }, [userID]);

  useEffect(() => {
    fetchStories();
  }, [token]);

  return (
    <>
      <div className="all-body">
        {token && !loadingUserStories && (
          <YourStory
            setNewStory={setNewStory}
            viewStory={viewStory}
            setEditStory={setEditStory}
            userStories={userStories}
            setStoryData={setStoryData}
          />
        )}

        {loading ? (
          <Loader /> // Show loader while stories are being fetched
        ) : (
          <>
            <h1>Top Stories about Fruits</h1>
            <div className="all-container">
              {Array.isArray(datas) &&
                datas
                  .filter((data) => data.category === "Fruit")
                  .slice(0, showAllFood ? datas.length : 4)
                  .map((data) => (
                    <div
                      key={data._id}
                      onClick={() => viewStory(data.slides, data._id)}
                    >
                      <Stories data={data} />
                    </div>
                  ))}
            </div>
            <button
              className="show-more-btn"
              onClick={() => setShowAllFood(!showAllFood)}
            >
              {showAllFood ? "See less" : "See more"}
            </button>

            <h1>Top Stories about India</h1>
            <div className="all-container">
              {datas
                .filter((data) => data.category === "India")
                .slice(0, showAllIndia ? datas.length : 4)
                .map((data) => (
                  <div
                    key={data._id}
                    onClick={() => viewStory(data.slides, data._id)}
                  >
                    <Stories data={data} />
                  </div>
                ))}
            </div>
            <button
              className="show-more-btn"
              onClick={() => setShowAllIndia(!showAllIndia)}
            >
              {showAllIndia ? "See less" : "See more"}
            </button>

            <h1>Top Stories about World</h1>
            <div className="all-container">
              {datas
                .filter((data) => data.category === "World")
                .slice(0, showAllWorld ? datas.length : 4)
                .map((data) => (
                  <div
                    key={data._id}
                    onClick={() => viewStory(data.slides, data._id)}
                  >
                    <Stories data={data} />
                  </div>
                ))}
            </div>
            <button
              className="show-more-btn"
              onClick={() => setShowAllWorld(!showAllWorld)}
            >
              {showAllWorld ? "See less" : "See more"}
            </button>

            <h1>Top Stories about Medical</h1>
            <div className="all-container">
              {datas
                .filter((data) => data.category === "Medical")
                .slice(0, showAllMedical ? datas.length : 4)
                .map((data) => (
                  <div
                    key={data._id}
                    onClick={() => viewStory(data.slides, data._id)}
                  >
                    <Stories data={data} />
                  </div>
                ))}
            </div>
            <button
              className="show-more-btn"
              onClick={() => setShowAllMedical(!showAllMedical)}
            >
              {showAllMedical ? "See less" : "See more"}
            </button>
          </>
        )}
      </div>
      {editStory && (
        <EditStory setEditStory={setEditStory} storyData={storyData} />
      )}
    </>
  );
};

export default AllStories;
