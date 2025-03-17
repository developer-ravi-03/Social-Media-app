/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserData } from "./UserContext";

const EndPoint = "https://social-media-app-gkbm.onrender.com";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = UserData();

  useEffect(() => {
    if (!user?._id) return;

    const newSocket = io(EndPoint, {
      query: { userId: user._id },
      transports: ["websocket"], // ✅ Ensure WebSocket is used instead of polling
    });

    setSocket(newSocket);

    newSocket.on("getOnlineUser", (users) => {
      setOnlineUsers(users);
    });

    // ✅ Listen for new messages globally
    newSocket.on("messageReceived", (message) => {
      console.log("🔴 New message received:", message);
    });

    return () => {
      newSocket.off("getOnlineUser");
      newSocket.off("messageReceived");
      newSocket.close();
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const SocketData = () => useContext(SocketContext);
