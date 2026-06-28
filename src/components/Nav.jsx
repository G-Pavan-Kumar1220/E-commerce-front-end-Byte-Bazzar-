import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Menu } from "lucide-react";

export default function CategoryNavbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const navigate = useNavigate();

  // CATEGORY CLICK
  const handleCategoryClick = (
    category
  ) => {
    if (category === "All") {
      navigate("/products");
    } else {
      navigate(
        `/products?category=${encodeURIComponent(
          category
        )}`
      );
    }

    setMenuOpen(false);
  };

  // CATEGORIES
  const categories = [
    {
      name: "All",
      value: "All",
    },

    {
      name: "Men-Shirts",
      value: "menshirts",
    },

    {
      name: "Men-Pants",
      value: "menpants",
    },

    {
      name: "Women-Shirts",
      value: "womenshirts",
    },

    {
      name: "Women-Pants",
      value: "womenpants",
    },

    {
      name: "Child-Shirts",
      value: "kidsshirt",
    },

    {
      name: "Child-Pants",
      value: "kidspants",
    },

    {
      name: "Kitchen-Items",
      value: "kitchen",
    },

    {
      name: "Toys",
      value: "toys",
    },
  ];

  return (
    <nav className="bg-[#1a2a48] text-white text-sm font-semibold">
      <div className="max-w-full flex items-center px-2 md:px-4 h-10">
        {/* MOBILE MENU BUTTON */}
        <button
          className="flex items-center justify-center w-10 h-10 hover:bg-[#0f1a2e] rounded-md md:hidden"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          <Menu size={20} />
        </button>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex space-x-3 whitespace-nowrap">
          {categories.map(
            ({ name, value }) => (
              <li
                key={value}
                onClick={() =>
                  handleCategoryClick(
                    value
                  )
                }
                className="cursor-pointer px-3 py-1 rounded-md hover:bg-[#0f1a2e] transition"
              >
                {name}
              </li>
            )
          )}
        </ul>

        {/* MOBILE SCROLL MENU */}
        <ul className="flex md:hidden space-x-3 overflow-x-auto no-scrollbar whitespace-nowrap px-1">
          {categories.map(
            ({ name, value }) => (
              <li
                key={value}
                onClick={() =>
                  handleCategoryClick(
                    value
                  )
                }
                className="cursor-pointer px-2 py-1 rounded-md hover:bg-[#0f1a2e]"
              >
                {name}
              </li>
            )
          )}
        </ul>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-[#14254c] px-4 py-2">
          <ul className="flex flex-col space-y-2">
            {categories.map(
              ({ name, value }) => (
                <li
                  key={value}
                  onClick={() =>
                    handleCategoryClick(
                      value
                    )
                  }
                  className="cursor-pointer px-2 py-1 rounded-md hover:bg-[#0f1a2e]"
                >
                  {name}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}