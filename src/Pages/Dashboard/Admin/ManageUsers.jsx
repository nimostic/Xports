import React, { useState, useContext, useEffect } from "react";
import { FaTrashAlt, FaUserShield, FaSearch, FaUserTie, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import { AuthContext } from "../../../Provider/AuthContext";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { user: currentUser, loading } = useContext(AuthContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users", debouncedSearch],
    enabled: !loading && !!currentUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${debouncedSearch}`);
      return res.data;
    },
  });

const handleRoleUpdate = async (selectedUser, newRole) => {
  if (selectedUser.email === currentUser.email) {
    return toast.error("Self-promotion/demotion is not allowed!");
  }

  const result = await Swal.fire({
    title: `Promote to ${newRole.toUpperCase()}?`,
    text: `Confirm role change for ${selectedUser.displayName}`,
    icon: "question",
    showCancelButton: true,
    
    
    confirmButtonColor: "oklch(var(--p))", 
    cancelButtonColor: "oklch(var(--n))",  
    
    
    background: "oklch(var(--b1))",        
    color: "oklch(var(--bc))",             
    
    customClass: {
      popup: 'rounded-[2rem] border border-base-300 shadow-2xl', 
      confirmButton: 'font-black uppercase italic tracking-tighter px-6 py-3 rounded-xl',
      cancelButton: 'font-black uppercase italic tracking-tighter px-6 py-3 rounded-xl'
    }
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
      toast.error(err.response?.data?.message || "Role update failed");
    }
  }
};

  return (
    <div className="bg-base-100 min-h-screen p-4 md:p-8 lg:p-10 text-base-content transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl italic uppercase tracking-tighter">
              User <span className="text-primary">Management</span>
            </h1>
            <p className="text-base-content/50 text-[10px] uppercase tracking-[0.4em] font-bold mt-2">
              System Personnel: <span className="text-primary">{users.length}</span>
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative group w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by name/email..."
              className="input w-full bg-base-200 border-base-300 focus:border-primary pl-12 h-14 rounded-2xl outline-none shadow-2xl"
            />
          </div>
        </div>

        {/* Table Section */}
        {isLoading ? (
          <Loading />
        ) : users.length === 0 ? (
          <div className="text-center py-20 bg-base-200 rounded-2xl border-2 border-dashed border-base-300 group shadow-2xl">
             <FaUser className="mx-auto text-5xl text-base-content/10 mb-4" />
             <p className="text-base-content/40 font-bold uppercase tracking-widest">No users found</p>
          </div>
        ) : (
          <div className="bg-base-200 rounded-2xl border border-base-300 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                {/* Table Head */}
                <thead className="bg-base-300/50">
                  <tr className="border-b border-base-300 text-base-content/60 uppercase text-[10px] tracking-widest">
                    <th className="py-6 pl-8">User Details</th>
                    <th>Current Access</th>
                    <th className="text-center">Modify Role</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300/50">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-base-300/30 transition-colors group">
                      <td className="py-5 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-2xl ring-2 ring-base-300 group-hover:ring-primary/50 transition-all">
                              <img src={u.photoURL || "https://i.ibb.co/mR79Y9t/user.png"} alt="avatar" />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-sm uppercase italic tracking-tighter">
                                {u.displayName}
                              </span>
                              {u.status === "pending_creator" && (
                                <span className="badge badge-primary badge-outline text-[8px] font-bold animate-pulse">
                                  REQUESTED
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] font-medium text-base-content/50">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-colors ${
                          u.role === "admin" ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                          u.role === "creator" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                          "bg-base-300 text-base-content/60 border-base-300"
                        }`}>
                          {u.role || "user"}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="flex justify-center gap-2">
                          {/* Role Buttons with Tooltips */}
                          <RoleButton 
                            icon={<FaUser />} 
                            active={u.role === "user" || !u.role} 
                            onClick={() => handleRoleUpdate(u, "user")}
                            color="gray"
                          />
                          <RoleButton 
                            icon={<FaUserTie />} 
                            active={u.role === "creator"} 
                            isPending={u.status === "pending_creator"}
                            onClick={() => handleRoleUpdate(u, "creator")}
                            color="blue"
                          />
                          <RoleButton 
                            icon={<FaUserShield />} 
                            active={u.role === "admin"} 
                            onClick={() => handleRoleUpdate(u, "admin")}
                            color="purple"
                          />
                        </div>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => handleDeleteUser(u)}
                          className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-white rounded-xl"
                        >
                          <FaTrashAlt />
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

// Reusable Role Button Component for cleaner code
const RoleButton = ({ icon, active, onClick, color, isPending }) => (
  <button
    onClick={onClick}
    disabled={active}
    className={`p-3 rounded-xl border transition-all duration-300 disabled:opacity-30 ${
      isPending ? "bg-amber-500 text-white animate-bounce shadow-lg" : 
      color === "purple" ? "hover:bg-purple-500 hover:text-white text-purple-500 border-purple-500/20 bg-purple-500/5" :
      color === "blue" ? "hover:bg-blue-500 hover:text-white text-blue-500 border-blue-500/20 bg-blue-500/5" :
      "hover:bg-gray-500 hover:text-white text-gray-500 border-gray-500/20 bg-gray-500/5"
    }`}
  >
    {icon}
  </button>
);

export default ManageUsers;