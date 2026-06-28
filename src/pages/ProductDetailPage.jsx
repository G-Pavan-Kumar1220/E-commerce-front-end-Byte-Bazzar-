import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  ShoppingCart,
  Check,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { BackendAPI } from "../api/api";
import { Loginstateprovider } from "../Contex_API/LoginState";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryNavbar from "../components/Nav";

export default function ProductDetailPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    productCategory,
    userId,
    setCartCount,
  } = useContext(Loginstateprovider);

  const [mainProduct, setMainProduct] =
    useState({});

  const [relatedProducts, setRelatedProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [relatedLoading, setRelatedLoading] =
    useState(true);

  const [addedItems, setAddedItems] =
    useState([]);

  const [selectedSize, setSelectedSize] =
    useState(null);

  const [addingCart, setAddingCart] =
    useState(false);

  const sizes = ["S", "M", "L", "XL"];

  // ===========================
  // FETCH CART COUNT
  // ===========================
  const fetchCartCount = async () => {
    try {
      const response = await fetch(
        `${BackendAPI}/cart/count/${userId}`
      );

      const data = await response.json();

      if (data.success) {
        setCartCount(data.cartCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // ADD TO CART
  // ===========================
  const addToCart = async (productId) => {
    try {
      if (!userId) {
        navigate("/login");
        return;
      }

      if (!selectedSize) {
        alert("Please select a size");
        return;
      }

      setAddingCart(true);

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
            size: selectedSize,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to add product"
        );
      }

      setAddedItems((prev) =>
        prev.includes(productId)
          ? prev
          : [...prev, productId]
      );

      fetchCartCount();
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setAddingCart(false);
    }
  };

  // ===========================
  // BUY NOW
  // Adds product to cart and
  // redirects to checkout page
  // ===========================
  const buyNow = async () => {
    try {
      if (!userId) {
        navigate("/login");
        return;
      }

      if (!selectedSize) {
        alert("Please select a size");
        return;
      }

      setAddingCart(true);

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
            productId: mainProduct._id,
            size: selectedSize,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to process order"
        );
      }

      fetchCartCount();

      navigate(
        `/checkoutpage/${userId}`
      );
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setAddingCart(false);
    }
  };

    // ===========================
  // FETCH MAIN PRODUCT
  // ===========================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        const response = await fetch(
          `${BackendAPI}/products/${id}`
        );

        const data = await response.json();

        const product =
          data?.product ||
          data?.products ||
          data?.data ||
          data;

        setMainProduct(product || {});
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ===========================
  // FETCH RELATED PRODUCTS
  // ===========================
  useEffect(() => {
    if (!productCategory) return;

    const fetchRelatedProducts = async () => {
      try {
        setRelatedLoading(true);

        const response = await fetch(
          `${BackendAPI}/products?category=${productCategory}`
        );

        const data = await response.json();

        const products =
          data?.products ||
          data?.data ||
          data ||
          [];

        setRelatedProducts(
          Array.isArray(products)
            ? products.filter(
                (item) => item._id !== id
              )
            : []
        );
      } catch (error) {
        console.log(error);
        setRelatedProducts([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [productCategory, id]);

  // ===========================
  // LOADING SCREEN
  // ===========================
  if (loading) {
    return (
      <>
        <Header />

        <CategoryNavbar />

        <div className="min-h-screen bg-gray-50 p-4 md:p-8 animate-pulse">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-3xl shadow-sm">

            {/* Image Skeleton */}
            <div className="h-[500px] bg-gray-200 rounded-3xl"></div>

            {/* Details Skeleton */}
            <div className="space-y-5">

              <div className="h-8 w-3/4 bg-gray-200 rounded"></div>

              <div className="h-6 w-40 bg-gray-200 rounded"></div>

              <div className="h-4 w-32 bg-gray-200 rounded"></div>

              <div className="flex gap-3">
                {[1,2,3,4].map((item)=>(
                  <div
                    key={item}
                    className="w-12 h-12 rounded-lg bg-gray-200"
                  ></div>
                ))}
              </div>

              <div className="flex gap-4">

                <div className="h-12 w-44 rounded-xl bg-gray-300"></div>

                <div className="h-12 w-44 rounded-xl bg-gray-300"></div>

              </div>

            </div>

          </div>

          {/* Related Products Skeleton */}

          <div className="mt-12">

            <div className="h-8 w-56 bg-gray-200 rounded mb-6"></div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">

              {[1,2,3,4].map((item)=>(
                <div
                  key={item}
                  className="bg-white rounded-2xl p-3 shadow-sm"
                >

                  <div className="h-40 bg-gray-200 rounded-xl"></div>

                  <div className="h-4 bg-gray-200 rounded mt-4"></div>

                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>

                  <div className="h-10 bg-gray-200 rounded-xl mt-4"></div>

                </div>
              ))}

            </div>

          </div>

        </div>

        <Footer />

      </>
    );
  }

  // ===========================
  // MAIN PAGE
  // ===========================

  return (
    <>
      <Header />

      <CategoryNavbar />

      <div className="min-h-screen bg-gray-50 p-4 md:p-8">

        {/* Product Section */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-sm p-6 md:p-8">

        </div>
                {/* PRODUCT IMAGE */}
        <div className="relative bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center h-[500px]">

          {/* Background Blur */}
          <img
            src={mainProduct?.image}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover blur-3xl scale-110 opacity-40"
          />

          {/* Main Image */}
          <img
            src={mainProduct?.image}
            alt={mainProduct?.name}
            className="relative z-10 max-h-full max-w-full object-contain hover:scale-105 transition duration-500"
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="flex flex-col justify-center">

          {/* Product Name */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {mainProduct?.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">

            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
              <Star
                size={15}
                fill="currentColor"
              />
              4.8
            </div>

            <span className="text-gray-500">
              2,450 Ratings
            </span>

          </div>

          {/* Price */}
          <div className="mt-5 flex items-center gap-3">

            <h2 className="text-4xl font-bold text-green-600">
              ₹{mainProduct?.price}
            </h2>

            <span className="text-xl text-gray-400 line-through">
              ₹{mainProduct?.price + 500}
            </span>

            <span className="text-green-600 font-semibold">
              40% OFF
            </span>

          </div>

          {/* Category */}
          <p className="mt-4 text-gray-600">
            Category :
            <span className="ml-2 font-semibold text-black">
              {mainProduct?.productCategory}
            </span>
          </p>

          {/* Description */}
          <div className="mt-6">

            <h3 className="font-semibold text-lg">
              Description
            </h3>

            <p className="mt-2 text-gray-600 leading-7">
              Premium quality product made with
              durable materials and modern styling.
              Comfortable for everyday wear and
              suitable for every occasion.
            </p>

          </div>

          {/* SIZE */}
          <div className="mt-8">

            <h3 className="font-semibold text-lg mb-3">
              Select Size
            </h3>

            <div className="flex gap-3 flex-wrap">

              {sizes.map((size) => (

                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(size)
                  }
                  className={`w-12 h-12 rounded-xl border font-semibold transition-all duration-300 ${
                    selectedSize === size
                      ? "bg-black text-white border-black scale-105"
                      : "bg-white border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>

              ))}

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex gap-4 flex-wrap mt-8">

            {/* ADD TO CART */}

            <button
              onClick={() => {
                if (
                  addedItems.includes(
                    mainProduct._id
                  )
                ) {
                  navigate(`/cart/${userId}`);
                } else {
                  addToCart(mainProduct._id);
                }
              }}
              disabled={addingCart}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition ${
                addedItems.includes(mainProduct._id)
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {addingCart ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                  Adding...
                </>
              ) : addedItems.includes(
                  mainProduct._id
                ) ? (
                <>
                  <Check size={18} />
                  Go To Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Add To Cart
                </>
              )}
            </button>

            {/* BUY NOW */}

            <button
              onClick={buyNow}
              disabled={addingCart}
              className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex items-center gap-2"
            >
              {addingCart ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                  Processing...
                </>
              ) : (
                "Buy Now"
              )}
            </button>

          </div>

          {/* FEATURES */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">

            <div className="bg-gray-100 rounded-2xl p-4 flex items-center gap-3">
              <Truck
                className="text-green-600"
                size={22}
              />

              <div>
                <h4 className="font-semibold">
                  Free Delivery
                </h4>

                <p className="text-sm text-gray-500">
                  On all orders
                </p>
              </div>

            </div>

            <div className="bg-gray-100 rounded-2xl p-4 flex items-center gap-3">

              <RotateCcw
                className="text-blue-600"
                size={22}
              />

              <div>
                <h4 className="font-semibold">
                  Easy Returns
                </h4>

                <p className="text-sm text-gray-500">
                  7 Days Return
                </p>
              </div>

            </div>

            <div className="bg-gray-100 rounded-2xl p-4 flex items-center gap-3">

              <ShieldCheck
                className="text-purple-600"
                size={22}
              />

              <div>
                <h4 className="font-semibold">
                  Secure Payment
                </h4>

                <p className="text-sm text-gray-500">
                  100% Protected
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
              {/* ===========================
            RELATED PRODUCTS
        ============================ */}

        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-8">
            Related Products
          </h2>

          {relatedLoading ? (

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-2xl p-4 shadow animate-pulse"
                >
                  <div className="h-44 bg-gray-200 rounded-xl"></div>

                  <div className="h-5 bg-gray-200 rounded mt-4"></div>

                  <div className="h-5 bg-gray-200 rounded w-1/2 mt-2"></div>

                  <div className="h-10 bg-gray-200 rounded-xl mt-5"></div>
                </div>
              ))}

            </div>

          ) : relatedProducts.length === 0 ? (

            <div className="text-center py-12 text-gray-500 text-lg">
              No Related Products Found
            </div>

          ) : (

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {relatedProducts.map((item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 overflow-hidden"
                >

                  <div
                    onClick={() =>
                      navigate(`/products/${item._id}`)
                    }
                    className="cursor-pointer p-4"
                  >

                    <div className="relative h-52 bg-gray-100 rounded-xl overflow-hidden">

                      <img
                        src={item.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-50"
                      />

                      <div className="relative z-10 flex justify-center items-center h-full">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full object-contain hover:scale-105 transition duration-300"
                        />

                      </div>

                    </div>

                    <h3 className="mt-4 font-semibold line-clamp-2">
                      {item.name}
                    </h3>

                    <div className="flex justify-between items-center mt-3">

                      <span className="text-green-600 text-lg font-bold">
                        ₹{item.price}
                      </span>

                      <span className="text-yellow-500 text-sm">
                        ★ 4.5
                      </span>

                    </div>

                  </div>

                  <div className="p-4 pt-0">

                    <button
                      onClick={() => {
                        if (
                          addedItems.includes(item._id)
                        ) {
                          navigate(`/cart/${userId}`);
                        } else {
                          addToCart(item._id);
                        }
                      }}
                      className={`w-full py-3 rounded-xl font-semibold transition ${
                        addedItems.includes(item._id)
                          ? "bg-blue-600 text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      {addedItems.includes(item._id)
                        ? "Go To Cart"
                        : "Add To Cart"}
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      

      <Footer />

    </>
  );
}