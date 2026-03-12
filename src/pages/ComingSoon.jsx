import React from 'react';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center text-center px-4 overflow-hidden relative">
      {/* Subtle Background Glow for AI Aesthetic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <h1 className="font-bold tracking-tighter leading-none text-[4rem] md:text-[8rem] bg-gradient-to-br from-[#2563EB] to-[#60A5FA] bg-clip-text text-transparent uppercase animate-in fade-in zoom-in duration-1000">
          VEXADROP
        </h1>
        
        <div className="flex flex-col items-center gap-4 max-w-2xl animate-in slide-in-from-bottom-8 duration-1000 delay-200">
          <p className="text-xl md:text-2xl font-medium text-slate-300 flex items-center gap-1">
            The Future of Comfort is Loading
            <span className="flex">
              <span className="animate-pulse-staggered" style={{ animationDelay: '0s' }}>.</span>
              <span className="animate-pulse-staggered" style={{ animationDelay: '0.5s' }}>.</span>
              <span className="animate-pulse-staggered" style={{ animationDelay: '1s' }}>.</span>
            </span>
          </p>
          
          <p className="text-slate-500 text-lg md:text-xl font-light tracking-wide max-w-md mx-auto">
            Premium lifestyle essentials for the global citizen.
          </p>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="absolute bottom-8 left-0 right-0 text-center animate-in fade-in duration-1000 delay-500">
        <p className="text-slate-600 text-sm font-medium tracking-[0.2em] uppercase">
          Autonomous Global Retail
        </p>
      </div>

      <style jsx="true">{`
        @keyframes fade-pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 1; }
        }
        .animate-pulse-staggered {
          animation: fade-pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
