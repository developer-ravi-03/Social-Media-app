/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ChatData } from "../context/ChatContext";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Chat from "../components/chat/Chat";
import MessageContainer from "../components/chat/MessageContainer";
import { SocketData } from "../context/SocketContext";

const ChatPage = ({ user }) => {
  const { createChat, selectedChat, setSelectedChat, chats, setChats } =
    ChatData();

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);

  //get all user for chat
  async function fetchAllUsers() {
    try {
      const { data } = await axios.get("/api/user/all?search=" + query);

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  //get all chats
  const getAllChats = async () => {
    try {
      const { data } = await axios.get("/api/messages/chats");
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [query]);

  useEffect(() => {
    getAllChats();
  }, []);

  async function createNewChat(id) {
    await createChat(id);
    setSearch(false);
    getAllChats();
  }

  //for show user online status with socket.io
  const { onlineUsers, socket } = SocketData();

  return (
    <div className="w-[100%] md:w-[100%] md:p-4 bg-gray-100">
      <div className="flex gap-4 mx-auto">
        <div className="w-[20%] h-[90vh]">
          <div className="top">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-full"
              onClick={() => setSearch(!search)}
            >
              {search ? "X" : <FaSearch />}
            </button>
            {search ? (
              <>
                <input
                  type="text"
                  className="custom-input"
                  style={{ width: "100px", border: "gray solid 1px" }}
                  placeholder="Enter name"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                <div className="users">
                  {users && users.length > 0 ? (
                    users.map((e) => (
                      <div
                        key={e._id}
                        onClick={() => createNewChat(e._id)}
                        className="bg-gray-500 text-white p-2 mt-2 cursor-pointer flex justify-center items-center gap-2"
                      >
                        <img
                          src={e.profilePic.url}
                          className="w-8 h-8 rounded-full"
                          alt=""
                        />
                        {e.name}
                      </div>
                    ))
                  ) : (
                    <p>No Users</p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center mt-2">
                {chats.map((e) => (
                  <Chat
                    key={e._id}
                    chat={e}
                    setSelectedChat={setSelectedChat}
                    isOnline={onlineUsers.includes(e.users[0]._id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {selectedChat === null ? (
          <div className="w-[70%] mx-20 mt-40 text-2xl">
            Hello 👋 {user.name} select a chat to start conversation
          </div>
        ) : (
          <div className="w-[70%]">
            <MessageContainer selectedChat={selectedChat} setChats={setChats} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
