import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-4 py-16 sm:px-6">
        <div className="max-w-3xl text-white">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
            Learning Store
          </p>
          <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
            Simple shopping.
            <span className="block text-blue-400">Built by you.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A React frontend connected to your store backend. Browse products,
            inspect details, and manage products from the admin page.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-500"
            >
              Browse products
            </Link>
            <Link
              to="/admin"
              className="rounded-xl border border-slate-600 px-6 py-3 font-bold text-white hover:bg-white/10"
            >
              Manage products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}