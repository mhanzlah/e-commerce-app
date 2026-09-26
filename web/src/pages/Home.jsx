import { useEffect, useState } from "react";
import { Search, ShoppingBag } from "lucide-react";

import { getProducts } from "../lib/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

export default function Home({ cart, addToCart, onOpenCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("relevance");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const result = await getProducts({
          search,
          category,
          minPrice,
          maxPrice,
          sort,
        });

        setProducts(result.products);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError("Unable to load products.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProducts();

    return () => controller.abort();
  }, [search, category, minPrice, maxPrice, sort]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <h1 className="text-xl font-semibold">E-commerce Store</h1>

          <div className="relative hidden w-full max-w-md md:block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-black"
            />
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Open shopping cart"
            className="relative rounded-full p-2 transition hover:bg-neutral-100"
          >
            <ShoppingBag size={22} />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <p className="mb-3 text-sm text-neutral-500">New collection</p>

          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
            Clothing made for every occasion.
          </h2>

          <p className="mt-4 max-w-xl text-neutral-500">
            Explore our collection of carefully selected two-piece and
            three-piece outfits.
          </p>
        </div>

        <div className="mb-6 md:hidden">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-lg border border-neutral-200 py-3 pl-10 pr-4 text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <Filters
            category={category}
            setCategory={setCategory}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sort={sort}
            setSort={setSort}
          />

          <section>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-neutral-500">
                {products.length} products
              </p>
            </div>

            {loading && (
              <div className="py-20 text-center text-neutral-500">
                Loading products...
              </div>
            )}

            {error && (
              <div className="py-20 text-center text-red-600">{error}</div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="py-20 text-center">
                <h3 className="font-medium">No products found</h3>

                <p className="mt-2 text-sm text-neutral-500">
                  Try changing your filters or search.
                </p>
              </div>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
