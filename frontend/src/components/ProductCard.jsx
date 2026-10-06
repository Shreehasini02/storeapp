import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const image =
    product.image ||
    product.imageUrl ||
    "https://placehold.co/600x450?text=Product";

  const name = product.name || product.title || "Unnamed product";
  const price = product.price ?? 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={image}
        alt={name}
        className="h-56 w-full object-cover"
        onError={(e) => {
          e.currentTarget.src = "https://placehold.co/600x450?text=Product";
        }}
      />

      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h2 className="line-clamp-2 text-lg font-bold">{name}</h2>
          <span className="shrink-0 font-bold text-blue-600">${Number(price).toFixed(2)}</span>
        </div>

        <p className="mb-5 line-clamp-2 text-sm text-slate-500">
          {product.description || "No description available."}
        </p>

        <Link
          to={`/products/${product._id || product.id}`}
          className="block rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          View product
        </Link>
      </div>
    </article>
  );
}