// src/components/Myupload.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Myupload.css";
import { useNavigate } from "react-router-dom";

export const UploadForm = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const createdAt = new Date();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const storedInfo = localStorage.getItem("Info");
  const name = storedInfo ? JSON.parse(storedInfo).name : "";

  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !description) {
      alert("Please provide a file and description.");
      return;
    }

    const formData = new FormData();
    formData.append("token", token);
    formData.append("description", description);
    formData.append("image", file); // still using 'image' key for compatibility
    formData.append("date", createdAt);
    formData.append("name", name);

    try {
      const response = await axios.post(
        "http://localhost:3600/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Upload successful!");
      navigate(-1);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Try again.");
    }
  };

  return (
    <div className="socio-upload-container">
      <div className="socioform">
        <h2>Upload File</h2>
        <form className="socio-upload-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter a brief description..."
            />
          </div>
          <div className="form-group">
            <label>Choose File (Image or PDF):</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};
