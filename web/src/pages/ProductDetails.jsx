import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getProduct } from "../lib/api";

export default function ProductDetails({ addToCart, onOpenCart }) {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function load() {
      const data = await getProduct(slug);
      setProduct(data);
    }

    load();
  }, [slug]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black"
      >
        <ArrowLeft size={16} />
        Back to shop
      </Link>

      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <div className="aspect-3/4 overflow-hidden rounded-xl bg-neutral-100">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border ${
                  selectedImage === index
                    ? "border-black"
                    : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="py-4">
          <p className="mb-3 text-sm text-neutral-500">
            {product.category === "2-piece" ? "2 Piece" : "3 Piece"}
          </p>

          <h1 className="text-3xl font-semibold">{product.name}</h1>

          <p className="mt-4 text-xl">Rs. {product.price.toLocaleString()}</p>

          <p className="mt-6 leading-7 text-neutral-600">
            {product.description}
          </p>

          <button
            onClick={() => {
              addToCart(product);
              onOpenCart();
            }}
            className="mt-8 w-full rounded-lg bg-black px-6 py-4 font-medium text-white transition hover:bg-neutral-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}
