import React, { useState } from "react";
import axios from "axios";
import "./AddProducts.css";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !description || !category || !price || !image) {
      setMessage("Please fill all fields and select an image");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const res = await axios.post(
        "https://shopy-ug5z.onrender.com/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product added", res.data);
      setMessage("Product added successfully!");

      // Clear form
      settitle("");
      setimage("");
      setdescription("");
      setcategory("");
      setprice("");

      // Reset file input
      document.getElementById("image").value = "";
    } catch (err) {
      console.log("Full error object:", err);
      console.log("Error response:", err.response);
      console.log("Error message:", err.message);

      let errorMsg = "Error adding product. Please try again.";
      if (err.response) {
        console.log("Server responded with:", err.response.data);
        errorMsg = `Server Error: ${
          err.response.data?.message || "Unknown server error"
        }`;
      } else if (err.request) {
        console.log("No response received:", err.request);
        errorMsg = "No response from server. Check if backend is running.";
      } else {
        errorMsg = `Error: ${err.message}`;
      }

      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        {message && (
          <div
            style={{
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              backgroundColor: message.includes("Error")
                ? "#ffebee"
                : "#e8f5e8",
              color: message.includes("Error") ? "#c62828" : "#2e7d32",
              border: `1px solid ${
                message.includes("Error") ? "#ef5350" : "#4caf50"
              }`,
            }}
          >
            {message}
          </div>
        )}

        <div className="formGroup">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            name="title"
            id="title"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => setimage(e.target.files[0])}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Enter product description"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            placeholder="Enter product category"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            placeholder="Enter product price"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding Product..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
