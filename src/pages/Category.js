import React, { useEffect, useState } from "react";
import StoryIcon from "../components/StoryIcon";
import axios from "axios";
import { useParams } from "react-router-dom";
import Stories from "../components/Stories";
import "../style/category.css";
import ViewStories from "../components/ViewStories";
import AddStories from "../components/AddStories";
import Register from "../components/Register";
import Login from "../components/Login";

const Category = ({
  handleViewStory,
  setViewStory,
  story,
  viewStory,
  newStory,
  setNewStory,
  login,
  storyId,
  setLogin,
  register,
  setRegister,
}) => {
  const [datas, setData] = useState([]);
  const { type } = useParams();
  const fetchStories = async () => {
    try {
      const response = await axios.get(
        `https://story-server-jtcw.onrender.com/getStory`
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);
  return (
    <>
      <StoryIcon />
      <div className="category-body">
        <h1>Top Stories About {type}</h1>
        <div className="category-container">
          {datas
            .filter(
              (data) => data.category.toLowerCase() === type.toLowerCase()
            )
            .map((data) => (
              <div onClick={() => handleViewStory(data.slides, data._id)}>
                <Stories data={data} />
              </div>
            ))}
        </div>
      </div>
      {viewStory && (
        <ViewStories
          story={story}
          setViewStory={setViewStory}
          setLogin={setLogin}
          storyId={storyId}
        />
      )}
      {newStory && <AddStories setNewStory={setNewStory} />}
      {register && <Register setRegister={setRegister} />}
      {login && <Login setLogin={setLogin} />}
    </>
  );
};

export default Category;
