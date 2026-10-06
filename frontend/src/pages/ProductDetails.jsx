import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productApi } from "../services/api";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    productApi
      .getById(id)
      .then((response) => setProduct(response.data.product || response.data))
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "Product not found.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-12">Loading...</div>;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-2xl bg-red-50 p-5 text-red-700">{error}</div>
      </div>
    );
  }

  const name = product.name || product.title || "Product";
  const image =
    product.image ||
    product.imageUrl ||
    "https://placehold.co/900x700?text=Product";

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link to="/products" className="text-sm font-semibold text-blue-600">
        ← Back to products
      </Link>

      <div className="mt-6 grid gap-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <img
          src={image}
          alt={name}
          className="aspect-square w-full rounded-2xl object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/900x700?text=Product";
          }}
        />

        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Product
          </p>
          <h1 className="mt-2 text-4xl font-black">{name}</h1>

          <p className="mt-5 text-3xl font-black text-blue-600">
            ${Number(product.price ?? 0).toFixed(2)}
          </p>

          <p className="mt-6 leading-7 text-slate-600">
            {product.description || "No description available."}
          </p>

          <button className="mt-8 rounded-xl bg-slate-900 px-6 py-3 font-bold text-white hover:bg-blue-600">
            Add to cart
          </button>
          <p className="mt-3 text-xs text-slate-400">
            Cart functionality can be added as the next learning step.
          </p>
        </div>
      </div>
    </section>
  );
}