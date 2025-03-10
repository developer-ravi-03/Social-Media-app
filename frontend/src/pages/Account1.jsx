import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Grid } from "lucide-react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("posts");
  const profilePic = "./images/r.jpg";
  const userName = "John Doe";
  const posts = Array(9).fill("https://via.placeholder.com/300");
  const reels = Array(6).fill("https://via.placeholder.com/300");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
      {/* Profile Section */}
      <motion.div
        className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg mt-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <motion.img
            src={profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
            whileHover={{ scale: 1.1 }}
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{userName}</h2>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">Edit Profile</button>
          </div>
        </div>
      </motion.div>

      {/* Tabs Section */}
      <div className="flex justify-center space-x-8 mt-6">
        <button className={`text-lg font-semibold ${activeTab === "posts" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"}`} onClick={() => setActiveTab("posts")}>
          <Grid className="inline-block w-5 h-5 mr-1" /> Posts
        </button>
        <button className={`text-lg font-semibold ${activeTab === "reels" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"}`} onClick={() => setActiveTab("reels")}>
          <Camera className="inline-block w-5 h-5 mr-1" /> Reels
        </button>
      </div>

      {/* Content Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {(activeTab === "posts" ? posts : reels).map((item, index) => (
          <motion.img
            key={index}
            src={item}
            alt="Content"
            className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer"
            whileHover={{ scale: 1.05 }}
          />
        ))}
      </motion.div>
    </div>
  );
}
