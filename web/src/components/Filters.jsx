export default function Filters({
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
}) {
  return (
    <aside className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-semibold">Category</h3>

        <div className="space-y-3 text-sm">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="category"
              checked={category === ""}
              onChange={() => setCategory("")}
            />
            All
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="category"
              checked={category === "2-piece"}
              onChange={() => setCategory("2-piece")}
            />
            2 Piece
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="category"
              checked={category === "3-piece"}
              onChange={() => setCategory("3-piece")}
            />
            3 Piece
          </label>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold">Price</h3>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-black"
          />

          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-black"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold">Sort</h3>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none"
        >
          <option value="relevance">Relevance</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
        </select>
      </div>
    </aside>
  );
}
