import React from 'react';
import ComingSoon from './pages/ComingSoon';

// In a real scenario, you'd have your main app content here
const MainContent = () => (
  <div className="p-10 text-center">
    <h2 className="text-3xl text-white">VexaDrop Store - Live Mode</h2>
    <p className="text-slate-400 mt-4">The store is currently active.</p>
  </div>
);

function App() {
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

  if (isMaintenanceMode) {
    return <ComingSoon />;
  }

  return (
    <div className="bg-[#0F172A] min-h-screen text-white">
      <MainContent />
    </div>
  );
}

export default App;
