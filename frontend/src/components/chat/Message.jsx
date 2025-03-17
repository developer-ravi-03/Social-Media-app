/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Message = ({ ownMessage, message }) => {
  return (
    <div
      className={`flex ${ownMessage ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`relative p-3 rounded-xl shadow-md break-words max-w-[80%] sm:max-w-[60%] md:max-w-[60%] lg:max-w-[65%] ${
          ownMessage ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        <p className="text-sm sm:text-base md:text-base leading-tight">
          {message}
        </p>

        {/* Small arrow for a speech bubble effect */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-0 h-0 border-solid border-8 ${
            ownMessage
              ? "right-[-8px] border-blue-500 border-t-transparent border-b-transparent border-r-transparent"
              : "left-[-8px] border-gray-300 border-t-transparent border-b-transparent border-l-transparent"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Message;
