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

  // Data Map
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

  const COLORS = ["#C80909", "#2a2a2a"];

  return (
    <div className="space-y-6 custom-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Participated", val: totalParticipated, color: "text-white" },
          { label: "Contests Won", val: winCount, color: "text-blue-500" },
          {
            label: "Win Ratio",
            val: `${
              totalParticipated > 0 ? ((winCount / totalParticipated) * 100).toFixed(0) : 0
            }%`,
            color: "text-white",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#111] p-6 rounded-3xl border border-white/5 flex flex-col items-center md:items-start"
          >
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
              {stat.label}
            </p>
            <h2 className={`text-4xl font-black italic mt-2 ${stat.color}`}>
              {stat.val}
            </h2>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Win Rate Donut */}
        <div className="bg-[#0b0b0b] p-6 rounded-4xl border border-white/5 h-80">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">
            Performance Ratio
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                paddingAngle={5}
                stroke="none"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#C80909"
                fontSize={20}
                fontWeight="900"
              >
                Win {winPercentage}%
              </text>
              <Tooltip
                contentStyle={{
                  background: "#000",
                  border: "1px solid #C80909",
                  borderRadius: "10px",
                }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Line Chart */}
        <div className="bg-[#0b0b0b] p-6 rounded-4xl border border-white/5 h-80">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">
            Participation History
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1f1f1f"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="#555"
                fontSize={10}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#555"
                fontSize={10}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#000",
                  border: "1px solid #C80909",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="participations"
                stroke="#C80909"
                strokeWidth={4}
                dot={{ r: 5, fill: "#C80909", strokeWidth: 0 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
