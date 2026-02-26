import { useNavigate, useParams } from "react-router-dom";
import { products } from "../data/products";

export default function ProductDetails({ image }) {
  const { id } = useParams();
  console.log("Product ID:", id);
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  return (
    <div className="w-150  p-10 mx-auto  bg-amber-50 dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Product Details</h1>
     <h2>{product.title}</h2>
     <p>{product.price}</p>
     <img className="w-30" src={product.image} alt={product.title} />
      <p className="text-gray-600 dark:text-gray-400">
        Details for product ID: {id}
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
