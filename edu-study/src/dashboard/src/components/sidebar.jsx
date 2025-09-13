import React from 'react';
import { FaTachometerAlt, FaBook, FaComments, FaChartBar, FaCog } from 'react-icons/fa';

const NavItem = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
    active ? 'bg-gradient-to-r from-[#111827] to-[#0b1220] text-white' : 'text-gray-300 hover:bg-gray-800'
  }`}>
    <div className="text-lg">{icon}</div>
    <div className="text-sm font-medium">{label}</div>
  </div>
);

export default function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar text-white rounded-3xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-yellow-400 flex items-center justify-center font-bold">A</div>
          <div>
            <div className="text-lg font-bold">Academyis</div>
            <div className="text-xs text-gray-400">Education UI</div>
          </div>
        </div>

        <nav className="space-y-2">
          <NavItem icon={<FaTachometerAlt />} label="Dashboard" active />
          <NavItem icon={<FaBook />} label="Courses" />
          <NavItem icon={<FaComments />} label="Chats" />
          <NavItem icon={<FaChartBar />} label="Grades" />
          <NavItem icon={<FaCog />} label="Settings" />
        </nav>
      </div>

      <div className="text-xs text-gray-400">© {new Date().getFullYear()} Academyis</div>
    </aside>
  );
}
