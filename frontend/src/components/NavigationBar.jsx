/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  HomeIcon,
  Video,
  VideoIcon,
  Search,
  SearchIcon,
  MessagesSquare,
  MessagesSquareIcon,
  User,
  UserIcon,
} from "lucide-react";

import { Clapperboard, ClapperboardIcon } from "lucide-react";

const NavigationBar = () => {
  const [tab, setTab] = useState(window.location.pathname);

  return (
    <div className="fixed bottom-0 w-full bg-white py-3 shadow-lg border-t">
      <div className="flex justify-around items-center">
        <Link
          to="/"
          onClick={() => setTab("/")}
          className="flex flex-col items-center text-2xl transition-all duration-200 hover:scale-110"
        >
          {tab === "/" ? <Home className="text-blue-500" /> : <HomeIcon />}
        </Link>

        <Link
          to="/reels"
          onClick={() => setTab("/reels")}
          className="flex flex-col items-center text-2xl transition-all duration-200 hover:scale-110"
        >
          {tab === "/reels" ? (
            <Clapperboard className="text-blue-500 border border-blue-500 rounded-md p-1" />
          ) : (
            <ClapperboardIcon />
          )}
        </Link>

        <Link
          to="/search"
          onClick={() => setTab("/search")}
          className="flex flex-col items-center text-2xl transition-all duration-200 hover:scale-110"
        >
          {tab === "/search" ? (
            <Search className="text-blue-500" />
          ) : (
            <SearchIcon />
          )}
        </Link>

        <Link
          to="/chat"
          onClick={() => setTab("/chat")}
          className="flex flex-col items-center text-2xl transition-all duration-200 hover:scale-110"
        >
          {tab === "/chat" ? (
            <MessagesSquare className="text-blue-500" />
          ) : (
            <MessagesSquareIcon />
          )}
        </Link>

        <Link
          to="/account"
          onClick={() => setTab("/account")}
          className="flex flex-col items-center text-2xl transition-all duration-200 hover:scale-110"
        >
          {tab === "/account" ? (
            <User className="text-blue-500" />
          ) : (
            <UserIcon />
          )}
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
