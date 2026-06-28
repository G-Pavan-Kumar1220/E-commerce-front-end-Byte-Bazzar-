import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been sent successfully.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-12 px-5">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700">
            Contact Us
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question,
            feedback, or need assistance, feel free to contact us.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Information */}
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Get in Touch
            </h2>

            <div className="space-y-8">

              <div>
                <h3 className="text-lg font-semibold text-indigo-600">
                  📍 Address
                </h3>

                <p className="text-gray-600 mt-2">
                  123 Shopping Street,
                  <br />
                  Hyderabad,
                  Telangana,
                  <br />
                  India - 500001
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-indigo-600">
                  📞 Phone
                </h3>

                <p className="text-gray-600 mt-2">
                  +91 98765 43210
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-indigo-600">
                  ✉ Email
                </h3>

                <p className="text-gray-600 mt-2">
                  support@shopkart.com
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-indigo-600">
                  🕒 Working Hours
                </h3>

                <p className="text-gray-600 mt-2">
                  Monday - Saturday
                </p>

                <p className="text-gray-600">
                  9:00 AM - 8:00 PM
                </p>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Send a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="text"
                name="subject"
                required
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <textarea
                rows="6"
                name="message"
                required
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-5 py-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {/* Send Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                Send Message
              </button>

              {/* Go Home Button */}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full mt-3 border-2 border-indigo-600 text-indigo-600 font-semibold py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:shadow-lg"
              >
                ← Go to Home
              </button>

            </form>

          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>
            © 2026 ShopKart. All Rights Reserved.
          </p>
        </div>

      </div>
    </div>
  );
}