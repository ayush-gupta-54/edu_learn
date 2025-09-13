import React from 'react';

export default function RightPanel() {
  return (
    <aside className="w-72">
      <div className="bg-white p-4 rounded-2xl shadow mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold">Calendar</h4>
          <div className="text-xs text-gray-400">May 29, 2023</div>
        </div>
        <ul className="space-y-3 text-sm">
          <li><span className="text-gray-500">10:00 AM</span> — New learning formats</li>
          <li><span className="text-gray-500">11:00 AM</span> — Web Design Trends</li>
          <li><span className="text-gray-500">2:00 PM</span> — JavaScript Features</li>
          <li><span className="text-gray-500">4:30 PM</span> — Exam: JavaScript</li>
        </ul>
        <button className="mt-4 w-full py-2 border rounded-lg">All events</button>
      </div>

      <div className="bg-gradient-to-br from-[#3b2b63] to-[#f7c477] p-4 rounded-2xl text-white">
        <h4 className="font-bold">Buy Premium</h4>
        <p className="text-sm mt-2">and get access to new courses</p>
        <button className="mt-4 w-full bg-white text-black py-2 rounded-lg">More detailed</button>
      </div>
    </aside>
  );
}
