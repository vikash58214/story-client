import StoryIcon from "../components/StoryIcon";
import AllStories from "../components/AllStories";
import Register from "../components/Register";
import Login from "../components/Login";
import AddStories from "../components/AddStories";
import ViewStories from "../components/ViewStories";
import { useState } from "react";

const Home = ({
  register,
  login,
  newStory,
  setRegister,
  setLogin,
  handleViewStory,
  setViewStory,
  story,
  viewStory,
  storyID,
  setNewStory,
}) => {
  const [datas, setData] = useState([]);
  const [userStories, setUserStories] = useState([]);
  return (
    <>
      <StoryIcon />
      <AllStories
        viewStory={handleViewStory}
        setNewStory={setNewStory}
        newStory={newStory}
        setViewStory={setViewStory}
        setData={setData}
        datas={datas}
        userStories={userStories}
        setUserStories={setUserStories}
      />
      {register && <Register setRegister={setRegister} />}
      {login && <Login setLogin={setLogin} />}
      {newStory && (
        <AddStories
          setNewStory={setNewStory}
          setData={setData}
          setUserStories={setUserStories}
        />
      )}
      {viewStory && (
        <ViewStories
          login={login}
          setLogin={setLogin}
          setRegister={setRegister}
          register={register}
          story={story}
          storyId={storyID}
          setViewStory={setViewStory}
        />
      )}
    </>
  );
};

export default Home;
