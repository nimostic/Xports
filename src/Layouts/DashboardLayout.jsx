import React, { use } from "react";
import { Link, Outlet, NavLink } from "react-router";
import Loading from "../Components/Loading";
import {
  FaHome,
  FaTrophy,
  FaUserAlt,
  FaPlusSquare,
  FaUsers,
  FaCogs,
  FaBars,
} from "react-icons/fa";
import logo from "../../public/logo.svg";
import useRole from "../Hooks/useRole";
import { AuthContext } from "../Provider/AuthContext";
const DashboardLayout = () => {
  const [role] = useRole();
  const { user } = use(AuthContext);

  return (
    <div className="drawer lg:drawer-open bg-[#0F0F0F]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-[#1A1A1A] lg:hidden border-b border-gray-800 px-4">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost drawer-button text-white"
          >
            <FaBars size={20} />
          </label>
          <Link to="/" className="">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* Dynamic Page Content */}
        <div className="p-6 lg:p-10 min-h-screen text-gray-200">
          <Outlet /> {/* Ekhane dashboard er sub-pages gulo asbe */}
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu p-0 w-72 min-h-full bg-[#161616] text-gray-300 border-r border-gray-800">
          {/* Sidebar Brand Logo */}
          <div className="p-8 border-b border-gray-800/50">
            <Link to="/" className="">
              <img src={logo} alt="logo" />
            </Link>
            <p className="text-[10px] uppercase tracking-[4px] text-gray-500 mt-1">
              Management Portal
            </p>
          </div>

          <ul className="p-4 space-y-2">
            {/* Common Links */}
            <div className="text-xs font-bold text-gray-600 uppercase tracking-widest px-4 mb-2 mt-4">
              General
            </div>

            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#F40E08] text-white shadow-[0_0_15px_rgba(244,14,8,0.4)]"
                      : "hover:bg-white/5"
                  }`
                }
              >
                <FaUserAlt /> My Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-contests"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#F40E08] text-white shadow-[0_0_15px_rgba(244,14,8,0.4)]"
                      : "hover:bg-white/5"
                  }`
                }
              >
                <FaUsers />
                Participated Contest
              </NavLink>
            </li>

            {/* Admin Links*/}
            {role === "admin" && (
              <>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-widest px-4 mb-2 mt-6">
                  Admin {user?.displayName}
                </div>
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-[#F40E08] text-white shadow-[0_0_15px_rgba(244,14,8,0.4)]"
                          : "hover:bg-white/5"
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
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-[#F40E08] text-white shadow-[0_0_15px_rgba(244,14,8,0.4)]"
                          : "hover:bg-white/5"
                      }`
                    }
                  >
                    <FaUsers />
                    Pending Contest
                  </NavLink>
                </li>
              </>
            )}
            {/* Creator Links */}
            {role === "creator" && (
              <>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-widest px-4 mb-2 mt-6">
                  Creator {user?.displayName}
                </div>
                <li>
                  <NavLink
                    to="/dashboard/create-contests"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-[#F40E08] text-white shadow-[0_0_15px_rgba(244,14,8,0.4)]"
                          : "hover:bg-white/5"
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
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-[#F40E08] text-white shadow-[0_0_15px_rgba(244,14,8,0.4)]"
                          : "hover:bg-white/5"
                      }`
                    }
                  >
                    <FaCogs /> Manage Contests
                  </NavLink>
                </li>
              </>
            )}
            {/* Shared/Back Link */}
            <div className="border-t border-gray-800 my-6"></div>
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400"
              >
                <FaHome /> Back to Home
              </Link>
            </li>
          </ul>

          {/* User Info Bottom */}
          <div className="mt-auto p-4 bg-[#111] border-t border-gray-800 flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-[#F40E08] ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL} alt="user" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">
                {role} {user?.displayName}
              </p>
              <p className="text-[10px] text-gray-500 italic">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
