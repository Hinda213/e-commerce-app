import { Navigate, useNavigate } from "react-router-dom";

export default function ProductCard({ product, handleAddToCart, handleRemoveFromCart }) {
  const { title, price, image, category } = product;
  const navigate = useNavigate();

 
  return (
    <div onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md 
                    p-4 w-full min-w-0 hover:shadow-md dark:hover:shadow-gray-900/50 transition duration-300"
    >
      {/* Image */}
      <div className="flex justify-center h-40 mb-3">
        <img src={image} alt={title} className="object-contain max-h-full" />
      </div>

      {/* Title */}
      <h2
        className="text-sm font-medium text-gray-800 dark:text-gray-200 
                     hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer line-clamp-2"
      >
        {title}
      </h2>

      {/* Category */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{category}</p>

      {/* Price */}
      <div className="mt-2">
        <span className="text-lg font-bold text-gray-900 dark:text-white">${price}</span>
      </div>

      {/* Add to Cart Button */}
      <button
        className="mt-3 w-full min-h-[44px] bg-yellow-400 hover:bg-yellow-500 
                         active:bg-yellow-600 text-black text-sm py-2 px-3 rounded-md font-medium 
                         transition duration-300 touch-manipulation"
        onClick={() => handleAddToCart(product)}
      >
        Add Cart
      </button>
      <button
        className="mt-2 w-full min-h-[44px] bg-red-400 hover:bg-red-500 
                         active:bg-red-600 text-white text-sm py-2 px-3 rounded-md font-medium 
                         transition duration-300 touch-manipulation"
        onClick={() => handleRemoveFromCart(product)}
      >
        Remove Cart
      </button>
    </div>
  );
}