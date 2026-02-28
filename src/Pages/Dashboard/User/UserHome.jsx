import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthContext";

const UserHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: wonContests = [] } = useQuery({
    queryKey: ["winners", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/winners?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: participatedContests = [] } = useQuery({
    queryKey: ["participate", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/participate?email=${user?.email}`);
      return res.data;
    },
  });

  const winCount = wonContests.length;
  const totalParticipated = participatedContests.length;
  const lostCount = Math.max(0, totalParticipated - winCount);
  const winPercentage =
    totalParticipated > 0
      ? Math.round((winCount / totalParticipated) * 100)
      : 0;

  const pieData = [
    { name: "Won", value: winCount },
    { name: "Lost", value: lostCount },
  ];

  const activityMap = participatedContests.reduce((acc, curr) => {
    const dateSource = curr.paidAt || curr.deadline;
    const month = new Date(dateSource).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const lineData = Object.keys(activityMap).map((month) => ({
    month,
    participations: activityMap[month],
  }));

  // Theme-based Colors
  const COLORS = ["#C80909", "#cbd5e1"]; // Won: Red, Lost: Grayish

  return (
    <div className="space-y-8 custom-fade-in p-2">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Participated",
            val: totalParticipated,
            color: "text-base-content",
          },
          { label: "Contests Won", val: winCount, color: "text-red-600" },
          {
            label: "Win Ratio",
            val: `${winPercentage}%`,
            color: "text-base-content",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-base-300 p-8 rounded-4xl border border-white/5 flex items-center justify-between group shadow-2xl"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 italic">
              {stat.label}
            </p>
            <h2
              className={`text-5xl font-black italic mt-3 tracking-tighter ${stat.color}`}
            >
              {stat.val}
            </h2>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Win Rate Donut */}
        <div className="bg-base-200 dark:bg-[#0b0b0b] p-8 rounded-[2.5rem] border border-base-300 dark:border-white/5 h-[400px] shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 mb-8 italic">
            Performance Ratio
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={70}
                  outerRadius={95}
                  dataKey="value"
                  paddingAngle={8}
                  stroke="none"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} className="outline-none" />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="currentColor"
                  className="text-2xl font-black italic text-base-content"
                >
                  {winPercentage}%
                </text>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--fallback-b1,oklch(var(--b1)))",
                    border: "1px solid #C80909",
                    borderRadius: "15px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                  itemStyle={{ color: "var(--fallback-bc,oklch(var(--bc)))" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#C80909]"></span>
              <span className="text-[10px] font-bold uppercase opacity-60">Won</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-300"></span>
              <span className="text-[10px] font-bold uppercase opacity-60">Lost</span>
            </div>
          </div>
        </div>

        {/* Activity Line Chart */}
        <div className="bg-base-200 dark:bg-[#0b0b0b] p-8 rounded-[2.5rem] border border-base-300 dark:border-white/5 h-[400px] shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 mb-8 italic">
            Participation History
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="opacity-5"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="currentColor"
                  className="opacity-40"
                  fontSize={10}
                  fontWeight="bold"
                  axisLine={false}
                  tickLine={false}
                  dy={15}
                />
                <YAxis
                  stroke="currentColor"
                  className="opacity-40"
                  fontSize={10}
                  fontWeight="bold"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--fallback-b1,oklch(var(--b1)))",
                    border: "1px solid #C80909",
                    borderRadius: "12px",
                    color: "inherit"
                  }}
                />
                <Line
                  type="stepAfter"
                  dataKey="participations"
                  stroke="#C80909"
                  strokeWidth={4}
                  dot={{ r: 6, fill: "#C80909", strokeWidth: 0 }}
                  activeDot={{ r: 10, stroke: "#C80909", strokeWidth: 2, fill: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;