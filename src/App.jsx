import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import image from "./assets/image.png"
import { useState } from "react";
import CartPage from "./pages/CartPage";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const[cartItems, setCartItems] = useState(() => {
  const saved = localStorage.getItem("cartItems");
  return saved ? JSON.parse(saved) : [];
  });
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme);
  }, [theme]);
  
  return (
    <div
      className="min-h-screen bg-cover bg-center relative bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>

      <div className="relative z-10">
        <BrowserRouter>
          <Navbar cartItems={cartItems} />
          <Routes>
            <Route path="/" element={<Home setCartItems={setCartItems} />} />
            <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
