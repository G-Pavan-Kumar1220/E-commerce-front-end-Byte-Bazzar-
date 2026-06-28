import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  User,
  ShieldCheck,
  ShoppingBag,
  LogOut,
  CalendarDays,
} from "lucide-react";

import { BackendAPI } from "../api/api";
import { Loginstateprovider } from "../Contex_API/LoginState";

export default function UserDetails() {
  const navigate = useNavigate();

  const { userId } = useContext(Loginstateprovider);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // FETCH USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const tokens = localStorage.getItem("tokens");

        const response = await fetch(
          `${BackendAPI}/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokens}`,
            },
          }
        );

        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("tokens");

    navigate("/login");
  };

  // LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 animate-pulse">

          <div className="flex flex-col items-center">

            <div className="w-28 h-28 rounded-full bg-gray-300"></div>

            <div className="h-5 w-40 bg-gray-300 rounded mt-5"></div>

            <div className="h-4 w-52 bg-gray-200 rounded mt-3"></div>

            <div className="grid grid-cols-2 gap-4 w-full mt-8">

              <div className="h-24 rounded-2xl bg-gray-200"></div>

              <div className="h-24 rounded-2xl bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">

      <div className="max-w-6xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-all duration-300 mb-6"
        >
          <ArrowLeft size={18} />

          <span className="text-sm sm:text-base font-medium">
            Back
          </span>
        </button>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT PROFILE CARD */}
          <div className="lg:col-span-1">

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

              {/* TOP COVER */}
              <div className="h-32 bg-linear-to-r from-black to-gray-800"></div>

              {/* PROFILE */}
              <div className="px-6 pb-6 relative">

                <div className="flex justify-center">

                  <img
                    src={
                      user?.profilePic ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf03xAtrd6a1EZ51UlMBH1960KpZqLVWOIcg&s"
                    }
                    alt="profile"
                    className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg -mt-14"
                  />
                </div>

                {/* USER INFO */}
                <div className="text-center mt-4">

                  <h2 className="text-2xl font-bold text-gray-900">
                    {user?.user?.name || "User Name"}
                  </h2>

                  <p className="text-gray-500 mt-1 text-sm">
                    {user?.user?.email}
                  </p>
                </div>

                {/* STATUS */}
                <div className="flex items-center justify-center gap-2 mt-5">

                  <div className="w-2 h-2 rounded-full bg-green-500"></div>

                  <span className="text-sm text-green-600 font-medium">
                    Active Account
                  </span>
                </div>

                {/* BUTTONS */}
                <div className="mt-8 space-y-3">

                  <button
                    onClick={() => navigate(`/orders/${userId}`)}
                    className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white py-3 rounded-2xl font-medium transition-all duration-300"
                  >
                    <ShoppingBag size={18} />

                    View Orders
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 py-3 rounded-2xl font-medium transition-all duration-300"
                  >
                    <LogOut size={18} />

                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* ACCOUNT DETAILS */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">

              <div className="flex items-center justify-between mb-8">

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Account Details
                  </h2>

                  <p className="text-gray-500 mt-1 text-sm">
                    Manage your profile information
                  </p>
                </div>
              </div>

              {/* DETAILS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* NAME */}
                <div className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300">

                  <div className="flex items-center gap-3 mb-3">

                    <div className="bg-gray-100 p-3 rounded-xl">
                      <User size={20} />
                    </div>

                    <h3 className="font-semibold text-gray-700">
                      Full Name
                    </h3>
                  </div>

                  <p className="text-lg font-bold text-gray-900 wrap-break-word">
                    {user?.user?.name || "Not Available"}
                  </p>
                </div>

                {/* EMAIL */}
                <div className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300">

                  <div className="flex items-center gap-3 mb-3">

                    <div className="bg-gray-100 p-3 rounded-xl">
                      <Mail size={20} />
                    </div>

                    <h3 className="font-semibold text-gray-700">
                      Email Address
                    </h3>
                  </div>

                  <p className="text-lg font-bold text-gray-900 break-all">
                    {user?.user?.email || "Not Available"}
                  </p>
                </div>

                {/* ACCOUNT STATUS */}
                <div className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300">

                  <div className="flex items-center gap-3 mb-3">

                    <div className="bg-green-100 p-3 rounded-xl">
                      <ShieldCheck
                        size={20}
                        className="text-green-600"
                      />
                    </div>

                    <h3 className="font-semibold text-gray-700">
                      Account Status
                    </h3>
                  </div>

                  <p className="text-lg font-bold text-green-600">
                    Verified
                  </p>
                </div>

                {/* MEMBER SINCE */}
                <div className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300">

                  <div className="flex items-center gap-3 mb-3">

                    <div className="bg-blue-100 p-3 rounded-xl">
                      <CalendarDays
                        size={20}
                        className="text-blue-600"
                      />
                    </div>

                    <h3 className="font-semibold text-gray-700">
                      Member Since
                    </h3>
                  </div>

                  <p className="text-lg font-bold text-gray-900">
                    2024
                  </p>
                </div>
              </div>
            </div>

            {/* EXTRA SECTION */}
            <div className="bg-linear-to-r from-black to-gray-800 rounded-3xl p-6 sm:p-8 text-white">

              <h2 className="text-2xl font-bold">
                Welcome Back 👋
              </h2>

              <p className="text-gray-300 mt-3 leading-relaxed text-sm sm:text-base">
                Manage your orders, update your profile,
                and track all your purchases easily from
                your dashboard.
              </p>

              <button
                onClick={() => navigate(`/orders/${userId}`)}
                className="mt-6 bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
              >
                Go To Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}