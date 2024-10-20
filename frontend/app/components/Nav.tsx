"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";
import AuthNav from "./AuthNav";

const Nav = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("userToken");
    setUser(null);
    router.push("/signin");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg">EasyGen</div>

        {user ? (
          <AuthNav user={user} handleLogout={handleLogout} />
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white">
              About
            </Link>
            <Link href="/services" className="text-gray-300 hover:text-white">
              Services
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white">
              Contact
            </Link>
            <Link href="/signin" className="text-gray-300 hover:text-white">
              Login
            </Link>
          </div>
        )}

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <Link
                href="/"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                About
              </Link>
              <Link
                href="/services"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Contact
              </Link>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
