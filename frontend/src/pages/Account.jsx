/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/userContext";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import axios from "axios";
import Modal from "../components/Modal";

const Account = ({ user }) => {
  const navigate = useNavigate();

  const { logoutUser } = UserData();

  const { posts, reels } = PostData();

  let myPosts;

  if (posts) {
    myPosts = posts.filter((post) => post.owner._id === user._id);
  }
  let myReels;

  if (reels) {
    myReels = reels.filter((reel) => reel.owner._id === user._id);
  }

  const [type, setType] = useState("post");

  //for logout
  const logoutHandler = () => {
    logoutUser(navigate);
  };

  //for reel navigation
  const [index, setIndex] = useState(0);

  const prevReel = () => {
    if (index === 0) {
      console.log("null");
      return null;
    }
    setIndex(index - 1);
  };
  const nextReel = () => {
    if (index === reels.length - 1) {
      console.log("null");
      return null;
    }
    setIndex(index + 1);
  };

  //follow and unfollow data
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);

  async function followData() {
    try {
      const { data } = await axios.get("/api/user/followdata/" + user._id);

      setFollowersData(data.followers);
      setFollowingsData(data.followings);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    followData();
  }, [user]);

  return (
    <>
      {user && (
        <>
          <div className="bg-gray-100 min-h-screen flex flex-col gap-4 items-center justify-center pt-3 pb-14">
            {show && (
              <Modal
                value={followersData}
                title={"Followers"}
                setShow={setShow}
              />
            )}
            {show1 && (
              <Modal
                value={followingsData}
                title={"Followings"}
                setShow={setShow1}
              />
            )}
            <div className="bg-white flex justify-between gap-4 p-8 rounded-lg shadow-md max-w-md">
              <div className="image flex flex-col justify-between mb-4 gap-4">
                <img
                  src={user.profilePic.url}
                  alt=""
                  className="w-[180px] h-[180px] rounded-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-gray-800 font-semibold">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <p className="text-gray-500 text-sm">{user.gender}</p>
                <p
                  className="text-gray-500 text-sm cursor-pointer"
                  onClick={() => setShow(true)}
                >
                  {user.followers.length} followers
                </p>
                <p
                  className="text-gray-500 text-sm cursor-pointer"
                  onClick={() => setShow1(true)}
                >
                  {user.followings.length} following
                </p>
                <button
                  onClick={logoutHandler}
                  className=" bg-red-500 text-white rounded-md"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="controls flex justify-center items-center bg-white p-4 rounded-md gap-7">
              <button onClick={() => setType("post")}>Posts</button>
              <button onClick={() => setType("reel")}>Reels</button>
            </div>

            {/* for Post  */}
            {type === "post" && (
              <>
                {myPosts && myPosts.length > 0 ? (
                  myPosts.map((e) => (
                    <PostCard type={"post"} value={e} key={e._id} />
                  ))
                ) : (
                  <p>No Post Yet</p>
                )}
              </>
            )}

            {/* for reel  */}

            {type === "reel" && (
              <>
                {myReels && myReels.length > 0 ? (
                  <div className="flex gap-3 justify-center items-center">
                    <PostCard
                      type={"reel"}
                      value={myReels[index]}
                      key={myReels[index]._id}
                    />
                    <div className="button flex flex-col justify-center items-center gap-6">
                      {index === 0 ? (
                        ""
                      ) : (
                        <button
                          className="bg-gray-500 text-white py-5 px-5 rounded-full"
                          onClick={prevReel}
                        >
                          <FaArrowUp />
                        </button>
                      )}
                      {index === myReels.length - 1 ? (
                        ""
                      ) : (
                        <button
                          className="bg-gray-500 text-white py-5 px-5 rounded-full"
                          onClick={nextReel}
                        >
                          <FaArrowDown />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <p>No Reels Yet</p>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Account;
