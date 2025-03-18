/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import axios from "axios";
import Modal from "../components/Modal";
import { Loading } from "../components/Loading";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";
import { UserData } from "../context/UserContext";
import Header from "../components/Header";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { logoutUser, updateProfilePic, updateProfileName } = UserData();
  const { posts, reels, loading } = PostData();

  let myPosts = posts
    ? posts.filter((post) => post.owner._id === user._id)
    : [];
  let myReels = reels
    ? reels.filter((reel) => reel.owner._id === user._id)
    : [];

  const [type, setType] = useState("post");
  const [showEdit, setShowEdit] = useState(false);
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);
  const [showUpdatePass, setShowUpdatePass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState(user.name || "");

  useEffect(() => {
    async function followData() {
      try {
        const { data } = await axios.get("/api/user/followdata/" + user._id);
        setFollowersData(data.followers);
        setFollowingsData(data.followings);
      } catch (error) {
        console.log(error);
      }
    }
    followData();
  }, [user]);

  const logoutHandler = () => logoutUser(navigate);
  const changeFileHandler = (e) => setFile(e.target.files[0]);
  const changleImageHandler = () => {
    const formdata = new FormData();
    formdata.append("file", file);
    updateProfilePic(user._id, formdata, setFile);
  };
  const UpdateName = () => updateProfileName(user._id, name, setShowEdit);
  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/" + user._id, {
        oldPassword,
        newPassword,
      });
      toast.success(data.message);
      setOldPassword("");
      setNewPassword("");
      setShowUpdatePass(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-5 pb-14">
      {show && (
        <Modal value={followersData} title="Followers" setShow={setShow} />
      )}
      {show1 && (
        <Modal value={followingsData} title="Followings" setShow={setShow1} />
      )}

      <div className="bg-white flex flex-col items-center p-6 rounded-lg shadow-md w-full max-w-lg mb-6">
        <img
          src={user.profilePic.url}
          alt="Profile"
          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full"
        />
        <p className="text-gray-800 font-semibold text-xl mt-3">{user.name}</p>
        <p className="text-gray-500 text-sm">{user.email}</p>
        <p className="text-gray-500 text-sm">{user.gender}</p>
        <div className="flex gap-4 mt-3">
          <p
            className="cursor-pointer text-gray-500"
            onClick={() => setShow(true)}
          >
            {user.followers.length} Followers
          </p>
          <p
            className="cursor-pointer text-gray-500"
            onClick={() => setShow1(true)}
          >
            {user.followings.length} Following
          </p>
        </div>
        <button
          className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={logoutHandler}
        >
          Logout
        </button>
        <button
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setShowEdit(!showEdit)}
        >
          {showEdit ? "Cancel" : "Edit Profile"}
        </button>
        {showEdit && (
          <div className="flex flex-col items-center mt-4 gap-3 w-full">
            <input
              type="file"
              onChange={changeFileHandler}
              className="border p-2 w-full"
            />
            <button
              onClick={changleImageHandler}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
            >
              Update Profile Picture
            </button>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
              placeholder="Enter Name"
            />
            <button
              onClick={UpdateName}
              className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
            >
              Update Name
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-md w-full"
              onClick={() => setShowUpdatePass(!showUpdatePass)}
            >
              {showUpdatePass ? "Cancel" : "Update Password"}
            </button>
            {showUpdatePass && (
              <div className="mt-4 w-full">
                <input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="border p-2 w-full"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border p-2 w-full mt-2"
                />
                <button
                  onClick={updatePassword}
                  className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 w-full"
                >
                  Save New Password
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setType("post")}
          className={`px-4 py-2 rounded-md ${
            type === "post" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setType("reel")}
          className={`px-4 py-2 rounded-md ${
            type === "reel" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Reels
        </button>
      </div>
      <div className="mt-6 w-full max-w-lg flex flex-wrap justify-center gap-4">
        {type === "post" ? (
          myPosts.length > 0 ? (
            myPosts.map((e) => <PostCard type="post" value={e} key={e._id} />)
          ) : (
            <p>No Posts Yet</p>
          )
        ) : myReels.length > 0 ? (
          myReels.map((e) => <PostCard type="reel" value={e} key={e._id} />)
        ) : (
          <p>No Reels Yet</p>
        )}
      </div>
    </div>
  );
};

export default Account;
