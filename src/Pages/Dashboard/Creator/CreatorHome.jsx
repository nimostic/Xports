import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthContext";

const CreatorHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: myContests = [] } = useQuery({
    queryKey: ["my-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-contests?email=${user?.email}`);
      return res.data;
    },
  });

  const contestStats = myContests
    .map((c) => ({
      name:
        c.contestName.length > 10
          ? c.contestName.slice(0, 10) + "..."
          : c.contestName,
      participants: c.participantsCount || 0,
      revenue: (c.participantsCount || 0) * (c.price || 0),
    }))
    .slice(-6);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-[#0b0b0b] p-6 rounded-4xl border border-white/5 h-80">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">
            Revenue Growth
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={contestStats}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C80909" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C80909" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1f1f1f"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#555"
                fontSize={9}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#000",
                  border: "1px solid #C80909",
                  borderRadius: "10px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#C80909"
                fill="url(#colorRev)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Stats */}
        <div className="bg-[#0b0b0b] p-6 rounded-4xl border border-white/5 h-80">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">
            User Engagement
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contestStats}>
              <XAxis dataKey="name" hide />
              <Tooltip
                contentStyle={{ background: "#000", border: "none" }}
                cursor={{ fill: "rgba(200, 9, 9, 0.1)" }}
              />
              <Bar
                dataKey="participants"
                fill="#C80909"
                radius={[6, 6, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-[10px] text-gray-600 font-bold uppercase mt-2">
            Participants per Contest
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatorHome;
