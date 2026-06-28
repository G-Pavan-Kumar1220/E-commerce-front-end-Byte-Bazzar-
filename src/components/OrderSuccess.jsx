import React, { useContext } from "react";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Loginstateprovider } from "../Contex_API/LoginState";

const OrderSuccess = () => {
  const { userId } = useContext(Loginstateprovider);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-10">

      {/* CARD */}
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-center relative overflow-hidden">

        {/* ANIMATED BACKGROUND */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-green-200 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-green-100 rounded-full opacity-40 animate-pulse"></div>

        {/* SUCCESS ICON */}
        <div className="relative flex justify-center">
          <div className="bg-green-100 p-5 rounded-full animate-bounce shadow-lg">
            <CheckCircle2
              size={80}
              className="text-green-600"
              strokeWidth={2.5}
            />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="mt-8 text-3xl sm:text-4xl font-bold text-gray-800">
          Order Placed Successfully!
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
          Thank you for your purchase. Your order has been confirmed and
          will be delivered soon.
        </p>

        {/* ORDER INFO */}
        <div className="mt-8 bg-gray-50 rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <ShoppingBag className="text-green-600" size={28} />

            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
              Order ID: #ORD123456
            </h2>
          </div>

          <p className="mt-3 text-gray-500 text-sm">
            Estimated Delivery:
            <span className="font-semibold text-gray-700"> 2-4 Days</span>
          </p>
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

          {/* CONTINUE SHOPPING */}
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-105"
          >
            Continue Shopping
          </button>

          {/* VIEW ORDERS */}
          <button
            onClick={() => (window.location.href = `/orders/${userId}`)}
            className="border border-green-600 text-green-600 hover:bg-green-50 font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
          >
            View Orders
          </button>
        </div>

        {/* FOOTER */}
        <p className="mt-8 text-xs text-gray-400">
          We’ve sent your order confirmation to your email.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;