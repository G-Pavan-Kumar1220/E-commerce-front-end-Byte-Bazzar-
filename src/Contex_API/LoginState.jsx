import {
  createContext,
  useState,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";

export const Loginstateprovider = createContext();

export default function LoginState({ children }) {
  const [login, setLogin] = useState(false);

  const [username, setUsername] = useState("Login/Sign up");

  const [userId, setUserId] = useState(null);

  const [cartCount, setCartCount] = useState(0);

  const [productCategory, setProductCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem("tokens");
      const storedUserName = localStorage.getItem("userName");
      const storedUserId = localStorage.getItem("userId");

      if (token && storedUserId) {
        setLogin(true);
        setUserId(storedUserId);
      }

      if (storedUserName) {
        setUsername(storedUserName);
      }
    } catch (error) {
      console.log("LOCAL STORAGE ERROR:", error);
    }
  }, []);

  useEffect(() => {
    try {
      const token = localStorage.getItem("tokens");

      if (!token) return;

      if (!token.includes(".")) {
        throw new Error("Invalid token format");
      }

      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("tokens");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");

        setLogin(false);
        setUsername("Login/Sign up");
        setUserId(null);
        setCartCount(0);

        navigate("/login");
      }
    } catch (error) {
      console.log("TOKEN VALIDATION ERROR:", error);

      localStorage.removeItem("tokens");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");

      setLogin(false);
      setUsername("Login/Sign up");
      setUserId(null);
      setCartCount(0);

      navigate("/login");
    }
  }, [navigate]);

  return (
    <Loginstateprovider.Provider
      value={{
        login,
        setLogin,

        username,
        setUsername,

        userId,
        setUserId,

        cartCount,
        setCartCount,

        productCategory,
        setProductCategory,
      }}
    >
      {children}
    </Loginstateprovider.Provider>
  );
}