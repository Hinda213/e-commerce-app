import ProductCard from "../components/ProductCard";

function Home({ setCartItems }) {


  const products = [
    {
      id: 1,
      title: "Laptop",
      price: 800,
      image: "/laptop.png",
        category: "Electronics"
    },
    {
      id: 2,
      title: "Phone",
      price: 500,
      image: "/phone.png",
      category: "Electronics"
    },
    {
      id: 3,
      title: "Headphones",
      price: 150,
      image: "/headphone.png",
      category: "Electronics"
    },
    {
        id: 4,
        title: "Earphones",
        price: 100,
        image: "/earphone.png",
        category: "Electronics"
    },
    {
        id: 5,
        title: "Smartwatch",
        price: 200,
        image: "/smartwatch.png",
        category: "Electronics"
    },
    {
        id: 6,
        title: "tablet",
        price: 250,
        image: "/tablet.png",
        category: "Electronics"
    },
    {
        id: 7,
        title: "tv",
        price: 650,
        image: "/tv.png",
        category: "Electronics"
    },
   
 

  ];


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
  

  return (
    <div>
      <h1 className="text-4xl font-bold mt-4 mb-5 text-gray-900 dark:text-white">Our Products 🛍️</h1>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 text-gray-700 dark:text-gray-300">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            image={product}
            category={product}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
