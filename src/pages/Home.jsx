import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import NotFound from "./NotFound";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import useProducts from "../hooks/useProducts";


function Home() {
const [searchParams] = useSearchParams();
const category = searchParams.get("category");
const searchQuery = (searchParams.get("search") ?? "").toLowerCase().trim();
const { addToCart, removeFromCart} = useContext(CartContext);


const { products, loading, error } = useProducts();

if (loading) {
  return <p className="text-gray-600 dark:text-gray-400">Loading products...</p>;
}

if (error) {
  return <p className="text-red-500 dark:text-red-400">Error: {error}</p>;
} 
// const [products, setProducts] = useState([]);
// const [loading, setLoading] = useState(true);

// useEffect(() => {
//   async function fetchProducts() {
//     try {
//       const response = await fetch("https://fakestoreapi.com/products");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   fetchProducts();
// }, []);
  
// if (loading) {
//   return <p className="text-gray-600 dark:text-gray-400">Loading products...</p>;
// }

let filteredProducts = category
  ? products.filter((product) => product.category === category)
  : products;

if (searchQuery) {
  filteredProducts = filteredProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery)
  );
}
  

  // Search returned no results — show NotFound with same look and code
  if (searchQuery && filteredProducts.length === 0) {
    return (
      <NotFound
        title="No products found"
        message={`No products match "${searchParams.get("search")}". Try a different search.`}
      />
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mt-4 mb-7 text-orange-300 dark:text-white">Our Products 🛍️</h1>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 text-gray-700 dark:text-gray-300">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            image={product.image}
            category={product.category}
            handleAddToCart={() => addToCart(product)}
            handleRemoveFromCart={() => removeFromCart(product)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
