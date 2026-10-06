import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { productApi } from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    productApi
      .getAll()
      .then((response) => {
        const data = response.data;
         setProducts(data.data || []);
      })
      .catch((err) => {
        console.error(err);
        setError(
          err.response?.data?.message ||
            "Unable to load products. Check that your backend is running."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Shop</p>
        <h1 className="mt-2 text-4xl font-black">All products</h1>
      </div>

      {loading && <p className="text-slate-500">Loading products...</p>}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <h2 className="text-xl font-bold">No products yet</h2>
          <p className="mt-2 text-slate-500">
            Open the Admin page and create your first product.
          </p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product._id || product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}