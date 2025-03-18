/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import PostCard from "../components/PostCard";
import Header from "../components/Header";
import { PostData } from "../context/PostContext";
import { Loading } from "../components/Loading";
import PostInput from "../components/PostInput";

const Home = ({ user }) => {
  const { posts, loading } = PostData();

  return (
    <>
      {/* Header Section */}

      <Header appName="SocialConnect" />

      {/* Main Content */}
      <div className="min-h-screen bg-gray-100 pt-16 pb-8 px-3 md:px-8">
        {/* Centered Container */}
        <div className="max-w-3xl mx-auto">
          {/* Post Input Section */}
          <div className="bg-white p-3 md:p-5 rounded-lg shadow-md mb-4 md:mb-6">
            <PostInput user={user} />
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center mt-8">
              <Loading />
            </div>
          ) : (
            <>
              {/* Post Feed */}
              {posts && posts.length > 0 ? (
                <div className="space-y-4 md:space-y-6">
                  {posts.map((post) => (
                    <div
                      key={post._id}
                      className="bg-white p-3 md:p-4 rounded-lg shadow-md"
                    >
                      <PostCard value={post} type={"post"} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 text-sm md:text-lg mt-4 md:mt-6">
                  No posts yet. Start the conversation!
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
