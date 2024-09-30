import StoryIcon from "../components/StoryIcon";
import AllStories from "../components/AllStories";
import Register from "../components/Register";
import Login from "../components/Login";
import AddStories from "../components/AddStories";
import ViewStories from "../components/ViewStories";

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
  return (
    <>
      <StoryIcon />
      <AllStories
        viewStory={handleViewStory}
        setNewStory={setNewStory}
        newStory={newStory}
        setViewStory={setViewStory}
      />
      {register && <Register setRegister={setRegister} />}
      {login && <Login setLogin={setLogin} />}
      {newStory && <AddStories setNewStory={setNewStory} />}
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
