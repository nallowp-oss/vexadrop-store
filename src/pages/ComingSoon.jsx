import React from 'react';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center text-center px-4 overflow-hidden relative selection:bg-blue-500/30">
      {/* Premium AI Aesthetic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      
      <div className="relative z-10 flex flex-col items-center gap-8">
        <h1 className="font-bold tracking-[-0.05em] leading-[0.85] text-[5rem] md:text-[8rem] bg-gradient-to-br from-[#2563EB] to-[#60A5FA] bg-clip-text text-transparent uppercase animate-in fade-in zoom-in duration-1000">
          VEXADROP
        </h1>
        
        <div className="flex flex-col items-center gap-6 max-w-2xl animate-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
          <p className="text-xl md:text-3xl font-medium text-slate-200 flex items-center gap-1.5">
            The Future of Comfort is Loading
            <span className="flex">
              <span className="animate-loading-dot" style={{ animationDelay: '0s' }}>.</span>
              <span className="animate-loading-dot" style={{ animationDelay: '0.5s' }}>.</span>
              <span className="animate-loading-dot" style={{ animationDelay: '1s' }}>.</span>
            </span>
          </p>
          
          <p className="text-slate-500 text-lg md:text-xl font-light tracking-wide max-w-md mx-auto leading-relaxed">
            Premium lifestyle essentials for the global citizen.
          </p>
        </div>
      </div>
      
      {/* High-end decorative footer */}
      <div className="absolute bottom-12 left-0 right-0 text-center animate-in fade-in duration-1000 delay-700 fill-mode-both">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500/30"></div>
          <span className="text-slate-600 text-xs font-bold tracking-[0.3em] uppercase">
            Autonomous Global Retail
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500/30"></div>
        </div>
      </div>

      <style>{`
        @keyframes loading-dot {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-3px); }
        }
        .animate-loading-dot {
          animation: loading-dot 1.5s infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
