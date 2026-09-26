import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CartDrawer from "./components/CartDrawer";

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  /*
   * Persist cart whenever it changes.
   */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /*
   * Add product to cart.
   */
  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item._id === product._id);

      if (existing) {
        return current.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...current,
        {
          _id: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          category: product.category,
          images: product.images,
          quantity: 1,
        },
      ];
    });

    setIsCartOpen(true);
  }

  /*
   * Update quantity.
   */
  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((current) =>
      current.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  }

  /*
   * Remove product completely.
   */
  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item._id !== id));
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              addToCart={addToCart}
              onOpenCart={() => setIsCartOpen(true)}
            />
          }
        />

        <Route
          path="/products/:slug"
          element={<ProductDetails addToCart={addToCart} />}
        />
      </Routes>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </>
  );
}

export default App;
