/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Search, ArrowLeft, MoreVertical, X } from "lucide-react";
import Input from "../components/ui/Input";
import { ChatData } from "../context/ChatContext";
import axios from "axios";
import { SocketData } from "../context/SocketContext";
import Chat from "../components/chat/Chat";
import MessageContainer from "../components/chat/MessageContainer";

const ChatPage = ({ user, chat }) => {
  const { selectedChat, createChat, setSelectedChat, chats, setChats } =
    ChatData();
  const { onlineUsers, socket } = SocketData(); // ✅ Get socket

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  // Get all users
  useEffect(() => {
    if (query) {
      axios
        .get(`/api/user/all?search=${query}`)
        .then(({ data }) => setUsers(data))
        .catch((error) => console.log(error));
    } else {
      setUsers([]);
    }
  }, [query]);

  // Get all chats
  const getAllChats = async () => {
    try {
      const { data } = await axios.get("/api/messages/chats");
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllChats();
  }, []);

  const createNewChat = async (id) => {
    try {
      const existingChat = chats.find((chat) =>
        chat.users.some((user) => user._id === id)
      );

      if (existingChat) {
        setSelectedChat(existingChat);
      } else {
        await createChat(id);
        getAllChats();
      }
    } catch (error) {
      console.error(
        "Error creating/selecting chat:",
        error.response?.data || error.message
      );
    }

    setSearchActive(false);
    setQuery("");
  };

  const handleUserClick = (user) => {
    createNewChat(user._id, user.name);
  };

  // ✅ Listen for incoming messages in real-time
  useEffect(() => {
    if (!socket) return;

    socket.on("messageReceived", (newMessage) => {
      console.log("🔴 New message received:", newMessage);
      setChats((prevChats) => {
        const chatExists = prevChats.find(
          (chat) => chat._id === newMessage.chat._id
        );

        if (chatExists) {
          return prevChats.map((chat) =>
            chat._id === newMessage.chat._id
              ? { ...chat, updatedAt: newMessage.createdAt }
              : chat
          );
        } else {
          return [...prevChats, newMessage.chat]; // Add new chat if not found
        }
      });
    });

    return () => socket.off("messageReceived"); // Cleanup
  }, [socket, setChats]);

  return (
    <div className="flex h-[calc(100vh-12px)] w-full overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-gray-100 p-4 h-full overflow-y-auto transition-all duration-300 ${
          selectedChat ? "hidden md:w-80 md:block" : "w-full md:w-80"
        }`}
      >
        <div className="flex items-center justify-between pb-2 border-b">
          <h2 className="text-xl font-semibold">Chats</h2>
          <MoreVertical className="cursor-pointer" />
        </div>

        {/* Search Input */}
        <div className="relative mt-2">
          <div className="flex items-center border rounded-md shadow-sm px-3 py-2">
            <Search className="text-gray-400 mr-2" />
            <Input
              type="text"
              placeholder="Search..."
              className="w-full border-none outline-none"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchActive(true);
              }}
            />
            {query && (
              <X
                className="text-gray-500 cursor-pointer ml-2"
                onClick={() => {
                  setQuery("");
                  setSearchActive(false);
                }}
              />
            )}
          </div>

          {searchActive && query && (
            <div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md mt-1 overflow-hidden z-10">
              {users.length > 0 ? (
                users.map((e) => (
                  <div
                    key={e._id}
                    onClick={() => handleUserClick(e)}
                    className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition-all"
                  >
                    <img
                      src={e.profilePic.url}
                      className="w-8 h-8 rounded-full object-cover"
                      alt={e.name}
                    />
                    <span className="text-gray-700 font-medium">{e.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 p-2">No Users Found</p>
              )}
            </div>
          )}
        </div>

        {/* Chat List */}
        <div className="mt-4 space-y-3 overflow-y-auto h-[calc(100vh-170px)]">
          {chats.length === 0 ? (
            <p>No chats available</p>
          ) : (
            [...chats]
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .map((e) => (
                <Chat
                  key={e._id}
                  chat={e}
                  setSelectedChat={setSelectedChat}
                  isOnline={onlineUsers.includes(e.users[0]?._id)}
                />
              ))
          )}
        </div>
      </div>

      {/* Chat Section */}
      <div
        className={`flex flex-col flex-1 ${
          selectedChat ? "w-full flex" : "hidden md:flex"
        }`}
      >
        <div className="flex items-center justify-between p-2 md:p-4 bg-gray-200 border-b">
          {selectedChat && (
            <ArrowLeft
              className="cursor-pointer md:hidden"
              onClick={() => setSelectedChat(null)}
            />
          )}
          <div className="flex items-center gap-2">
            {selectedChat ? (
              <div className="flex items-center space-x-2">
                <img
                  src={
                    selectedChat?.users?.[0]?.profilePic?.url ||
                    "/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">
                    {selectedChat?.users?.[0]?.name || "Unknown User"}
                  </h2>
                  <p
                    className={`text-sm ${
                      onlineUsers.includes(selectedChat?.users?.[0]?._id)
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {onlineUsers.includes(selectedChat?.users?.[0]?._id)
                      ? "Online"
                      : "Offline"}
                  </p>
                </div>
              </div>
            ) : (
              <h2 className="text-lg font-semibold">Select a chat</h2>
            )}
          </div>
          <MoreVertical className="cursor-pointer" />
        </div>
        <div className="flex-1 bg-gray-50 flex flex-col gap-3">
          {selectedChat ? (
            <MessageContainer selectedChat={selectedChat} setChats={setChats} />
          ) : (
            <p className="text-center text-gray-500">
              Hello 👋 {user.name}! Select a chat to start messaging
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
