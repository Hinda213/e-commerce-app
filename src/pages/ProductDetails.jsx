import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products/" + id);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-gray-600 dark:text-gray-400">Loading product details...</p>;
  }


  if (!product || product.id === undefined) {
    return (
      <div className="w-150  p-10 mx-auto  bg-amber-50 dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 text-gray-900 dark:text-gray-100">
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
    <div className="w-150  p-10 mx-auto  bg-amber-50 dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Product Details</h1>
      <h2>{product.title}</h2>
      <img className="w-30" src={product.image} alt={product.title} />
      <p>{product.price}</p>
      <p className="text-gray-600 dark:text-gray-400">
        {product.description}
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
