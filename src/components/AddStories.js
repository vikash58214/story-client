import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../style/addStories.css";
import "react-toastify/dist/ReactToastify.css";

const AddStories = ({ setNewStory, setData, setUserStories }) => {
  const [slides, setSlides] = useState([1, 2, 3]);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [formData, setFormData] = useState([
    { heading: "", description: "", image: "" },
    { heading: "", description: "", image: "" },
    { heading: "", description: "", image: "" },
  ]);

  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const userID = localStorage.getItem("userID");

  const maxSlides = 6;

  const addSlide = () => {
    if (slides.length < maxSlides) {
      setSlides([...slides, slides.length + 1]);
      setFormData([...formData, { heading: "", description: "", image: "" }]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[currentSlide - 1][name] = value;
    setFormData(updatedFormData);
  };

  const closeStoryForm = () => {
    setNewStory(false);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSlideChange = (slide) => {
    setCurrentSlide(slide);
  };

  const handleSubmit = async () => {
    if (loading) return;
    for (let i = 0; i < formData.length; i++) {
      const { heading, description, image } = formData[i];
      if (!heading || !description || !image) {
        toast.error(`Please fill out all fields in slide ${i + 1}.`);
        return;
      }
    }
    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://story-server-jtcw.onrender.com/addStory",
        {
          slides: formData,
          category,
          userID,
        }
      );
      setData((prevData) => [...prevData, response.data.story]);
      setUserStories((prevData) => [...prevData, response.data.story]);
      setNewStory(false);
    } catch (error) {
      console.log(error.message || error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="create-story-body">
        <div className="story-form-container">
          <div
            style={{ width: "100%", display: "flex", justifyContent: "end" }}
          >
            <button className="x" onClick={closeStoryForm}>
              X
            </button>
          </div>
          <div className="slide-tabs">
            {slides.map((slide) => (
              <div
                key={slide}
                className={`slide-tab ${
                  currentSlide === slide ? "active" : ""
                }`}
                onClick={() => handleSlideChange(slide)}
              >
                Slide {slide}
              </div>
            ))}
            {slides.length < maxSlides && (
              <div className="add-slide" onClick={addSlide}>
                Add +
              </div>
            )}
          </div>

          <div className="form-fields">
            <div className="form-group">
              <label>Heading:</label>
              <input
                type="text"
                name="heading"
                value={formData[currentSlide - 1].heading}
                onChange={handleInputChange}
                placeholder="Your heading"
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData[currentSlide - 1].description}
                onChange={handleInputChange}
                placeholder="Story Description"
              />
            </div>

            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={formData[currentSlide - 1].image}
                onChange={handleInputChange}
                placeholder="Add Image URL"
              />
            </div>

            <div className="form-group">
              <label>Category:</label>
              <select
                name="category"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">Select category</option>
                <option value="India">India</option>
                <option value="World">World</option>
                <option value="Fruit">Fruit</option>
                <option value="Medical">Medical</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button
              onClick={() => handleSlideChange(currentSlide - 1)}
              disabled={currentSlide === 1}
            >
              Previous
            </button>
            {currentSlide < slides.length ? (
              <button
                onClick={() => handleSlideChange(currentSlide + 1)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "lightblue",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  padding: "10px 20px",
                  backgroundColor: loading ? "gray" : "salmon",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Posting" : "Post"}
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddStories;
