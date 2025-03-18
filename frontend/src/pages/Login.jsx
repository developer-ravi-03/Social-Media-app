/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import Header from "../components/Header";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Eye Icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle state

  const navigate = useNavigate();
  const { loginUser, loading } = UserData();
  const { fetchPosts } = PostData();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate, fetchPosts);
  };

  return (
    <>
      {/* Header without Chat Icon */}
      <Header appName="SocialConnect" hideChatIcon={true} />

      {/* Main Container */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-16 px-4">
        {loading ? (
          <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
        ) : (
          <div className="flex flex-col md:flex-row shadow-lg rounded-xl bg-white w-full max-w-2xl">
            {/* Left Side - Login Form */}
            <div className="w-full md:w-2/3 p-6">
              <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
                  Welcome Back
                </h1>
                <p className="text-gray-500">Login to your account</p>
              </div>

              <form onSubmit={submitHandler} className="space-y-5">
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {/* Password Input with Toggle Visibility Icon */}
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

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                >
                  Login
                </button>
              </form>
            </div>

            {/* Right Side - Register CTA (Responsive) */}
            <div className="w-full md:w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex flex-col items-center justify-center text-center p-6">
              <h1 className="text-2xl md:text-3xl font-bold">New Here?</h1>
              <p className="text-sm md:text-base mt-1">
                Join now and start connecting!
              </p>
              <Link
                to="/register"
                className="mt-3 bg-white text-blue-500 font-semibold py-2 px-6 rounded-md hover:bg-gray-200 transition"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
