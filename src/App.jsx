import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import image from "./assets/image.png";
import CartPage from "./pages/CartPage";
import { ThemeContext } from "./context/ThemeContext";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { theme } = useContext(ThemeContext);

  function ProtectedRoute({ children }) {
    const location = useLocation();
    const { isLoggedIn } = useContext(AuthContext);
    return isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} replace />;
  }

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
          <Navbar /> {/* No props needed */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* No props needed */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage /> {/* No props needed */}
                </ProtectedRoute>
              }
            />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
