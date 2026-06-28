import React, { useState, useContext } from "react";
import { Loginstateprovider } from "../Contex_API/LoginState";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    setLogin,
    setUsername,
    setUserId,
  } = useContext(Loginstateprovider);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const dataClean = () => {
    setForm({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.email ||
      !form.password ||
      (!isLogin && !form.name)
    ) {
      alert("Please fill all fields correctly");
      return;
    }

    try {
      setLoading(true);

      const endpoint = isLogin ? "login" : "registration";

      const payload = isLogin
        ? {
            email: form.email,
            password: form.password,
          }
        : {
            name: form.name,
            email: form.email,
            password: form.password,
          };

      const response = await fetch(
        `http://localhost:4000/api/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem("tokens", data.tokens);
          localStorage.setItem("userName", data.user.name);
          localStorage.setItem("userId", data.user._id);

          setUsername(data.user.name);
          setUserId(data.user._id);
          setLogin(true);

          alert(data.message || "Login Successful");
          navigate("/");
        } else {
          alert(data.message || "Registration Successful! Please Login.");
          dataClean();
          setIsLogin(true);
          return;
        }
      } else {
        alert(data.message || "Something went wrong");
      }

      dataClean();
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 transition-all duration-300 hover:shadow-indigo-400/30">

        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-indigo-100 flex items-center justify-center text-3xl">
            {isLogin ? "" : ""}
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-800">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="text-gray-500 mt-2">
            {isLogin
              ? "Login to continue shopping."
              : "Create your account to get started."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter your full name"
                className="mt-1 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-600">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter your email"
              className="mt-1 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter your password"
              className="mt-1 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-xl font-semibold transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] text-white"
            }`}
          >
            {loading ? (
              <div className="flex justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              isLogin ? "Login" : "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-600">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>

          <button
            onClick={() => {
              if (!loading) {
                dataClean();
                setIsLogin(!isLogin);
              }
            }}
            className="ml-2 text-indigo-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>

        <div className="relative my-8">
          <div className="border-t"></div>
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-gray-400 text-sm">
            OR
          </span>
        </div>

        <button
          onClick={() => navigate("/")}
          disabled={loading}
          className="w-full h-12 rounded-xl border-2 border-indigo-600 text-indigo-600 font-semibold flex items-center justify-center gap-2 hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:scale-[1.02]"
        >
          <Home size={20} />
          Continue as Guest
        </button>

      </div>
    </div>
  );
}