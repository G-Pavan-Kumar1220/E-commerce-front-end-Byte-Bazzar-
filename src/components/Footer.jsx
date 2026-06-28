import { Mail } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Byte<span className="text-emerald-400">Bazar</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Your one-stop shop for the latest tech, fashion, and essentials.
            Quality products, fast delivery, and trusted service.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-lg">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Shop</li>
            <li className="hover:text-white cursor-pointer">Categories</li>
            <li className="hover:text-white cursor-pointer">Deals</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">Order Tracking</li>
            <li className="hover:text-white cursor-pointer">Returns & Refunds</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* Legal + Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Shipping Policy</li>
            <li className="hover:text-white cursor-pointer">Cancellation Policy</li>
          </ul>

          {/* Newsletter */}
          <div className="mt-4">
            <h4 className="text-white text-sm mb-2">Subscribe</h4>
            <div className="flex border border-gray-700 rounded overflow-hidden">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 bg-gray-800 text-sm outline-none"
              />
              <button className="bg-emerald-500 px-3 flex items-center justify-center text-white">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center text-sm py-4 text-gray-400">
        © {new Date().getFullYear()} ByteBazar. All rights reserved.
      </div>
    </footer>
  );
}