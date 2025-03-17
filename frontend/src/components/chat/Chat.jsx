/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { use } from "react";
import { UserData } from "../../context/UserContext";
import { BsSendCheck } from "react-icons/bs";

const Chat = ({ chat, setSelectedChat, isOnline }) => {
  const { user: loggedInUser } = UserData();
  let user = chat ? chat.users[0] : null;

  return (
    <>
      {user && (
        <div
          className="p-3 bg-white rounded-lg shadow-sm cursor-pointer flex items-center gap-3"
          onClick={() => setSelectedChat(chat)} // No auto message sending
        >
          <div className="relative w-10 h-10">
            <img
              src={user.profilePic.url}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{user.name}</span>
            </div>
            <div className="text-sm text-gray-600 flex items-center gap-1 truncate">
              {loggedInUser._id === chat.latestMessage?.sender && (
                <BsSendCheck />
              )}
              <span>
                {chat.latestMessage?.text
                  ? chat.latestMessage.text.length > 18
                    ? `${chat.latestMessage.text.slice(0, 18)}...`
                    : chat.latestMessage.text
                  : "No messages yet"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
