import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import { BackendAPI } from "../api/api";

import { Loginstateprovider } from "../Contex_API/LoginState";

import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  ArrowLeft,
  LoaderCircle,
  ShoppingCart,
} from "lucide-react";

const API = `${BackendAPI}/cart`;

export default function CartPage() {
  const {
    userId,
    setCartCount,
  } = useContext(Loginstateprovider);

  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(true);

  const [buttonLoading, setButtonLoading] =
    useState(false);

  // 🔹 SCROLL TOP
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // 🔹 FETCH CART
  const fetchCart = async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${API}/${userId}`
      );

      const data = await res.json();

      setCart(data);

      // 🔹 UPDATE CART COUNT
      setCartCount(data.length || 0);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  // 🔹 REMOVE PRODUCT
  const handleRemove = async (productId) => {
    try {
      await fetch(`${API}/remove`, {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId,
          productId,
        }),
      });

      fetchCart();

    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 UPDATE QUANTITY
  const handleQuantityChange = async (
    productId,
    qty
  ) => {
    if (qty < 1) return;

    try {
      await fetch(`${API}/update`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId,
          productId,
          quantity: qty,
        }),
      });

      fetchCart();

    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 TOTAL PRICE
  const totalPrice = cart.reduce(
    (acc, item) =>
      acc +
      (item.productId?.price || 0) *
        item.quantity,
    0
  );

  // 🔹 CHECKOUT NAVIGATION
  const handleCheckout = () => {
    setButtonLoading(true);

    setTimeout(() => {
      navigate(`/checkoutpage/${userId}`);
    }, 1200);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100">

        {/* 🔹 PAGE LOADING */}
        {loading ? (
          <div className="min-h-screen flex items-center justify-center">

            <div className="flex flex-col items-center gap-4">

              <LoaderCircle
                size={45}
                className="animate-spin text-green-600"
              />

              <p className="text-gray-600 font-medium">
                Loading your cart...
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3 sm:p-6">

            <div className="max-w-5xl mx-auto">

              {/* 🔙 BACK BUTTON */}
              <div className="mb-4">

                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl shadow-sm hover:bg-gray-100 transition"
                >
                  <ArrowLeft size={18} />

                  <span className="text-sm font-medium">
                    Back
                  </span>
                </button>
              </div>

              {/* 🔹 TITLE */}
              <div className="flex items-center gap-3 mb-6">

                <div className="bg-green-100 p-3 rounded-2xl">
                  <ShoppingCart className="text-green-600" />
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    Your Cart
                  </h1>

                  <p className="text-gray-500 text-sm sm:text-base">
                    Review your selected products
                  </p>
                </div>
              </div>

              {/* 🔹 EMPTY CART */}
              {cart.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-sm p-10 text-center">

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                    alt="empty-cart"
                    className="w-28 mx-auto mb-5 opacity-80"
                  />

                  <h2 className="text-xl font-bold mb-2">
                    Your cart is empty
                  </h2>

                  <p className="text-gray-500 mb-6">
                    Add products to continue shopping
                  </p>

                  <button
                    onClick={() => navigate("/")}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* 🔹 CART PRODUCTS */}
                  <div className="space-y-4">

                    {cart.map((item) => {
                      if (!item.productId)
                        return null;

                      return (
                        <div
                          key={
                            item.productId._id
                          }
                          className="bg-white p-3 sm:p-5 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row justify-between gap-4"
                        >
                          {/* PRODUCT */}
                          <div className="flex gap-4">

                            <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">

                              <img
                                src={
                                  item.productId
                                    .image
                                }
                                alt={
                                  item.productId
                                    .name
                                }
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex flex-col justify-center">

                              <h2 className="font-semibold text-sm sm:text-lg line-clamp-2">
                                {
                                  item.productId
                                    .name
                                }
                              </h2>

                              <p className="text-green-600 font-bold mt-1">
                                ₹
                                {
                                  item.productId
                                    .price
                                }
                              </p>

                              <p className="text-gray-500 text-sm mt-1">
                                Total : ₹
                                {item.quantity *
                                  item
                                    .productId
                                    .price}
                              </p>
                            </div>
                          </div>

                          {/* ACTIONS */}
                          <div className="flex items-center justify-between sm:flex-col sm:justify-center gap-4">

                            {/* QUANTITY */}
                            <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-2xl">

                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item
                                      .productId
                                      ._id,
                                    item.quantity -
                                      1
                                  )
                                }
                                className="text-lg font-bold hover:text-red-500 transition"
                              >
                                −
                              </button>

                              <span className="font-semibold min-w-[20px] text-center">
                                {
                                  item.quantity
                                }
                              </span>

                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item
                                      .productId
                                      ._id,
                                    item.quantity +
                                      1
                                  )
                                }
                                className="text-lg font-bold hover:text-green-600 transition"
                              >
                                +
                              </button>
                            </div>

                            {/* REMOVE */}
                            <button
                              onClick={() =>
                                handleRemove(
                                  item.productId
                                    ._id
                                )
                              }
                              className="text-red-500 hover:text-red-600 font-medium text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 🔹 TOTAL SECTION */}
                  <div className="fixed bottom-0 left-0 right-0 sm:static bg-white border-t sm:border-none shadow-lg sm:shadow-none sm:bg-transparent">

                    <div className="max-w-5xl mx-auto p-4 sm:p-0 sm:mt-6">

                      <div className="bg-white rounded-3xl shadow-sm p-5 flex items-center justify-between">

                        <div>
                          <p className="text-gray-500 text-sm">
                            Total Amount
                          </p>

                          <h2 className="text-2xl font-bold text-green-600">
                            ₹{totalPrice}
                          </h2>
                        </div>

                        <button
                          onClick={
                            handleCheckout
                          }
                          disabled={
                            buttonLoading
                          }
                          className={`px-5 sm:px-7 py-3 rounded-2xl text-white font-semibold transition-all duration-300 flex items-center gap-2 ${
                            buttonLoading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {buttonLoading ? (
                            <>
                              <LoaderCircle className="animate-spin" />

                              Loading...
                            </>
                          ) : (
                            "Place Order"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}