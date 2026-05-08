import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex flex-col items-center justify-center p-6">
      {/* Title Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase text-blue-900 mb-2">Care2Connect</h1>
        <p className="text-xs font-bold uppercase text-slate-400 tracking-[0.3em]">Central Administration Portal</p>
      </div>

      {/* 3 Horizontal Portals Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        
        {/* Portal 1: Doctor Portal */}
        <div className="group bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 hover:border-blue-500 transition-all flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">👨‍⚕️</div>
          <h2 className="text-xl font-black text-slate-800 mb-2">Doctor Portal</h2>
          <p className="text-xs font-bold text-slate-400 mb-8 min-h-[36px]">Register medical practitioners or verify practitioner directories.</p>
          
          <div className="flex flex-col gap-3 w-full mt-auto">
            <button 
              type="button"
              onClick={() => navigate('/form')}
              className="py-4 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 hover:shadow-lg hover:shadow-blue-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Fill Onboarding Form →
            </button>
            <button 
              type="button"
              onClick={() => navigate('/list')}
              className="py-4 bg-slate-50 hover:bg-slate-800 hover:text-white text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Review Applications →
            </button>
          </div>
        </div>

        {/* Portal 2: Medical Portal */}
        <div className="group bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-green-900/5 border border-slate-100 hover:border-green-500 transition-all flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">💊</div>
          <h2 className="text-xl font-black text-slate-800 mb-2">Medical Portal</h2>
          <p className="text-xs font-bold text-slate-400 mb-8 min-h-[36px]">Onboard local pharmacies or manage submitted retail pharmacy listings.</p>
          
          <div className="flex flex-col gap-3 w-full mt-auto">
            <button 
              type="button"
              onClick={() => navigate('/medical-form')}
              className="py-4 bg-green-50 hover:bg-green-600 hover:text-white text-green-600 hover:shadow-lg hover:shadow-green-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Fill Onboarding Form →
            </button>
            <button 
              type="button"
              onClick={() => navigate('/medical-list')}
              className="py-4 bg-slate-50 hover:bg-slate-800 hover:text-white text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Review Applications →
            </button>
          </div>
        </div>

        {/* Portal 3: Hospital Portal */}
        <div className="group bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-900/5 border border-slate-100 hover:border-indigo-500 transition-all flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">🏨</div>
          <h2 className="text-xl font-black text-slate-800 mb-2">Hospital Portal</h2>
          <p className="text-xs font-bold text-slate-400 mb-8 min-h-[36px]">Register healthcare centers or verify document registration vaults.</p>
          
          <div className="flex flex-col gap-3 w-full mt-auto">
            <button 
              type="button"
              onClick={() => navigate('/hospital-form')}
              className="py-4 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-600 hover:shadow-lg hover:shadow-indigo-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Fill Onboarding Form →
            </button>
            <button 
              type="button"
              onClick={() => navigate('/hospital-list')}
              className="py-4 bg-slate-50 hover:bg-slate-800 hover:text-white text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Review Applications →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
