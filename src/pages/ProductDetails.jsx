import { useNavigate, useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useContext(CartContext);

  if (loading) {
    return (
      <p className="text-gray-600 dark:text-gray-400 p-10">Loading product details...</p>
    );
  }

  if (error) {
    return (
      <div className="w-150 p-10 mx-auto bg-amber-50 dark:bg-gray-800 rounded-lg shadow-md text-gray-900 dark:text-gray-100">
        <p className="text-red-500 dark:text-red-400">Error: {error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded-md"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-150 p-10 mx-auto bg-amber-50 dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 text-gray-900 dark:text-gray-100">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">
          The product with ID {id} does not exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm py-2 px-3 rounded-md font-medium transition duration-300"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-150 p-10 mx-auto bg-amber-50 dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Product Details</h1>
      <img className="w-48 h-48 object-contain mb-4" src={product.image} alt={product.title} />
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">${product.price}</p>
      {product.description && (
        <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
      )}
      <button
        onClick={() => addToCart(product)}
        className="mr-2 bg-yellow-400 hover:bg-yellow-500 text-black text-sm py-2 px-4 rounded-md font-medium"
      >
        Add to Cart
      </button>
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm py-2 px-3 rounded-md font-medium transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
}
