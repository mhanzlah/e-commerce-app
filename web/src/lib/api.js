const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });

  const response = await fetch(
    `${API_URL}/api/products?${searchParams.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProduct(slug) {
  const response = await fetch(`${API_URL}/api/products/${slug}`);

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return response.json();
}
