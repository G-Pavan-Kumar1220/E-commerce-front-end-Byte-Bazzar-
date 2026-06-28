import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  CreditCard,
  Landmark,
  Wallet,
  Smartphone,
  Truck,
  LoaderCircle,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { BackendAPI } from "../api/api";

import { Loginstateprovider } from "../Contex_API/LoginState";

import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const {
    userId,
    setCartCount,
  } = useContext(Loginstateprovider);

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [cartLoading, setCartLoading] =
    useState(true);

  const [cart, setCart] = useState([]);

  const [paymentMethod, setPaymentMethod] =
    useState("UPI");

  const [successAnimation, setSuccessAnimation] =
    useState(false);

  const [formData, setFormData] =
    useState({
      fullName: "",
      mobile: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

  // 🔹 SCROLL TOP
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // 🔹 FETCH CART
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setCartLoading(true);

        const response = await fetch(
          `${BackendAPI}/cart/${userId}`
        );

        const data = await response.json();

        setCart(data);

      } catch (error) {
        console.log(error);

      } finally {
        setCartLoading(false);

        setTimeout(() => {
          setPageLoading(false);
        }, 1000);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId]);

  // 🔹 HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    // MOBILE VALIDATION
    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;

      if (value.length > 10) return;
    }

    // PINCODE VALIDATION
    if (name === "pincode") {
      if (!/^\d*$/.test(value)) return;

      if (value.length > 6) return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 🔹 TOTALS
  const subtotal = cart.reduce(
    (acc, item) =>
      acc +
      (item.productId?.price || 0) *
        item.quantity,
    0
  );

  const discount = 200;

  const deliveryCharge = 0;

  const totalAmount =
    subtotal - discount + deliveryCharge;

  // 🔹 UPLOAD ORDER
  const uploadOrder = async (
    orderData
  ) => {
    try {
      const response = await fetch(
        `${BackendAPI}/orders/create`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            orderData
          ),
        }
      );

      return await response.json();

    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 PLACE ORDER
  const handlePlaceOrder = async (
    e
  ) => {
    e.preventDefault();

    // VALIDATION
    if (
      !formData.fullName.trim() ||
      !formData.mobile.trim() ||
      !formData.email.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.pincode.trim()
    ) {
      alert(
        "Please fill all required fields"
      );

      return;
    }

    // MOBILE
    if (
      formData.mobile.length !== 10
    ) {
      alert(
        "Mobile number must be 10 digits"
      );

      return;
    }

    // PINCODE
    if (
      formData.pincode.length !== 6
    ) {
      alert(
        "Pincode must be 6 digits"
      );

      return;
    }

    setLoading(true);

    const orderData = {
      userId,

      customerDetails: formData,

      paymentMethod,

      products: cart,

      billDetails: {
        subtotal,
        discount,
        deliveryCharge,
        totalAmount,
      },
    };

    try {
      const response =
        await uploadOrder(orderData);

      console.log(response);

      if (response.success) {
        // 🔹 SUCCESS ANIMATION
        setSuccessAnimation(true);

        // 🔹 CLEAR FORM
        setFormData({
          fullName: "",
          mobile: "",
          email: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
        });

        // 🔹 CLEAR CART
        setCart([]);

        // 🔹 RESET CART COUNT
        setCartCount(0);

        setPaymentMethod("UPI");

        // 🔹 NAVIGATE
        setTimeout(() => {
          navigate(
            "/ordersuccessfully-placed"
          );
        }, 2200);
      }

    } catch (error) {
      console.log(error);

      alert("Failed To Place Order");

    } finally {
      setLoading(false);
    }
  };

  // 🔹 PAYMENT OPTIONS
  const paymentOptions = [
    {
      id: "UPI",
      title: "UPI Payment",
      subtitle:
        "Google Pay, PhonePe, Paytm",
      icon: Smartphone,
      color: "text-green-600",
    },

    {
      id: "CARD",
      title: "Credit / Debit Card",
      subtitle:
        "Visa, MasterCard, RuPay",
      icon: CreditCard,
      color: "text-blue-600",
    },

    {
      id: "NET_BANKING",
      title: "Net Banking",
      subtitle:
        "All Indian Banks Supported",
      icon: Landmark,
      color: "text-purple-600",
    },

    {
      id: "WALLET",
      title: "Wallet",
      subtitle:
        "Amazon Pay, Paytm Wallet",
      icon: Wallet,
      color: "text-orange-500",
    },

    {
      id: "COD",
      title: "Cash On Delivery",
      subtitle:
        "Pay after delivery",
      icon: Truck,
      color: "text-red-500",
    },
  ];

  // 🔹 BUTTON DISABLE
  const isFormIncomplete =
    !formData.fullName ||
    !formData.mobile ||
    !formData.email ||
    !formData.address ||
    !formData.city ||
    !formData.state ||
    !formData.pincode;

  // 🔹 PAGE LOADER
  if (pageLoading) {
    return (
      <>
        <Header />

        <div className="min-h-screen flex items-center justify-center bg-gray-50">

          <div className="flex flex-col items-center gap-4">

            <LoaderCircle
              size={50}
              className="animate-spin text-green-600"
            />

            <h2 className="text-lg font-semibold text-gray-700">
              Loading Checkout...
            </h2>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  // 🔹 SUCCESS SCREEN
  if (successAnimation) {
    return (
      <>
        <Header />

        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center max-w-md w-full animate-pulse">

            <div className="flex justify-center mb-5">

              <div className="bg-green-100 p-5 rounded-full">

                <CheckCircle2
                  size={70}
                  className="text-green-600"
                />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Order Placed!
            </h1>

            <p className="text-gray-500 mt-3">
              Your order has been placed
              successfully.
            </p>

            <div className="mt-6 flex justify-center">

              <LoaderCircle className="animate-spin text-green-600" />
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50">

        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-8">

          {/* 🔹 BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-5 text-gray-600 hover:text-black transition-all duration-300"
          >
            <ArrowLeft size={18} />

            <span className="font-medium text-sm sm:text-base">
              Back
            </span>
          </button>

          {/* 🔹 TITLE */}
          <div className="mb-6">

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Checkout
            </h1>

            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Complete your order securely
            </p>
          </div>

          {/* 🔹 MAIN GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">

            {/* 🔹 LEFT */}
            <div className="xl:col-span-2 space-y-6">

              {/* ADDRESS */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">

                <h2 className="text-lg sm:text-xl font-semibold mb-5">
                  Delivery Address
                </h2>

                <form
                  onSubmit={
                    handlePlaceOrder
                  }
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={
                        formData.fullName
                      }
                      onChange={
                        handleChange
                      }
                      required
                      className="w-full border border-gray-200 rounded-2xl p-3.5 outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number"
                      value={
                        formData.mobile
                      }
                      onChange={
                        handleChange
                      }
                      maxLength={10}
                      required
                      className="w-full border border-gray-200 rounded-2xl p-3.5 outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      required
                      className="md:col-span-2 w-full border border-gray-200 rounded-2xl p-3.5 outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <textarea
                      name="address"
                      placeholder="House No, Street, Area"
                      value={
                        formData.address
                      }
                      onChange={
                        handleChange
                      }
                      rows={4}
                      required
                      className="md:col-span-2 w-full border border-gray-200 rounded-2xl p-3.5 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    />

                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={
                        formData.city
                      }
                      onChange={
                        handleChange
                      }
                      required
                      className="w-full border border-gray-200 rounded-2xl p-3.5 outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={
                        formData.state
                      }
                      onChange={
                        handleChange
                      }
                      required
                      className="w-full border border-gray-200 rounded-2xl p-3.5 outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={
                        formData.pincode
                      }
                      onChange={
                        handleChange
                      }
                      maxLength={6}
                      required
                      className="w-full border border-gray-200 rounded-2xl p-3.5 outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </form>
              </div>

              {/* 🔹 PAYMENT */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">

                <h2 className="text-lg sm:text-xl font-semibold mb-5">
                  Payment Method
                </h2>

                <div className="space-y-4">

                  {paymentOptions.map(
                    (item) => {
                      const Icon =
                        item.icon;

                      return (
                        <label
                          key={item.id}
                          className={`flex items-center gap-4 border rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                            paymentMethod ===
                            item.id
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            value={item.id}
                            checked={
                              paymentMethod ===
                              item.id
                            }
                            onChange={(
                              e
                            ) =>
                              setPaymentMethod(
                                e.target
                                  .value
                              )
                            }
                          />

                          <div className="bg-gray-100 p-3 rounded-xl">

                            <Icon
                              className={
                                item.color
                              }
                              size={22}
                            />
                          </div>

                          <div>
                            <h3 className="font-semibold">
                              {
                                item.title
                              }
                            </h3>

                            <p className="text-sm text-gray-500">
                              {
                                item.subtitle
                              }
                            </p>
                          </div>
                        </label>
                      );
                    }
                  )}
                </div>
              </div>
            </div>

            {/* 🔹 RIGHT */}
            <div className="xl:sticky xl:top-5 h-fit">

              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6">

                <h2 className="text-xl sm:text-2xl font-bold mb-6">
                  Order Summary
                </h2>

                {/* 🔹 CART LOADING */}
                {cartLoading ? (
                  <div className="space-y-4">

                    {[1, 2, 3].map(
                      (item) => (
                        <div
                          key={item}
                          className="flex gap-3 animate-pulse"
                        >
                          <div className="w-16 h-16 rounded-xl bg-gray-200"></div>

                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>

                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <>
                    {/* 🔹 PRODUCTS */}
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-1">

                      {cart.map(
                        (item) => (
                          <div
                            key={
                              item
                                .productId
                                ?._id
                            }
                            className="flex gap-3 border-b border-gray-100 pb-4"
                          >
                            <img
                              src={
                                item
                                  .productId
                                  ?.image
                              }
                              alt={
                                item
                                  .productId
                                  ?.name
                              }
                              className="w-16 h-16 object-cover rounded-xl"
                            />

                            <div className="flex-1">

                              <h3 className="font-semibold text-sm line-clamp-1">
                                {
                                  item
                                    .productId
                                    ?.name
                                }
                              </h3>

                              <p className="text-xs text-gray-500 mt-1">
                                Qty :
                                {
                                  item.quantity
                                }
                              </p>

                              <p className="text-green-600 font-bold mt-1">
                                ₹
                                {item
                                  .productId
                                  ?.price *
                                  item.quantity}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* 🔹 BILL DETAILS */}
                    <div className="mt-6 border-t border-gray-200 pt-5 space-y-4">

                      <div className="flex justify-between text-sm">

                        <span className="text-gray-600">
                          Subtotal
                        </span>

                        <span>
                          ₹{subtotal}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">

                        <span className="text-gray-600">
                          Discount
                        </span>

                        <span className="text-green-600">
                          - ₹
                          {
                            discount
                          }
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">

                        <span className="text-gray-600">
                          Delivery
                        </span>

                        <span className="text-green-600">
                          FREE
                        </span>
                      </div>

                      <div className="flex justify-between text-lg font-bold border-t pt-4">

                        <span>
                          Total
                        </span>

                        <span className="text-green-600">
                          ₹
                          {
                            totalAmount
                          }
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {/* 🔹 BUTTON */}
                <button
                  onClick={
                    handlePlaceOrder
                  }
                  disabled={
                    loading ||
                    isFormIncomplete ||
                    cart.length === 0
                  }
                  className={`w-full mt-6 flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 ${
                    loading ||
                    isFormIncomplete ||
                    cart.length === 0
                      ? "bg-gray-300 cursor-not-allowed text-gray-500"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" />

                      Processing...
                    </>
                  ) : (
                    `Place Order • ₹${totalAmount}`
                  )}
                </button>

                {/* 🔹 SECURITY */}
                <div className="flex items-center justify-center gap-2 mt-5 text-gray-500">

                  <ShieldCheck size={18} />

                  <p className="text-xs sm:text-sm">
                    100% Safe &
                    Secure Payments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}