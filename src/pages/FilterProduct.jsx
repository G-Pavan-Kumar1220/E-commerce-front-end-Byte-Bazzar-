import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { BackendAPI } from "../api/api";

import { Loginstateprovider } from "../Contex_API/LoginState";

import Header from "../components/Header";
import CategoryNavbar from "../components/Nav";
import Footer from "../components/Footer";

export default function FilterProduct() {
  const navigate = useNavigate();

  // GET CATEGORY FROM URL
  const [searchParams] =
    useSearchParams();

  const category =
    searchParams.get("category") ||
    "All";

  // CONTEXT
  const {
    userId,
    login,
    setCartCount,
    setProductCategory,
  } = useContext(Loginstateprovider);

  // STATES
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [addedItems, setAddedItems] =
    useState([]);

  // FETCH PRODUCTS
  useEffect(() => {
    let isMounted = true;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const fetchProducts =
      async () => {
        try {
          setLoading(true);

          let url = `${BackendAPI}/products/get`;

          // CATEGORY FILTER
          if (category !== "All") {
            url = `${BackendAPI}/products?category=${
              category
            }`;
          }

          const response = await fetch(
            url
          );

          const data =
            await response.json();

          if (isMounted) {
            setProducts(
              data.products || []
            );
          }
        } catch (error) {
          console.log(
            "FETCH PRODUCTS ERROR:",
            error
          );

          if (isMounted) {
            setProducts([]);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [category]);

  // FETCH CART COUNT
  useEffect(() => {
    const fetchCartCount =
      async () => {
        try {
          if (!userId) return;

          const response = await fetch(
            `${BackendAPI}/orders/count/${userId}`
          );

          const data =
            await response.json();

          if (data.success) {
            setCartCount(
              data.cartCount
            );
          }
        } catch (error) {
          console.log(
            "CART COUNT ERROR:",
            error
          );
        }
      };

    fetchCartCount();
  }, [userId, setCartCount]);

  // ADD TO CART
  const addToCart = async (
    productId
  ) => {
    try {
      if (!login) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${BackendAPI}/cart/add`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId,
            productId,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to add product"
        );
      }

      // UPDATE BUTTON
      setAddedItems((prev) =>
        prev.includes(productId)
          ? prev
          : [...prev, productId]
      );

      // UPDATE CART COUNT
      setCartCount(
        (prev) => prev + 1
      );
    } catch (error) {
      console.log(
        "ADD CART ERROR:",
        error
      );
    }
  };

  // FAST LOOKUP
  const addedSet = new Set(
    addedItems
  );

  return (
    <>
      <Header />

      <CategoryNavbar />

      <div className="min-h-screen bg-gray-50 px-3 sm:px-5 py-5">
        {/* TITLE */}
        <div className="mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 capitalize">
            {category} Products
          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Explore all available
            products
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map(
              (_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow p-3 animate-pulse"
                >
                  <div className="w-full h-40 bg-gray-300 rounded-xl"></div>

                  <div className="h-4 bg-gray-300 rounded mt-4 w-3/4"></div>

                  <div className="h-4 bg-gray-300 rounded mt-2 w-1/2"></div>

                  <div className="h-10 bg-gray-300 rounded mt-4"></div>
                </div>
              )
            )}
          </div>
        ) : products.length === 0 ? (
          // EMPTY PRODUCTS
          <div className="flex flex-col items-center justify-center py-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
              alt="empty"
              className="w-28 sm:w-36 opacity-80"
            />

            <h2 className="text-xl sm:text-2xl font-bold mt-5 text-gray-700">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2 text-center">
              No products available in
              this category
            </p>

            <button
              onClick={() =>
                navigate("/")
              }
              className="mt-5 px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Go Home
            </button>
          </div>
        ) : (
          // PRODUCTS GRID
          <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map(
              (product) => {
                const isAdded =
                  addedSet.has(
                    product._id
                  );

                return (
                  <div
                    key={product._id}
                    className="bg-white border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* IMAGE */}
                    <div
                      onClick={() => {
                        navigate(
                          `/products/${product._id}`
                        );

                        setProductCategory(
                          product.productCategory
                        );
                      }}
                      className="relative w-full h-44 overflow-hidden cursor-pointer group bg-gray-100"
                    >
                      {/* BLUR BG */}
                      <img
                        src={
                          product.image
                        }
                        alt="bg"
                        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-50"
                      />

                      {/* MAIN IMAGE */}
                      <div className="relative z-10 flex items-center justify-center w-full h-full">
                        <img
                          src={
                            product.image
                          }
                          alt={
                            product.name
                          }
                          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* DETAILS */}
                    <div className="flex flex-col flex-1 p-3">
                      <h2 className="font-semibold text-sm sm:text-base line-clamp-2 text-gray-800">
                        {product.name}
                      </h2>

                      <p className="text-green-600 font-bold text-lg mt-2">
                        ₹
                        {
                          product.price
                        }
                      </p>

                      {/* BUTTON */}
                      <button
                        onClick={() => {
                          if (
                            !login
                          ) {
                            navigate(
                              "/login"
                            );
                          } else if (
                            isAdded
                          ) {
                            navigate(
                              `/cart/${userId}`
                            );
                          } else {
                            addToCart(
                              product._id
                            );
                          }
                        }}
                        className={`mt-4 py-2.5 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
                          isAdded
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        }`}
                      >
                        {isAdded
                          ? "Go To Cart →"
                          : "Add To Cart"}
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}