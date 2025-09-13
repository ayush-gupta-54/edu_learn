import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import CourseCard from './CourseCard';

const weeklyData = [
  { day: "Mon", hours: 2 }, { day: "Tue", hours: 1 },
  { day: "Wed", hours: 4 }, { day: "Thu", hours: 3 },
  { day: "Fri", hours: 2 }, { day: "Sat", hours: 1 },
  { day: "Sun", hours: 2 }
];

const pieData = [
  { name: "Study", value: 57 },
  { name: "Exams", value: 19 }
];

const COLORS = ['#FF6584', '#FFC371'];

export default function Dashboard() {
  return (
    <main className="flex-1 bg-white rounded-3xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">Average Rating <strong className="ml-2">8/10</strong></div>
          <div className="text-sm text-gray-500">Active tasks <strong className="ml-2">12</strong></div>
          <div className="bg-black text-white rounded-full px-4 py-2">You have new messages!</div>
          <img src="https://i.pravatar.cc/40" className="w-9 h-9 rounded-full" alt="avatar" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">This Week</h3>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="hours" fill="#FF6584" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow flex flex-col items-center">
          <h3 className="font-semibold mb-2">Activities</h3>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={6}>
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-xl font-bold">76%</div>
          <div className="text-sm text-gray-500 mt-1">Study 57% • Exams 19%</div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">My Courses</h3>
        <div className="space-y-4">
          <CourseCard title="Web Design" lessons={10} progress={50} />
          <CourseCard title="JavaScript" lessons={7} progress={27} />
        </div>
      </div>
    </main>
  );
}
