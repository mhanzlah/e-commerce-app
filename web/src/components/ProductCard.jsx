import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="group">
      <Link to={`/products/${product.slug}`}>
        <div className="aspect-3/4 overflow-hidden rounded-xl bg-neutral-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="mt-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              to={`/products/${product.slug}`}
              className="font-medium hover:underline"
            >
              {product.name}
            </Link>

            <p className="mt-1 text-sm text-neutral-500">
              {product.category === "2-piece" ? "2 Piece" : "3 Piece"}
            </p>
          </div>

          <span className="font-medium">
            Rs. {product.price.toLocaleString()}
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          <ShoppingBag size={17} />
          Add to cart
        </button>
      </div>
    </article>
  );
}
