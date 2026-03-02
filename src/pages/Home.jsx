import ProductCard from "../components/ProductCard";
import products from "../data/products";
import { useSearchParams } from "react-router-dom";
import NotFound from "./NotFound";

function Home({ setCartItems }) {
const [searchParams] = useSearchParams();
const category = searchParams.get("category");
const searchQuery = (searchParams.get("search") ?? "").toLowerCase().trim();

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
  

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }

  const handleRemoveFromCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItems.filter(item => item.id !== product.id);
      }
    });
  };
  

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
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
