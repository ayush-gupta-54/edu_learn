import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RightPanel from './components/RightPanel';

export default function App() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto flex gap-6">
        <Sidebar />
        <Dashboard />
        <RightPanel />
      </div>
    </div>
  );
}
