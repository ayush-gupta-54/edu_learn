import React from 'react';

export default function CourseCard({ title, lessons, progress = 0 }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow flex items-center justify-between">
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-gray-400">{lessons} lessons</div>
      </div>

      <div className="flex-1 px-4">
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div className="h-2 rounded-full" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#FF6584,#FFC371)' }} />
        </div>
      </div>

      <button className="py-2 px-4 border rounded-full text-sm">Continue</button>
    </div>
  );
}
