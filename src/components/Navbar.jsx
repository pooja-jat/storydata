import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-slate-900 to-slate-800 border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-bold bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              BrainyLingo
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-slate-300 hover:text-white font-medium "
            >
              Home
            </Link>
            <a
              href="#"
              className="text-slate-300 hover:text-white font-medium "
            >
              Loaderboard
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-white font-medium"
            >
              Daily Quiz
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-white font-medium "
            >
              Genre
            </a>
          </div>

          <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700  shadow-lg ">
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
