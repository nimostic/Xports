import React, { useState } from "react";
import { FaCheck, FaTimes, FaTrashAlt, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";

const PendingContests = () => {

  const [contests, setContests] = useState([
    {
      _id: "1",
      contestName: "Logo Design Pro",
      contestType: "Design",
      ownerEmail: "creator1@test.com",
      status: "pending",
      price: 20,
    },
    {
      _id: "2",
      contestName: "React Battle Royale",
      contestType: "Development",
      ownerEmail: "dev@battle.com",
      status: "confirmed",
      price: 50,
    },
    {
      _id: "3",
      contestName: "Cyber Security Hack",
      contestType: "Security",
      ownerEmail: "hacker@lab.com",
      status: "pending",
      price: 100,
    }
  ]);

  const handleStatusUpdate = (id, newStatus) => {
    Swal.fire({
      title: `Update to ${newStatus}?`,
      text: "This will change the visibility of the contest.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: newStatus === "confirmed" ? "#22c55e" : "#eab308",
      background: "#161616",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        //  axiosSecure.patch 
        const updated = contests.map(c => c._id === id ? { ...c, status: newStatus } : c);
        setContests(updated);
        Swal.fire("Updated!", `Contest is now ${newStatus}.`, "success");
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      background: "#161616",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        // axiosSecure.delete 
        const remaining = contests.filter(c => c._id !== id);
        setContests(remaining);
        Swal.fire("Deleted!", "Contest has been removed.", "success");
      }
    });
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen p-6 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
              Manage <span className="text-primary">All Contests</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest">Admin Control Panel</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input 
              type="text" 
              placeholder="Search contests..." 
              className="input w-full bg-[#111] border-gray-800 focus:border-primary pl-12 text-sm rounded-2xl"
            />
          </div>
        </div>

        {/* Table Structure */}
        <div className="bg-[#111] rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-[#161616] border-b border-gray-800">
                <tr className="text-gray-400 uppercase text-[11px] tracking-widest">
                  <th className="py-6 pl-8">Contest Info</th>
                  <th>Creator</th>
                  <th>Status</th>
                  <th className="text-center">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {contests.map((contest) => (
                  <tr key={contest._id} className="hover:bg-white/2 transition-all group">
                    <td className="py-6 pl-8">
                      <div>
                        <div className="font-bold text-lg group-hover:text-primary transition-colors cursor-pointer">
                          {contest.contestName}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                          Type: {contest.contestType} | Fee: ${contest.price}
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-gray-400">{contest.ownerEmail}</td>
                    <td>
                      <span className={`badge badge-sm border-none rounded-md font-bold text-[10px] uppercase py-3 px-3 ${
                        contest.status === 'confirmed' ? 'bg-green-500/10 text-green-500' :
                        contest.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                        'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {contest.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="flex justify-center gap-2">
                        {/* Confirm Button */}
                        <button 
                          onClick={() => handleStatusUpdate(contest._id, 'confirmed')}
                          disabled={contest.status === 'confirmed'}
                          className="btn btn-square btn-sm bg-green-600/10 hover:bg-green-600 border-none text-green-500 hover:text-white transition-all disabled:opacity-20"
                          title="Confirm Contest"
                        >
                          <FaCheck size={12} />
                        </button>

                        {/* Reject Button */}
                        <button 
                          onClick={() => handleStatusUpdate(contest._id, 'rejected')}
                          className="btn btn-square btn-sm bg-yellow-600/10 hover:bg-yellow-600 border-none text-yellow-500 hover:text-white transition-all"
                          title="Reject Contest"
                        >
                          <FaTimes size={12} />
                        </button>

                        {/* Delete Button */}
                        <button 
                          onClick={() => handleDelete(contest._id)}
                          className="btn btn-square btn-sm bg-red-600/10 hover:bg-red-600 border-none text-red-500 hover:text-white transition-all"
                          title="Delete Permanently"
                        >
                          <FaTrashAlt size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingContests;