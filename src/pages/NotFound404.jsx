import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-indigo-700 to-indigo-500 px-4">
      <div className="text-center text-white max-w-xl w-full">

        {/* 404 Heading */}
        <h1 className="text-7xl sm:text-8xl font-extrabold tracking-widest">
          404
        </h1>

        {/* Message */}
        <p className="mt-4 text-lg sm:text-xl">
          Oops! The page you are looking for does not exist.
        </p>

        {/* Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:bg-gray-100 transition-all"
          >
            ⬅ Go Home
          </button>
        </div>

        {/* Responsive note */}
        
      </div>
    </div>
  );
}

