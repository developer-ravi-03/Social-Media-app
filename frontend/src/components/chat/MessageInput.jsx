/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ChatData } from "../../context/ChatContext";
import toast from "react-hot-toast";
import axios from "axios";
import { Send } from "lucide-react";

const MessageInput = ({ setMessages, selectedChat }) => {
  //input for sending message
  const [textMsg, setTextMsg] = useState("");
  const { setChats } = ChatData();

  // for sending message
  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/messages", {
        message: textMsg,
        receiverId: selectedChat.users[0]._id,
      });

      setMessages((message) => [...message, data]);
      setTextMsg("");
      setChats((prev) => {
        const updatedChat = prev.map((chat) => {
          if (chat._id === selectedChat._id) {
            return {
              ...chat,
              latestMessage: {
                text: textMsg,
                sender: data.sender,
              },
            };
          }

          return chat;
        });

        return updatedChat;
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-full bg-white py-3 px-4  flex items-center sticky bottom-6">
      <form onSubmit={handleMessage} className="w-full flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 bg-white rounded-lg p-2 focus:outline-none"
          value={textMsg}
          onChange={(e) => setTextMsg(e.target.value)}
          required
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center"
        >
          <Send />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
