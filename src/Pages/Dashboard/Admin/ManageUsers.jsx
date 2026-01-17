import React, { useState, useContext } from "react";
import { FaTrashAlt, FaUserShield, FaSearch, FaUserTie } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import { AuthContext } from "../../../Provider/AuthContext";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const { user: currentUser, loading } = useContext(AuthContext);

  // TanStack Query for Users
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", searchText],
    enabled: !loading && !!currentUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  // Handle Role Update (Admin/Creator/User)
  const handleRoleUpdate = async (selectedUser, newRole) => {
    // console.log(selectedUser);
    if (selectedUser.email === currentUser.email) {
      return toast.error("You cannot change your own role!");
    }

    const result = await Swal.fire({
      title: `Update to ${newRole}?`,
      text: `Change ${selectedUser.displayName}'s role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#1a1a1a",
      background: "#111",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/users/role/${selectedUser._id}`, {
          role: newRole,
        });
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`${selectedUser.displayName} is now a ${newRole}`);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Update failed");
      }
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (selectedUser) => {
    if (selectedUser.email === currentUser.email) {
      return toast.error("You cannot delete yourself!");
    }
    const result = await Swal.fire({
      title: "Remove User?",
      text: "This user will be permanently deleted!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      background: "#111",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/users/${selectedUser._id}`);
        refetch();
        toast.success("User deleted");
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen p-6 md:p-10 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header & Search Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
              User <span className="text-blue-500">Management</span>
            </h1>
            <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-bold mt-2">
              Total Personnel: <span className="text-white">{users.length}</span>
            </p>
          </div>

          <div className="relative group w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500" />
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by name or email..."
              className="input w-full bg-[#111] border-gray-800 focus:border-blue-500 pl-12 h-12 rounded-xl outline-none transition-all"
            />
          </div>
        </div>

        {/* Table Section */}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="bg-[#111] rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-[#161616] border-b border-gray-800 text-gray-400 uppercase text-[10px] tracking-[0.2em]">
                    <th className="py-6 pl-8">User Info</th>
                    <th>Current Role</th>
                    <th className="text-center">Promote To</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/30">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-white/2 transition-colors group">
                      <td className="py-5 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-11 h-11 rounded-xl ring-1 ring-gray-800 group-hover:ring-blue-500/50 transition-all">
                              <img src={u.photoURL || "https://i.ibb.co/mR79Y9t/user.png"} alt="User" />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-200">{u.displayName}</span>
                              {u.status === "pending_creator" && (
                                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[8px] font-black rounded-full border border-amber-500/20 animate-pulse">
                                  REQUESTED
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-gray-500">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                          u.role === "admin" ? "bg-purple-500/5 text-purple-400 border-purple-500/20" :
                          u.role === "creator" ? "bg-blue-500/5 text-blue-400 border-blue-500/20" :
                          "bg-gray-500/5 text-gray-400 border-gray-500/20"
                        }`}>
                          {u.role || "user"}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="flex justify-center gap-2">
                          {/* Make User */}
                          <button
                            onClick={() => handleRoleUpdate(u, "user")}
                            disabled={u.role === "user" || !u.role}
                            className="p-2.5 rounded-lg border border-gray-800 bg-gray-500/10 text-gray-400 hover:bg-gray-500 hover:text-white transition-all disabled:opacity-10"
                            title="Make User"
                          >
                            <FaUserTie size={14} />
                          </button>
                          
                          {/* Make Creator */}
                          <button
                            onClick={() => handleRoleUpdate(u, "creator")}
                            disabled={u.role === "creator"}
                            className={`p-2.5 rounded-lg border transition-all disabled:opacity-10 ${
                              u.status === "pending_creator"
                                ? "bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                                : "bg-blue-500/10 text-blue-500 border-blue-500/10 hover:bg-blue-500 hover:text-white"
                            }`}
                            title="Make Creator"
                          >
                            <FaUserTie size={14} />
                          </button>

                          {/* Make Admin */}
                          <button
                            onClick={() => handleRoleUpdate(u, "admin")}
                            disabled={u.role === "admin"}
                            className="p-2.5 rounded-lg bg-purple-500/10 hover:bg-purple-500 text-purple-500 hover:text-white transition-all border border-purple-500/10 disabled:opacity-10"
                            title="Make Admin"
                          >
                            <FaUserShield size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => handleDeleteUser(u)}
                          className="p-2.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all border border-red-500/10"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;