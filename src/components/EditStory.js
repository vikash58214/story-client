import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "../style/addStories.css";
import "react-toastify/dist/ReactToastify.css";

const EditStory = ({ setEditStory, storyData }) => {
  const [slides, setSlides] = useState([1, 2, 3]);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [formData, setFormData] = useState([]);
  const [category, setCategory] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const maxSlides = 6;

  useEffect(() => {
    if (storyData) {
      const initializedFormData = storyData.slides.map((slide) => ({
        heading: slide.heading || "sdds",
        description: slide.description || "",
        image: slide.image || "",
      }));
      setFormData(initializedFormData);
      setCategory(storyData.category || "");
      setSlides(
        Array.from({ length: storyData.slides.length }, (_, i) => i + 1)
      );
    }
  }, [storyData]);

  const addSlide = () => {
    if (slides.length < maxSlides) {
      setSlides([...slides, slides.length + 1]);
      setFormData([...formData, { heading: "", description: "", image: "" }]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[currentSlide - 1] = {
      ...updatedFormData[currentSlide - 1],
      [name]: value,
    };
    setFormData(updatedFormData);
  };

  const closeStoryForm = () => {
    setEditStory(false);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSlideChange = (slide) => {
    setCurrentSlide(slide);
  };

  const handleUpdateStory = async () => {
    setIsUpdating(true);
    try {
      const response = await axios.put(
        `https://story-server-jtcw.onrender.com/update/${storyData._id}`,
        {
          category,
          slides: formData,
        }
      );
      if (response.data.message === "success") {
        window.alert("story updated successfully!");
        setEditStory(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
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
                value={formData[currentSlide - 1]?.heading || ""}
                onChange={handleInputChange}
                placeholder="Your heading"
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData[currentSlide - 1]?.description || ""}
                onChange={handleInputChange}
                placeholder="Story Description"
              />
            </div>

            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={formData[currentSlide - 1]?.image || ""}
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
                onClick={handleUpdateStory}
                disabled={isUpdating}
                style={{
                  padding: "10px 20px",
                  backgroundColor: isUpdating ? "gray" : "salmon",
                  border: "none",
                  cursor: isUpdating ? "not-allowed" : "pointer",
                }}
              >
                {isUpdating ? "Updating" : "Post"}
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditStory;
