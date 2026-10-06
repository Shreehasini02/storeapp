import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import { productApi } from "../services/api";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      const response = await productApi.getAll();
      const data = response.data;
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load products.");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const saveProduct = async (data) => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (editing) {
        await productApi.update(editing._id || editing.id, data);
        setMessage("Product updated successfully.");
      } else {
        await productApi.create(data);
        setMessage("Product created successfully.");
      }

      setEditing(null);
      await loadProducts();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Could not save product.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await productApi.remove(id);
      setMessage("Product deleted.");
      await loadProducts();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Could not delete product.");
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Admin</p>
        <h1 className="mt-2 text-4xl font-black">Product management</h1>
      </div>

      {message && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        <div>
          <h2 className="mb-3 text-xl font-bold">
            {editing ? "Edit product" : "Add product"}
          </h2>

          <ProductForm
            initialProduct={editing}
            onSubmit={saveProduct}
            loading={loading}
          />

          {editing && (
            <button
              onClick={() => setEditing(null)}
              className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold hover:bg-slate-50"
            >
              Cancel edit
            </button>
          )}
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Products</h2>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {products.length === 0 ? (
              <p className="p-6 text-slate-500">No products found.</p>
            ) : (
              <div className="divide-y divide-slate-200">
                {products.map((product) => {
                  const id = product._id || product.id;
                  const name = product.name || product.title || "Unnamed product";

                  return (
                    <div
                      key={id}
                      className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <h3 className="font-bold">{name}</h3>
                        <p className="text-sm text-slate-500">
                          ${Number(product.price ?? 0).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditing(product)}
                          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(id)}
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}