import { Link, useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import useCategories from "../hooks/useCategories";

export default function Navbar() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") ?? "");
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { categories } = useCategories();
  const category = searchParams.get("category");

  useEffect(() => {
    setSearchQuery(searchParams.get("search") ?? "");
  }, [searchParams]);

  const { theme, toggleTheme } = useContext(ThemeContext);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const query = searchQuery.trim();
    navigate({
      pathname: "/",
      search: query ? createSearchParams({ search: query }).toString() : "",
    });
  }

  function getSearchString(overrides = {}) {
    const params = { ...overrides };
    if (searchQuery?.trim()) params.search = searchQuery.trim();
    const currentSort = searchParams.get("sort");
    if (currentSort && !("sort" in overrides)) params.sort = currentSort;
    return Object.keys(params).length ? createSearchParams(params).toString() : "";
  }

  const compact = "text-xs font-medium rounded-full px-2 py-1.5 shrink-0 transition-colors ";
  const navLink = compact + "text-white/90 hover:text-white hover:bg-white/10";
  const navButton = compact + "bg-white text-slate-800 hover:bg-gray-200";
  const selectClass =
    "text-xs rounded-full px-2 py-1.5 border border-white/20 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-rose-400/50 shrink-0";

  return (
    <nav className="sticky top-0 z-50 bg-slate-800 dark:bg-slate-900 shadow-md border-b-2 border-slate-700 dark:border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex flex-nowrap justify-between items-center h-11 gap-1.5 sm:gap-2">
        
          <Link
            to="/"
            className="flex items-center shrink-0 focus:outline-none focus:ring-2 focus:ring-rose-400/50 rounded"
          >
            <span
              className="relative text-base sm:text-lg italic font-semibold tracking-wide bg-gradient-to-r from-rose-300 via-amber-200 to-rose-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(0,0,0,0.45)] whitespace-nowrap"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Hinda
              <span
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] sm:h-[3px] w-10 sm:w-14 bg-gradient-to-r from-transparent via-amber-300 to-transparent rounded-full opacity-90"
              />
            </span>
          </Link>

         
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 flex min-w-0 max-w-[180px] sm:max-w-xs mx-1"
          >
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-2 pr-7 py-1.5 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/50 text-xs focus:outline-none focus:ring-1 focus:ring-rose-400/50"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="absolute right-0.5 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-rose-300"
                aria-label="Search"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* All nav in one row — no scroll */}
          <div className="flex items-center flex-nowrap gap-1 sm:gap-1.5 shrink-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <Link to="/" className={navLink}>
              Home
            </Link>
            <select
              value={category ?? ""}
              onChange={(e) => {
                const cat = e.target.value || undefined;
                navigate({ pathname: "/", search: getSearchString(cat ? { category: cat } : {}) });
              }}
              className={selectClass + " cursor-pointer min-w-0 w-[72px] sm:w-24"}
              aria-label="Category"
            >
              <option value="" className="bg-white text-gray-900">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-white text-gray-900">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={searchParams.get("sort") ?? ""}
              onChange={(e) => {
                const raw = {
                  category: searchParams.get("category") || undefined,
                  search: searchParams.get("search") || undefined,
                  sort: e.target.value || undefined,
                };
                const params = Object.fromEntries(
                  Object.entries(raw).filter(([, v]) => v != null && v !== "")
                );
                navigate({
                  pathname: "/",
                  search: Object.keys(params).length ? createSearchParams(params).toString() : "",
                });
              }}
              className={selectClass + " cursor-pointer w-[70px] sm:w-20"}
              aria-label="Sort"
            >
              <option value="" className="bg-white text-gray-900">Sort</option>
              <option value="price_asc" className="bg-white text-gray-900">Price ↑</option>
              <option value="price_desc" className="bg-white text-gray-900">Price ↓</option>
              <option value="title" className="bg-white text-gray-900">A–Z</option>
            </select>
            <Link
              to="/cart"
              className="relative flex items-center gap-0.5 rounded-full px-2 py-1.5 text-xs font-medium bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 shrink-0"
            >
              <span aria-hidden>🛒</span>
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="flex items-center justify-center min-w-[1.125rem] h-[1.125rem] rounded-full bg-rose-500 text-white text-[10px] font-semibold">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={toggleTheme}
              className={compact + "text-white/90 hover:text-rose-300 hover:bg-white/10 p-1.5"}
              aria-label="Toggle theme"
            >
              {theme ? "☀️" : "🌙"}
            </button>
            {isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="shrink-0 rounded-full border border-red-400/80 text-red-200 hover:bg-red-500/30 px-2 py-1.5 text-xs font-medium"
              >
                Log out
              </button>
            ) : (
              <Link to="/login" className={navButton}>
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
