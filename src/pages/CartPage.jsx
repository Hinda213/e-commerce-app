function CartPage({ cartItems, setCartItems }) {

  const handleIncrease = (product) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }
  
 const handleDecrease = (product) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === product.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );


  return (
    <div className="p-6 bg-amber-50 dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Your Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-600 pb-2"
            >
              <img className="w-10" src={item.image} alt={item.title} />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  ${item.price} × {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrease(item)}
                  className="border-2 border-gray-300 dark:border-gray-500 rounded-lg px-3 py-1 hover:border-red-300 dark:hover:border-red-500 transition duration-300"
                >
                  ➖
                </button>
                <span>{item.quantity}</span>

                <button
                  onClick={() => handleIncrease(item)}
                  className="border-2 border-gray-300 dark:border-gray-500 rounded-lg px-3 py-1 hover:border-green-300 dark:hover:border-green-500 transition duration-300"
                >
                  ➕
                </button>
                <button
                  onClick={() => setCartItems([])}
                  className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm py-2 px-3 rounded-md font-medium transition duration-300"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-4">Total: ${totalPrice.toFixed(2)}</h2>
        </>
      )}
    </div>
  );
}

export default CartPage;
