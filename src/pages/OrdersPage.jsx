import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Package,
  ArrowLeft,
  LoaderCircle,
  ShoppingBag,
  Truck,
  CircleCheckBig,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { BackendAPI } from "../api/api";

import { Loginstateprovider } from "../Contex_API/LoginState";

export default function OrdersPage() {
  const navigate = useNavigate();

  const { userId } = useContext(Loginstateprovider);

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH ORDERS
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${BackendAPI}/orders/user/${userId}`
        );

        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  // STATUS COLOR
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-50";

      case "Shipped":
        return "text-blue-600 bg-blue-50";

      case "Pending":
        return "text-orange-600 bg-orange-50";

      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50">

        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-8">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-all duration-300 mb-5"
          >
            <ArrowLeft size={18} />

            <span className="font-medium text-sm sm:text-base">
              Back
            </span>
          </button>

          {/* TITLE */}
          <div className="mb-8">

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              My Orders
            </h1>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Track and manage all your orders
            </p>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="flex justify-center items-center py-20">

              <LoaderCircle
                className="animate-spin text-green-600"
                size={40}
              />
            </div>
          ) : orders.length === 0 ? (

            /* EMPTY ORDERS */
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center">

              <div className="flex justify-center mb-4">

                <ShoppingBag
                  size={70}
                  className="text-gray-300"
                />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                No Orders Found
              </h2>

              <p className="text-gray-500 mt-2">
                You haven't placed any orders yet
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (

            /* ORDERS LIST */
            <div className="space-y-6">

              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
                >

                  {/* ORDER TOP */}
                  <div className="border-b border-gray-100 p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                      <p className="text-sm text-gray-500">
                        Order ID
                      </p>

                      <h2 className="font-semibold text-sm sm:text-base break-all">
                        {order._id}
                      </h2>
                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Ordered On
                      </p>

                      <h2 className="font-medium text-sm sm:text-base">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </h2>
                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Payment
                      </p>

                      <h2 className="font-medium text-sm sm:text-base">
                        {order.paymentMethod}
                      </h2>
                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Total
                      </p>

                      <h2 className="font-bold text-lg text-green-600">
                        ₹
                        {
                          order.billDetails
                            ?.totalAmount
                        }
                      </h2>
                    </div>

                    <div
                      className={`px-4 py-2 rounded-full text-sm font-semibold w-fit ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </div>
                  </div>

                  {/* PRODUCTS */}
                  <div className="p-4 sm:p-6 space-y-5">

                    {order.products.map((item) => (
                      <div
                        key={item._id}
                        className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-b border-gray-100 pb-5"
                      >

                        {/* LEFT */}
                        <div className="flex gap-4">

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border"
                          />

                          <div>

                            <h3 className="font-semibold text-sm sm:text-lg line-clamp-2">
                              {item.name}
                            </h3>

                            <p className="text-gray-500 text-sm mt-1">
                              Quantity : {item.quantity}
                            </p>

                            <p className="text-green-600 font-bold mt-2">
                              ₹{item.price}
                            </p>
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-row sm:flex-col gap-3 sm:items-end justify-between">

                          <div className="flex items-center gap-2 text-sm text-gray-600">

                            <Package size={16} />

                            <span>
                              {order.orderStatus}
                            </span>
                          </div>

                          <div className="font-bold text-base sm:text-lg">
                            ₹{item.totalPrice}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* DELIVERY DETAILS */}
                  <div className="bg-gray-50 px-4 sm:px-6 py-5">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      {/* ADDRESS */}
                      <div>

                        <h3 className="font-semibold text-gray-800 mb-2">
                          Delivery Address
                        </h3>

                        <p className="text-sm text-gray-600 leading-6">
                          {
                            order.customerDetails
                              ?.fullName
                          }
                          <br />

                          {
                            order.customerDetails
                              ?.address
                          }
                          ,
                          {
                            order.customerDetails
                              ?.city
                          }
                          ,
                          {
                            order.customerDetails
                              ?.state
                          }{" "}
                          -{" "}
                          {
                            order.customerDetails
                              ?.pincode
                          }

                          <br />

                          Phone :{" "}
                          {
                            order.customerDetails
                              ?.mobile
                          }
                        </p>
                      </div>

                      {/* ORDER STATUS */}
                      <div className="flex flex-col gap-3">

                        <div className="flex items-center gap-3">

                          <CircleCheckBig
                            className="text-green-600"
                            size={20}
                          />

                          <span className="text-sm sm:text-base">
                            Order Confirmed
                          </span>
                        </div>

                        <div className="flex items-center gap-3">

                          <Truck
                            className="text-blue-600"
                            size={20}
                          />

                          <span className="text-sm sm:text-base">
                            Delivery Status :{" "}
                            {order.orderStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}