import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Deals() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length === 3) return ".";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="relative p-8 sm:p-12 md:p-16">
          <div className="absolute -top-24 -left-24 w-52 h-52 bg-indigo-200 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-indigo-300 rounded-full blur-3xl opacity-50"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-indigo-100 flex items-center justify-center animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 sm:w-20 sm:h-20 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7h18M5 7l1.5 11a2 2 0 002 2h7a2 2 0 002-2L19 7M9 7V5a3 3 0 016 0v2"
                  />
                </svg>
              </div>

              <span className="absolute -top-2 -right-2 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500"></span>
              </span>
            </div>

            <div className="mt-10">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-indigo-700 tracking-wide">
                DEALS ARE COMING SOON
              </h1>

              <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                We're preparing exclusive discounts, exciting offers, and
                limited-time deals just for you.
              </p>

              <div className="mt-8 inline-flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-full px-6 py-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

                <span className="font-semibold text-indigo-700 text-sm sm:text-base">
                  Launching Soon{dots}
                </span>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-gray-50 rounded-2xl p-5 shadow-sm hover:shadow-lg transition duration-300">
                  <div className="text-4xl mb-3">🔥</div>
                  <h3 className="font-bold text-indigo-700">
                    Mega Discounts
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">
                    Huge savings on your favorite products.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 shadow-sm hover:shadow-lg transition duration-300">
                  <div className="text-4xl mb-3">🎁</div>
                  <h3 className="font-bold text-indigo-700">
                    Special Rewards
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">
                    Unlock exclusive gifts and bonus offers.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 shadow-sm hover:shadow-lg transition duration-300">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="font-bold text-indigo-700">
                    Flash Sales
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">
                    Grab limited-time deals before they're gone.
                  </p>
                </div>
              </div>

              <button
                className="mt-10 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg cursor-not-allowed opacity-80"
                disabled
              >
                Stay Tuned
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}