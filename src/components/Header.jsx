import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  Heart,
  LogOut,
  Settings,
  ShoppingBag,
  ChevronDown,
  ArrowLeft
} from "lucide-react";
import { Loginstateprovider } from "../Contex_API/LoginState";

export default function Header() {
  const { cartCount, username, login, setLogin, setUsername, setUserId } = useContext(Loginstateprovider);
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchInputRef, setSearchInputRef] = useState(null);
  
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target) && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef) {
      setTimeout(() => searchInputRef.focus(), 100);
    }
  }, [isSearchOpen, searchInputRef]);

  const handleLogout = () => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    setLogin(false);
    setUsername("Login/Sign up");
    setUserId(null);
    setIsUserMenuOpen(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const userIdFromStorage = localStorage.getItem("userId");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Deals", path: "/deals" },
    { name: "Contact", path: "/contact-us" },
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-2" : "bg-white shadow-md py-3"
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Left section - Logo and Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile menu button */}
             

           
              <Link 
                to="/" 
                className="flex items-center gap-1 sm:gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-xl sm:text-2xl font-bold text-indigo-600">
                  Byte<span className="text-black">Bazar</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links - Hidden on mobile */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group text-sm xl:text-base"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-1 max-w-xs lg:max-w-md">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </form>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              

              {/* Cart Icon */}
              <Link 
                to={`/cart/${userIdFromStorage || ""}`} 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingCart size={20} className="text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                {login ? (
                  <>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-1 sm:gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                      aria-label="User menu"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs sm:text-sm font-medium">
                          {username?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      </div>
                      <ChevronDown size={14} className={`text-gray-500 transition-transform hidden sm:block ${isUserMenuOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                        <div className="p-3 border-b border-gray-100">
                          <p className="font-semibold text-gray-900 text-sm truncate max-w-45">{username}</p>
                          <p className="text-xs text-gray-500 mt-1">Member since 2024</p>
                        </div>
                        <div className="py-1">
                          <Link
                            to={`/user/${userIdFromStorage}`}
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-sm"
                          >
                            <User size={16} className="text-gray-500" />
                            <span>My Account</span>
                          </Link>
                          <Link
                            to={`/orders/${userIdFromStorage}`}
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-sm"
                          >
                            <ShoppingBag size={16} className="text-gray-500" />
                            <span>My Orders</span>
                          </Link>
                         
                          <hr className="my-1" />
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-50 transition-colors text-red-600 text-sm"
                          >
                            <LogOut size={16} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-sm"
                  >
                    <User size={16} />
                    <span className="text-xs sm:text-sm font-medium hidden xs:inline">Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Modal - Full screen on mobile */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-60 bg-white lg:hidden">
          <div className="p-3 border-b border-gray-100">
            <form onSubmit={handleSearch} className="relative">
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <ArrowLeft size={20} />
              </button>
              <input
                ref={(el) => setSearchInputRef(el)}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-12 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <X size={20} />
                </button>
              )}
            </form>
          </div>
          
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Recent Searches</h3>
            <div className="space-y-2">
              {["Laptop", "Smartphone", "Headphones"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setSearchQuery(item);
                    handleSearch(new Event("submit"));
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
                >
                  <Search size={16} className="inline mr-3 text-gray-400" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-55 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div 
            ref={mobileMenuRef}
            className="absolute top-0 left-0 bottom-0 w-72 bg-white shadow-2xl"
            style={{ animation: "slideRight 0.3s ease-out" }}
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-indigo-600">Byte<span className="text-black">Bazar</span></span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <nav className="p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-gray-700 hover:text-indigo-600 font-medium border-b border-gray-100"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideRight {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}