import { Link, NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `transition ${isActive ? "text-blue-600 font-semibold" : "text-slate-600 hover:text-blue-600"}`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Store<span className="text-blue-600">App</span>
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/products" className={linkClass}>Products</NavLink>
          <NavLink to="/admin" className={linkClass}>Admin</NavLink>
        </nav>
      </div>
    </header>
  );
}