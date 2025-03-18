/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostData } from "../context/PostContext";
import { LoadingAnimation } from "./Loading";

const AddPost = ({ type }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [filePrev, setFilePrev] = useState("");

  const { addPost, addLoading } = PostData();
  const navigate = useNavigate(); // Hook for redirection

  // Handle file upload
  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  // Handle post submission
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("file", file);

    await addPost(formData, setFile, setCaption, setFilePrev, type);

    if (type === "post") {
      navigate("/"); // Redirect to home page for posts
    } else if (type === "reel") {
      navigate("/reels"); // Redirect to reels page for reels
    }
  };

  return (
    <div className="w-full">
      {/* Page Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center mb-4">
        {type === "post" ? "Create a New Post" : "Upload a Reel"}
      </h2>

      {/* Form */}
      <form onSubmit={submitHandler} className="space-y-4">
        {/* Caption Input */}
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        {/* File Input */}
        {/* File Input */}
        <div className="w-full">
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition duration-300 bg-gray-50"
          >
            <svg
              className="w-10 h-10 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 118 0m5 0a9 9 0 10-18 0v1a2 2 0 002 2h12a2 2 0 002-2v-1m-5-5l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <span className="text-gray-500 text-sm">
              Click to upload or drag & drop your file
            </span>
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              accept={type === "post" ? "image/*" : "video/*"}
              onChange={changeFileHandler}
              required
            />
          </label>

          {/* Show selected file name */}
          {file && (
            <p className="mt-2 text-sm text-gray-600 text-center">
              Selected file:{" "}
              <span className="font-medium text-blue-600">{file.name}</span>
            </p>
          )}
        </div>

        {/* Preview Section */}
        {filePrev && (
          <div className="flex justify-center">
            {type === "post" ? (
              <img
                src={filePrev}
                alt="Preview"
                className="w-full max-h-60 object-contain rounded-lg shadow-md"
              />
            ) : (
              <video
                controls
                src={filePrev}
                className="w-full h-auto max-h-[400px] rounded-lg"
                style={{ aspectRatio: "9/16" }} // Ensures vertical reels are properly displayed
                controlsList="nodownload"
              />
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={addLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300"
        >
          {addLoading ? <LoadingAnimation /> : "+ Add Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
