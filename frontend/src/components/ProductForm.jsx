import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  image: "",
};

export default function ProductForm({ initialProduct, onSubmit, loading }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialProduct) {
      setForm({
        name: initialProduct.name || initialProduct.title || "",
        description: initialProduct.description || "",
        price: initialProduct.price ?? "",
        image: initialProduct.image || initialProduct.imageUrl || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      price: Number(form.price),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label className="mb-1 block text-sm font-semibold">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="Product name"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="Product description"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Price</label>
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="99.99"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Image URL</label>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="https://..."
        />
      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Saving..." : initialProduct ? "Update product" : "Create product"}
      </button>
    </form>
  );
}