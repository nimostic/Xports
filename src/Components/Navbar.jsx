import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { toast } from "react-toastify";
import { Link, NavLink } from "react-router";
import logo from "../../public/logo.png";
import AngledButton from "./AngledButton";
import { HiSun, HiMoon } from "react-icons/hi2";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const { user, logOut } = use(AuthContext);

  const signOut = () => {
    logOut().then(() => toast.success("Logout successful"));
  };

  const links = (
    <>
      {["Home", "Dashboard", "All Contests", "Our Service", "FAQ"].map(
        (item) => (
          <li key={item}>
            <NavLink
              to={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(/\s+/g, "-")}`
              }
              className={({ isActive }) =>
                `px-3 py-2 font-bold uppercase italic tracking-tighter text-sm transition-all duration-300 ${
                  isActive
                    ? "text-primary underline decoration-2 underline-offset-4"
                    : "text-base-content hover:text-primary"
                }`
              }
            >
              {item}
            </NavLink>
          </li>
        ),
      )}
    </>
  );

  return (
    // Outer wrapper handles the "floating" position
    <div
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "pt-4 px-4" : "pt-0 px-0"
      }`}
    >
      {/* Inner navbar: transforms into a centered capsule */}
      <div
        className={`navbar mx-auto transition-all duration-500 ease-in-out ${
          scrolled
            ? "max-w-5xl bg-base-100/60 backdrop-blur-md rounded-4xl shadow-2xl border-base-content/10 px-6 py-2"
            : "max-w-full bg-base-100/20 backdrop-blur-sm px-6 py-4 shadow-md"
        }`}
      >
        {/* Navbar Start: Logo */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-base-content"
            >
              ☰
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-4 shadow-2xl z-50 border border-base-300"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2 group">
            <img
              className={`h-10 w-auto transition-all duration-500 ${scrolled ? "scale-90" : "scale-100"}`}
              src={logo}
              alt="logo"
            />
            {!scrolled && (
              <span className="font-black italic text-xl uppercase tracking-tighter hidden md:block">
                x <span className="text-primary">ports</span>
              </span>
            )}
          </Link>
        </div>

        {/* Navbar Center: NavLinks (Visible always) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-2">{links}</ul>
        </div>

        {/* Navbar End: Actions */}
        <div className="navbar-end gap-2">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-xl text-base-content hover:bg-base-content/10"
          >
            {theme === "dark" ? (
              <HiSun className="text-yellow-400" />
            ) : (
              <HiMoon className="text-indigo-600" />
            )}
          </button>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar online"
            >
              <div className="w-10 rounded-full border-2 border-primary/50">
                <img
                  src={
                    user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"
                  }
                  alt="user"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-2xl w-60 p-4 shadow-2xl z-50 mt-4 border border-base-300 animate-in fade-in slide-in-from-top-2"
            >
              <li className="font-bold text-center px-4 py-2 opacity-70 italic uppercase text-xs tracking-widest border-b border-base-content/10 mb-2">
                {user?.displayName || "Guest User"}
              </li>
              <li>
                <Link to="/dashboard/profile" className="py-3">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="py-3">
                  Dashboard
                </Link>
              </li>
              <div className="divider my-1 opacity-20"></div>
              <li className="p-0! block w-full mt-4">
                {user ? (
                  /* Logout Section */
                  <div className="p-0! w-full block">
                    <AngledButton
                      onClick={signOut}
                      text="Logout"
                      className="w-full block! py-3! m-0!"
                    />
                  </div>
                ) : (
                  /* Login Section */
                  <Link
                    to="/login"
                    className="p-0! w-full block hover:bg-transparent focus:bg-transparent active:bg-transparent"
                  >
                    <AngledButton
                      text="Login"
                      className="w-full block! py-3! m-0!"
                    />
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
