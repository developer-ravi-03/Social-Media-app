/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../components/Header";
import AddPost from "../components/AddPost";

const AddReelPage = () => {
  return (
    <>
      {/* Header with chat icon hidden */}
      <Header appName="SocialApp" hideChatIcon={true} />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-6">
        <div className="w-full max-w-lg bg-white p-6 md:p-8 rounded-lg shadow-lg">
          <AddPost type="reel" />
        </div>
      </div>
    </>
  );
};

export default AddReelPage;
