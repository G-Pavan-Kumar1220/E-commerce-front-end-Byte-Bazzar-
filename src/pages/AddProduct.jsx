import React, { useState } from "react";
import { BackendAPI } from "../api/api";

export default function AddProduct() {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    productCategory: "",
    description: "",
    price: "",
    image: "",
  });

  // CLEAR FORM
  const cleanData = () => {

    setFormData({
      name: "",
      productCategory: "",
      description: "",
      price: "",
      image: "",
    });
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        `${BackendAPI}/products/add`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {

        throw new Error(
          `HTTP error! Status: ${response.status}`
        );
      }

      alert("✅ Product Added Successfully");

      cleanData();

    } catch (error) {

      console.error(
        "Error adding product:",
        error
      );

      alert("❌ Failed To Add Product");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6">

        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Add Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* PRODUCT NAME */}
          <div>

            <label className="block mb-2 font-semibold">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* PRODUCT CATEGORY */}
          <div>

            <label className="block mb-3 font-semibold">
              Product Category
            </label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              {[
                "menpants",
                "womenpants",
                "menshirts",
                "womenshirts",
                "kidspants",
                "kidsshirts",
                "toys",
                "kitchen",
                "mobiles",
              ].map((category) => (

                <label
                  key={category}
                  className={`flex items-center gap-2 border rounded-lg p-3 cursor-pointer hover:bg-green-50 transition
                  ${
                    formData.productCategory === category
                      ? "border-green-500 bg-green-100"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="productCategory"
                    checked={
                      formData.productCategory === category
                    }
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        productCategory: category,
                      }))
                    }
                  />

                  <span className="capitalize">
                    {category}
                  </span>

                </label>
              ))}
            </div>

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter product description"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* PRICE */}
          <div>

            <label className="block mb-2 font-semibold">
              Price (₹)
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="999"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* IMAGE URL */}
          <div>

            <label className="block mb-2 font-semibold">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >

            {loading
              ? "Uploading..."
              : "Submit Product"}

          </button>

        </form>

      </div>

    </div>
  );
}