import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const userData = [
    { name: "Users", value: stats.generalUsers || 0 },
    { name: "Creators", value: stats.totalCreators || 0 },
    {
      name: "Admins",
      value: stats.totalUsers - (stats.generalUsers + stats.totalCreators) || 0,
    },
  ];

  const systemStats = [
    {
      label: "Total Revenue",
      val: `$${stats.revenue || 0}`,
      desc: "Platform earnings",
      color: "border-[#C80909]",
    },
    {
      label: "Active Contests",
      val: stats.activeContests || 0,
      desc: "Live on site",
      color: "border-blue-500",
    },
    {
      label: "Total Users",
      val: stats.totalUsers || 0,
      desc: "Registered users",
      color: "border-green-500",
    },
  ];

  const COLORS = ["#C80909", "#444", "#1f1f1f"];
  const growthData = stats.growth || [];

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6 lg:p-8 bg-base-100 min-h-screen text-base-content custom-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl font-black md:text-3xl lg:text-4xl text-base-content italic uppercase tracking-tighter">
            System <span className="text-[#C80909]">Overview</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
            Real-time platform analytics
          </p>
        </div>
        <div className="hidden sm:block">
          <span className="px-3 py-1 bg-[#C80909]/10 text-[#C80909] text-[10px] font-bold rounded-full border border-[#C80909]/20">
            ADMIN PANEL
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {systemStats.map((item, i) => (
          <div
            key={i}
            className={`bg-base-300 p-5 md:p-6 rounded-3xl md:rounded-4xl ${item.color} border border-white/5 transition-transform hover:scale-[1.02] duration-300  group shadow-2xl`}
          >
            <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500">
              {item.label}
            </p>
            <h2 className="text-3xl md:text-4xl text-base-content italic mt-1 md:mt-2">
              {item.val}
            </h2>
            <p className="text-[8px] md:text-[9px] text-gray-600 mt-1 uppercase font-bold tracking-tight">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* User Distribution Chart */}
        <div className="bg-base-300 p-4 md:p-8 rounded-4xl md:rounded-[2.5rem] border border-white/5 h-[350px] md:h-[400px]">
          <h3 className="text-[10px]  uppercase tracking-widest text-gray-500 mb-6 border-l-2 border-[#C80909] pl-3">
            User Roles
          </h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={userData}
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {userData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#000",
                  border: "1px solid #C80909",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Growth Chart */}
        <div className="bg-base-300 p-4 md:p-8 rounded-4xl md:rounded-[2.5rem] border border-base-300 h-[350px] md:h-[400px]">
          <h3 className="text-[10px] uppercase tracking-widest text-base-content/50 mb-6 border-l-2 border-[#C80909] pl-3 font-bold">
            Platform Growth
          </h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={growthData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-base-content/10"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="currentColor"
                className="text-base-content/40"
                fontSize={10}
                axisLine={false}
                tickLine={false}
                tick={{ dy: 10 }}
              />
              <YAxis
                stroke="currentColor"
                className="text-base-content/40"
                fontSize={10}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{
                  fill: "currentColor",
                  className: "text-base-content/5",
                }}
                contentStyle={{
                  backgroundColor: "var(--fallback-b1,oklch(var(--b1)))",
                  border: "1px solid #C80909",
                  borderRadius: "12px",
                  color: "var(--fallback-bc,oklch(var(--bc)))",
                }}
                itemStyle={{ color: "#C80909", fontWeight: "bold" }}
              />
              <Bar
                dataKey="users"
                fill="#C80909"
                radius={[6, 6, 0, 0]}
                barSize={window.innerWidth < 768 ? 20 : 35}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
