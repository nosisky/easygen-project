"use client";

import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";

const AuthNav = ({
  user,
  handleLogout,
}: {
  user: { name: string };
  handleLogout: () => void;
}) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <div className="flex items-center space-x-2 relative group">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-800 text-lg">{user.name.charAt(0)}</span>
        </div>
        <button className="text-white focus:outline-none">{user.name}</button>
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthNav;
