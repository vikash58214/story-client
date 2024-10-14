import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../style/addStories.css";
import "react-toastify/dist/ReactToastify.css";

const AddStories = ({ setNewStory, setData, setUserStories }) => {
  const [slides, setSlides] = useState([1, 2, 3]); // Initial slides
  const [currentSlide, setCurrentSlide] = useState(1); // Current slide index
  const [formData, setFormData] = useState([
    { heading: "", description: "", image: "" },
    { heading: "", description: "", image: "" },
    { heading: "", description: "", image: "" },
  ]); // Form data for each slide

  const [category, setCategory] = useState(""); // Selected category
  const [loading, setLoading] = useState(false); // Loading state

  const userID = localStorage.getItem("userID"); // Fetch user ID from local storage
  const maxSlides = 6; // Max allowed slides

  // Add a new slide
  const addSlide = () => {
    if (slides.length < maxSlides) {
      setSlides([...slides, slides.length + 1]);
      setFormData([...formData, { heading: "", description: "", image: "" }]);
    }
  };

  // Remove the last slide
  const removeLastSlide = () => {
    if (slides.length > 3) {
      const updatedSlides = slides.slice(0, -1);
      const updatedFormData = formData.slice(0, -1);
      setSlides(updatedSlides);
      setFormData(updatedFormData);
      setCurrentSlide(Math.min(currentSlide, updatedSlides.length)); // Adjust currentSlide if necessary
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[currentSlide - 1][name] = value;
    setFormData(updatedFormData);
  };

  const closeStoryForm = () => {
    setNewStory(false); // Close the story form
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // Update category state
  };

  const handleSlideChange = (slide) => {
    setCurrentSlide(slide); // Change the current slide
  };

  // Submit the form data
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
            {slides.map((slide, index) => (
              <div
                key={slide}
                className={`slide-tab ${
                  currentSlide === slide ? "active" : ""
                }`}
                onClick={() => handleSlideChange(slide)}
                style={{ position: "relative" }}
              >
                Slide {slide}
                {/* Show X button on the last slide after third */}
                {index >= 3 && index === slides.length - 1 && (
                  <button
                    className="remove-slide"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent slide change on click
                      removeLastSlide();
                    }}
                    style={{
                      position: "absolute",
                      top: "20%",
                      right: "-6px",
                      transform: "translateY(-50%)",
                      background: "none",
                      color: "red",
                      borderRadius: "50%",
                      border: "1px red solid",
                      cursor: "pointer",
                      fontSize: "10px",
                      fontWeight: "bold",
                      width: "19px",
                      height: "19px",
                    }}
                  >
                    X
                  </button>
                )}
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
            <div className="nav-buttons">
              <button
                onClick={() => handleSlideChange(currentSlide - 1)}
                disabled={currentSlide === 1}
                style={{
                  padding: "10px 20px",
                  backgroundColor: currentSlide === 1 ? "#7EFF73" : "#7EFF73",
                  border: "none",
                  cursor: currentSlide === 1 ? "not-allowed" : "pointer",
                }}
              >
                Previous
              </button>

              <button
                onClick={() => handleSlideChange(currentSlide + 1)}
                disabled={currentSlide === slides.length}
                style={{
                  padding: "10px 30px",
                  backgroundColor:
                    currentSlide === slides.length ? "#73ABFF" : "#73ABFF",
                  border: "none",
                  cursor:
                    currentSlide === slides.length ? "not-allowed" : "pointer",
                }}
              >
                Next
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={currentSlide !== slides.length || loading}
              style={{
                padding: "10px 30px",
                backgroundColor:
                  currentSlide !== slides.length || loading
                    ? "salmon"
                    : "salmon",
                border: "none",
                cursor:
                  currentSlide !== slides.length || loading
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {loading ? "Posting" : "Post"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddStories;
