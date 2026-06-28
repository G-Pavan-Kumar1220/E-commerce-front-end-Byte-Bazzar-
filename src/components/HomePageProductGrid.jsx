import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { BackendAPI } from "../api/api";

import { Loginstateprovider } from "../Contex_API/LoginState";

export default function HomePageProductGrid() {
  const navigate = useNavigate();

  const {
    userId,
    login,
    setCartCount,
    setProductCategory,
  } = useContext(Loginstateprovider);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${BackendAPI}/products/get`
        );

        const data = await response.json();

        if (isMounted) {
          setProducts(data.products || []);
        }
      } catch (error) {
        console.log("FETCH PRODUCTS ERROR:", error);
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
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        if (!userId) return;

        const response = await fetch(
          `${BackendAPI}/orders/count/${userId}`
        );

        const data = await response.json();

        if (data.success) {
          setCartCount(data.cartCount);
        }
      } catch (error) {
        console.log("CART COUNT ERROR:", error);
      }
    };

    fetchCartCount();
  }, [userId, setCartCount]);

  const addToCart = async (productId) => {
    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `${BackendAPI}/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            productId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to add to cart"
        );
      }

      setAddedItems((prev) =>
        prev.includes(productId)
          ? prev
          : [...prev, productId]
      );

      setCartCount((prev) => prev + 1);
    } catch (error) {
      console.log(
        "ADD TO CART ERROR:",
        error.message
      );
    }
  };

  const addedSet = new Set(addedItems);

            return (
  <div className="p-3 sm:p-5">
    <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 flex justify-center text-amber-600">
      Most Selling Products
    </h1>

    <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loading ? (
        Array(8)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 animate-pulse bg-white"
            >
              <div className="w-full h-40 bg-gray-300 rounded"></div>

              <div className="h-4 bg-gray-300 mt-3 rounded w-3/4"></div>

              <div className="h-4 bg-gray-300 mt-2 rounded w-1/2"></div>

              <div className="h-10 bg-gray-300 mt-4 rounded"></div>
            </div>
          ))
      ) : products.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
            alt="empty"
            className="w-28 sm:w-36 opacity-80"
          />

          <h2 className="text-xl sm:text-2xl font-bold mt-5 text-gray-700">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2 text-center">
            Products are currently unavailable
          </p>
        </div>
      ) : (
        products.map((product) => {
          const isAdded = addedSet.has(product._id);

          return (
            <div
              key={product._id}
              className="flex flex-col border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-3 bg-white overflow-hidden"
            >
              <div
                onClick={() => {
                  navigate(`/products/${product._id}`);
                  setProductCategory(product.productCategory);
                }}
                className="relative w-full h-44 rounded-xl overflow-hidden cursor-pointer group bg-gray-100"
              >
                <img
                  src={product.image}
                  alt="blur-bg"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-50"
                />

                <div className="relative z-10 flex items-center justify-center w-full h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col mt-3">
                <h2 className="font-semibold text-sm sm:text-base line-clamp-2 text-gray-800">
                  {product.name}
                </h2>

                <p className="text-green-600 font-bold text-lg mt-2">
                  ₹{product.price}
                </p>

                <div className="mt-auto pt-4">
                  <button
                    onClick={() => {
                      if (!userId) {
                        navigate("/login");
                        return;
                      }

                      if (isAdded) {
                        navigate(`/cart/${userId}`);
                      } else {
                        addToCart(product._id);
                      }
                    }}
                    className={`w-full py-2.5 rounded-xl text-white font-medium transition-all duration-300 ${
                      isAdded
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {isAdded ? "Go To Cart →" : "Add To Cart"}
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
);
}