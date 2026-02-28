import React, { use, useEffect } from "react";
import { Link, Outlet, NavLink } from "react-router";
import {
  FaHome,
  FaUserAlt,
  FaPlusSquare,
  FaUsers,
  FaCogs,
  FaBars,
} from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { GiBullseye } from "react-icons/gi";
import logo from "../../public/logo.png";
import useRole from "../Hooks/useRole";
import { AuthContext } from "../Provider/AuthContext";

const DashboardLayout = () => {
  const [role] = useRole();
  const { user } = use(AuthContext);
useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
    <div className="drawer lg:drawer-open bg-base-100 transition-colors duration-500">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-100 lg:hidden border-b border-base-300 px-4">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost drawer-button text-base-content"
          >
            <FaBars size={20} />
          </label>
          <Link to="/" className="flex-1 justify-center md:justify-start">
            <img src={logo} alt="logo" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Dynamic Page Content */}
        
        <div className="p-6 lg:p-10 min-h-screen text-base-content bg-base-100">
          <Outlet />
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="drawer-side z-40">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

       
        <div className="menu p-0 w-72 min-h-full bg-base-100 text-base-content border-r border-base-300 shadow-xl transition-colors duration-500">
          
          {/* Sidebar Brand Logo */}
          <div className="p-8 border-b border-base-300/50">
            <Link to="/" className="block">
              <img src={logo} alt="logo" className="h-10 w-auto" />
            </Link>
            <p className="text-[10px] uppercase font-black italic tracking-[4px] text-primary mt-2">
              Management Portal
            </p>
          </div>

          <ul className="p-4 space-y-2 grow">
            {/* Common Links */}
            <div className="text-[10px] font-black text-base-content/40 uppercase tracking-widest px-4 mb-2 mt-4">
              General
            </div>

            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "hover:bg-base-200 text-base-content/70"
                  }`
                }
              >
                <FaUserAlt /> My Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "hover:bg-base-200 text-base-content/70"
                  }`
                }
              >
                <GrOverview /> Overview
              </NavLink>
            </li>

            {role === "user" && (
              <li>
                <NavLink
                  to="/dashboard/my-contests"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "hover:bg-base-200 text-base-content/70"
                    }`
                  }
                >
                  <GiBullseye /> Participated Contest
                </NavLink>
              </li>
            )}

            {/* Admin Links*/}
            {role === "admin" && (
              <>
                <div className="text-[10px] font-black text-base-content/40 uppercase tracking-widest px-4 mb-2 mt-6">
                  Admin Panel
                </div>
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/30"
                          : "hover:bg-base-200 text-base-content/70"
                      }`
                    }
                  >
                    <FaUsers /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/pending-contests"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/30"
                          : "hover:bg-base-200 text-base-content/70"
                      }`
                    }
                  >
                    <GiBullseye /> Pending Contest
                  </NavLink>
                </li>
              </>
            )}

            {/* Creator Links */}
            {role === "creator" && (
              <>
                <div className="text-[10px] font-black text-base-content/40 uppercase tracking-widest px-4 mb-2 mt-6">
                  Creator Hub
                </div>
                <li>
                  <NavLink
                    to="/dashboard/create-contests"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/30"
                          : "hover:bg-base-200 text-base-content/70"
                      }`
                    }
                  >
                    <FaPlusSquare /> Create Contest
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-contests"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/30"
                          : "hover:bg-base-200 text-base-content/70"
                      }`
                    }
                  >
                    <FaCogs /> Manage Contests
                  </NavLink>
                </li>
              </>
            )}

            <div className="border-t border-base-300 my-6"></div>
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold hover:bg-base-200 text-base-content/60 transition-colors"
              >
                <FaHome /> Back to Home
              </Link>
            </li>
          </ul>

          
          <div className="mt-auto p-4 bg-base-200 border-t border-base-300 flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL} alt="user profile" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black text-base-content leading-tight truncate uppercase italic">
                {user?.displayName}
              </p>
              <p className="text-[9px] text-base-content/50 font-bold truncate tracking-wider">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;