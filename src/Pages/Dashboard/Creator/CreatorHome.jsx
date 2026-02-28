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
      name: c.contestName.length > 8 ? c.contestName.slice(0, 8) + ".." : c.contestName,
      participants: c.participantsCount || 0,
      revenue: (c.participantsCount || 0) * (c.price || 0),
    }))
    .slice(-6);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 p-4 md:p-0">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter leading-none text-base-content">
          Command <span className="text-primary">Center</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 mt-3 italic text-base-content">
          Arena Analytics & Performance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-base-200/50 dark:bg-[#0b0b0b] p-6 rounded-4xl border border-base-300 dark:border-white/5 h-[350px] shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 text-base-content opacity-70">
            Revenue Growth (USD)
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={contestStats}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C80909" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C80909" stopOpacity={0} />
                </linearGradient>
              </defs>
              {/* CartesianGrid color dynamically changes */}
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-base-content/10"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="currentColor"
                className="text-base-content/50"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="currentColor"
                className="text-base-content/50"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--fallback-b1,oklch(var(--b1)))", // DaisyUI dynamic background
                  border: "1px solid #C80909",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "inherit"
                }}
                itemStyle={{ color: "#C80909" }}
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

        {/* Engagement Stats Bar Chart */}
        <div className="bg-base-200/50 dark:bg-[#0b0b0b] p-6 rounded-[2rem] border border-base-300 dark:border-white/5 h-[350px] shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 text-base-content opacity-70">
            User Engagement
          </h3>
          <ResponsiveContainer width="100%" height="75%">
            <BarChart data={contestStats}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "currentColor", opacity: 0.05 }}
                contentStyle={{ 
                    background: "var(--fallback-b1,oklch(var(--b1)))", 
                    border: "none", 
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                }}
              />
              <Bar
                dataKey="participants"
                fill="#C80909"
                radius={[6, 6, 0, 0]}
                barSize={25}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-base-300/30 rounded-xl">
            <p className="text-center text-[9px] text-base-content font-black uppercase tracking-widest italic opacity-60">
                Participants per Contest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorHome;