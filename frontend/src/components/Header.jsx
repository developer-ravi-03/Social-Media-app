/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { BsChatFill } from "react-icons/bs";

const Header = ({ appName, hideChatIcon }) => {
  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center fixed top-0 w-full z-10">
      <div className="text-lg font-semibold">{appName}</div>
      {!hideChatIcon && (
        <Link to="/chat" className="text-xl text-white">
          <BsChatFill />
        </Link>
      )}
    </header>
  );
};

export default Header;
