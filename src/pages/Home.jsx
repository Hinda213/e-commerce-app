import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import NotFound from "./NotFound";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import useProducts from "../hooks/useProducts";
import ProductSkeleton from "../components/ProductSkeleton";


function Home() {
const [searchParams] = useSearchParams();
const categoryRaw = searchParams.get("category");
const category = categoryRaw && categoryRaw !== "undefined" ? categoryRaw : null;
const searchRaw = searchParams.get("search") ?? "";
const searchQuery = (searchRaw !== "undefined" ? searchRaw : "").toLowerCase().trim();
const { addToCart, removeFromCart} = useContext(CartContext);
const sort = searchParams.get("sort");


const { products, loading, error } = useProducts();

if (loading) {
  return(
    <div>
      <h1 className="text-4xl font-bold mt-4 mb-7 text-orange-300 dark:text-white">Our Products 🛍️</h1>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 text-gray-700 dark:text-gray-300">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

if (error) {
  return <p className="text-red-500 dark:text-red-400">Error: {error}</p>;
} 

let filteredProducts = category
  ? products.filter(
      (product) =>
        product.category?.toLowerCase() === category.toLowerCase()
    )
  : products;

if (searchQuery) {
  filteredProducts = filteredProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery) ||
      product.category?.toLowerCase().includes(searchQuery)
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

 
  let sortedProducts = [...filteredProducts];
  if (sort === "price_asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sort === "title") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div>
      
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 text-gray-700 dark:text-gray-300 mt-10">
        {sortedProducts.map((product) => (
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
