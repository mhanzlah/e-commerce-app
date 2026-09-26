import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
}) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close cart"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <div>
            <h2 className="font-semibold">Your Cart</h2>

            <p className="mt-0.5 text-sm text-neutral-500">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="rounded-full p-2 transition hover:bg-neutral-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart content */}
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 rounded-full bg-neutral-100 p-4">
              <ShoppingBag size={28} className="text-neutral-500" />
            </div>

            <h3 className="font-medium">Your cart is empty</h3>

            <p className="mt-2 text-sm text-neutral-500">
              Add some products and they will appear here.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-3">
                        <div>
                          <h3 className="truncate text-sm font-medium">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-xs text-neutral-500">
                            {item.category === "2-piece"
                              ? "2 Piece"
                              : "3 Piece"}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item._id)}
                          aria-label={`Remove ${item.name}`}
                          className="shrink-0 text-neutral-400 transition hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="mt-2 text-sm font-medium">
                        Rs. {item.price.toLocaleString()}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-neutral-200">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-neutral-50"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="min-w-8 text-center text-sm">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-neutral-50"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <p className="text-sm font-medium">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-200 bg-white px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">Subtotal</span>

                <span className="text-lg font-semibold">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>

              <p className="mt-2 text-xs text-neutral-500">
                Shipping and taxes calculated at checkout.
              </p>

              <button
                type="button"
                className="mt-5 w-full rounded-lg bg-black px-5 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Proceed to checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
