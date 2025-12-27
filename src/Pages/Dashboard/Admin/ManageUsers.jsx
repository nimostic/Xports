import React, { use, useState } from "react";
import { FaTrashAlt, FaUserShield, FaUserEdit, FaSearch, FaUserTie, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import { AuthContext } from "../../../Provider/AuthContext";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const {user,loading} = use(AuthContext)
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users", searchText],
    enabled: !loading && !!user?.email, //jotokhon na user firebase theke load hobe totokhon query fetch korbe na
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleRoleUpdate = (user, newRole) => {
    Swal.fire({
      title: `Promote to ${newRole}?`,
      text: `Are you sure you want to change ${user.name}'s role?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#1a1a1a",
      background: "#111",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/role/${user._id}`, { role: newRole }).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: `Role updated to ${newRole}`,
              icon: "success",
              background: "#111",
              color: "#fff",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Remove User?",
      text: "This user will be permanently deleted from the database.",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      background: "#111",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then(() => {
          refetch();
          Swal.fire({ title: "Deleted!", icon: "success", background: "#111", color: "#fff", timer: 1000, showConfirmButton: false });
        });
      }
    });
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen p-6 md:p-10 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
              User <span className="text-primary">Management</span>
            </h1>
            <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-bold mt-2">
              Total Personnel: <span className="text-white">{users.length}</span>
            </p>
          </div>

          <div className="relative group w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary" />
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by name or email..."
              className="input w-full bg-[#111] border-gray-800 focus:border-primary pl-12 h-12 rounded-xl outline-none transition-all"
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
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-white/2 transition-colors group">
                      <td className="py-5 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-11 h-11 rounded-xl ring-1 ring-gray-800 group-hover:ring-primary/50 transition-all">
                              <img src={user.photoURL || "https://i.ibb.co/mR79Y9t/user.png"} alt="" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-gray-200">{user.name}</div>
                            <div className="text-[11px] text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                          user.role === "admin" ? "bg-purple-500/5 text-purple-400 border-purple-500/20" :
                          user.role === "creator" ? "bg-blue-500/5 text-blue-400 border-blue-500/20" :
                          "bg-gray-500/5 text-gray-400 border-gray-500/20"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleRoleUpdate(user, "creator")}
                            disabled={user.role === "creator" || user.role === "admin"}
                            className="p-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white transition-all border border-blue-500/10 disabled:opacity-5"
                            title="Make Creator"
                          >
                            <FaUserTie size={14} />
                          </button>
                          <button
                            onClick={() => handleRoleUpdate(user, "admin")}
                            disabled={user.role === "admin"}
                            className="p-2.5 rounded-lg bg-purple-500/10 hover:bg-purple-500 text-purple-500 hover:text-white transition-all border border-purple-500/10 disabled:opacity-5"
                            title="Make Admin"
                          >
                            <FaUserShield size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="p-2.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all border border-red-500/10"
                          title="Delete User"
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