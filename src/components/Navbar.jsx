import { Link, useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar({ cartItems, isLoggedIn, setIsLoggedIn }) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") ?? "");
  const navigate = useNavigate();

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

  const navBase =
    "text-sm font-medium transition-all duration-200 rounded-full px-4 py-2.5 ";
  const navLink =
    navBase +
    "text-white/90 hover:text-white hover:bg-white/10";
  const navButton =
    navBase +
    "bg-white text-slate-800 hover:bg-gray-200";

  return (
    <nav className="sticky top-0 z-50 bg-slate-800 dark:bg-slate-900 shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 gap-4 flex-wrap py-3">
          {/* Brand — Hinda italic */}
          <Link
            to="/"
            className="flex items-center shrink-0 focus:outline-none focus:ring-2 focus:ring-rose-400/50 rounded-lg"
          >
            <span
              className="text-2xl sm:text-3xl italic font-semibold tracking-tight text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Hinda's Eshop
            </span>
          </Link>

          {/* Search — pill, centered on larger screens */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 flex justify-center min-w-0 max-w-md"
          >
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-400/50 transition-all"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-white/70 hover:text-rose-300 hover:bg-white/10 transition-colors"
                aria-label="Search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Right group: nav links + theme + cart + auth */}
          <div
            className="flex items-center gap-1 sm:gap-2 flex-wrap justify-end"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <Link to="/" className={navLink}>
              Home
            </Link>

            <button
              onClick={toggleTheme}
              className={navBase + "text-white/90 hover:text-rose-300 hover:bg-white/10 p-2.5"}
              aria-label="Toggle theme"
            >
              {theme ? "☀️" : "🌙"}
            </button>

            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 transition-colors"
            >
              <span aria-hidden>🛒</span>
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 px-1 flex items-center justify-center rounded-full bg-rose-500 text-white text-xs font-semibold">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.removeItem("isLoggedIn");
                }}
                className={navBase + "text-white/90 hover:text-rose-300 hover:bg-white/10"}
              >
                Log out
              </button>
            ) : (
              <Link to="/login" className={navButton} style={{ fontFamily: "'Outfit', sans-serif" }}>
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
