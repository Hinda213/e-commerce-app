import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product) {
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

    function removeFromCart(product) {
        setCartItems(prev => prev.filter(item => item.id !== product.id))
    }

    function clearCart(){
        setCartItems([]);
    }

    function increaseQuantity(product) {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }

    function decreaseQuantity(product) {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === product.id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
    {children}
    </CartContext.Provider>
    );
}