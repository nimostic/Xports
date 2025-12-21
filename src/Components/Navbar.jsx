import React, { use } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router";
import logo from "../../public/logo.svg";
import AngledButton from "./AngledButton";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const signOut = () => {
    logOut().then(() => {
      toast.success("Logout successful");
    });
  };

  const links = (
    <>
      <li>
        <Link className="hover:text-primary" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="hover:text-primary" to="/all-contests">
          All Contests
        </Link>
      </li>
      <li>
        <Link className="hover:text-primary" to="/our-service">
          Our Service
        </Link>
      </li>
      <li>
        <Link className="hover:text-primary" to="/faq">
          FAQ
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-black px-4 md:px-10 shadow-md">
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-white"
          >
            ☰
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 text-white font-medium">
          {links}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full border border-gray-400">
              <img
                src={
                  user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"
                }
                alt="user"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box w-56 p-3 shadow"
          >
            <li className="font-semibold text-center cursor-default">
              {user?.displayName || "Guest User"}
            </li>
            <div className="divider my-1"></div>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <div className="divider my-1"></div>
            {user ? (
              <li className="hover:bg-transparent active:bg-transparent block w-full">
                <div className="p-0 bg-transparent hover:bg-transparent active:bg-transparent block w-full">
                  <AngledButton
                    onClick={signOut}
                    text="Logout"
                    className="w-full"
                  />
                </div>
              </li>
            ) : (
              <li className="hover:bg-transparent active:bg-transparent block w-full">
                <Link
                  to="/login"
                  className="p-0 bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent block w-full"
                >
                  <AngledButton text="Login" className="w-full" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
