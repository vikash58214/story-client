import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import "../src/App.css";
import Navbar from "./components/Navbar";
import Category from "./pages/Category";
import Bookmarks from "./pages/Bookmarks";
import ViewSharedStory from "./pages/ViewSharedStory";
import NotFound from "./pages/NotFound";

const AppRoutes = ({
  handleViewStory,
  register,
  login,
  newStory,
  setRegister,
  setLogin,
  setNewStory,
  story,
  storyID,
  viewStory,
  setViewStory,
}) => {
  const location = useLocation();

  return (
    <>
      {!location.pathname.startsWith("/stories/") && (
        <Navbar
          setRegister={setRegister}
          setLogin={setLogin}
          setNewStory={setNewStory}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              register={register}
              login={login}
              newStory={newStory}
              setRegister={setRegister}
              setLogin={setLogin}
              setNewStory={setNewStory}
              handleViewStory={handleViewStory}
              setViewStory={setViewStory}
              story={story}
              storyID={storyID}
              viewStory={viewStory}
            />
          }
        />
        <Route
          path="/story/:type"
          element={
            <Category
              handleViewStory={handleViewStory}
              setViewStory={setViewStory}
              story={story}
              viewStory={viewStory}
              setNewStory={setNewStory}
              newStory={newStory}
              register={register}
              storyId={storyID}
              setRegister={setRegister}
              login={login}
              setLogin={setLogin}
            />
          }
        />
        <Route
          path="/bookmarks"
          element={
            <Bookmarks
              setNewStory={setNewStory}
              newStory={newStory}
              login={login}
              setLogin={setLogin}
              register={register}
              setRegister={setRegister}
            />
          }
        />
        <Route path="/stories/:slideID" element={<ViewSharedStory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [newStory, setNewStory] = useState(false);
  const [viewStory, setViewStory] = useState(false);
  const [story, setStory] = useState([]);
  const [storyID, setStoryID] = useState(null);

  const handleViewStory = (data, storyID) => {
    setViewStory(true);
    setStory(data);
    setStoryID(storyID);
  };

  return (
    <BrowserRouter>
      <AppRoutes
        handleViewStory={handleViewStory}
        register={register}
        login={login}
        newStory={newStory}
        setRegister={setRegister}
        setLogin={setLogin}
        setNewStory={setNewStory}
        story={story}
        storyID={storyID}
        viewStory={viewStory}
        setViewStory={setViewStory}
      />
    </BrowserRouter>
  );
};

export default App;
