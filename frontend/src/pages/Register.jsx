/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import Header from "../components/Header";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");
  const [file, setFile] = useState(null);
  const [filePrev, setFilePrev] = useState("");

  const { registerUser, loading } = UserData();
  const { fetchPosts } = PostData();
  const navigate = useNavigate();

  const changeFileHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setFilePrev(reader.result);
        setFile(selectedFile);
      };
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("gender", gender);
    formdata.append("file", file);

    registerUser(formdata, navigate, fetchPosts);
  };

  return (
    <>
      {/* Header without Chat Icon */}
      <Header appName="SocialConnect" hideChatIcon={true} />

      <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-16 px-4">
        {loading ? (
          <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
        ) : (
          <div className="flex flex-col md:flex-row shadow-lg rounded-xl bg-white w-full max-w-3xl">
            {/* Left Section - Form */}
            <div className="w-full md:w-2/3 p-6">
              <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
                  Register to Social Media
                </h1>
                <p className="text-gray-500">Create your account</p>
              </div>

              {/* Profile Picture Preview */}
              {filePrev && (
                <div className="flex justify-center mb-4">
                  <img
                    src={filePrev}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-gray-300 object-cover"
                    alt="Profile Preview"
                  />
                </div>
              )}

              <form onSubmit={submitHandler} className="space-y-5">
                <input
                  type="file"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={changeFileHandler}
                  accept="image/*"
                  required
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {/* Password Input with Toggle Button */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible size={22} />
                    ) : (
                      <AiFillEye size={22} />
                    )}
                  </button>
                </div>

                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                >
                  Register
                </button>
              </form>
            </div>

            {/* Right Section - Login CTA */}
            <div className="w-full md:w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex flex-col items-center justify-center text-center p-6">
              <h1 className="text-2xl md:text-3xl font-bold">
                Have an Account?
              </h1>
              <p className="text-sm md:text-base mt-1">
                Login and start connecting!
              </p>
              <Link
                to="/login"
                className="mt-3 bg-white text-blue-500 font-semibold py-2 px-6 rounded-md hover:bg-gray-200 transition"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Register;
