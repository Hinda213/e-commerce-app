import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar({ cartItems }) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <nav className="flex justify-between items-center p-4 text-xl bg-gray-200 dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50">
      <img className="w-10 rounded-2xl " src="/logo-file.jpg" alt="Logo" />
      <h1 className="text-2xl tracking-wide font-bold text-gray-900 dark:text-white">My Store</h1>

      <Link
        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-sm py-2 px-3 rounded-md font-medium transition duration-300"
        to="/"
      >
        Home
      </Link>
      <button
        onClick={toggleTheme}
        className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-900 text-gray-800 dark:text-gray-200 text-sm py-2 px-3 rounded-md font-medium transition duration-300"
      >
        {theme ? "🌞" : "🌛"}
      </button>

      <Link
        to="/cart"
        className="relative bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-black text-sm py-2 px-3 rounded-md font-medium transition duration-300"
      >
        Cart 🛒{totalItems}
      </Link>
    </nav>
  );
}
