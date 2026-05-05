import React from 'react';

const Dashboard = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase text-blue-900 mb-2">Care2Connect</h1>
        <p className="text-xs font-bold uppercase text-slate-400 tracking-[0.3em]">Central Navigation Portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Fill Form Card */}
        <button 
          type="button"
          onClick={() => onNavigate('form')}
          className="group bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 hover:border-blue-600 transition-all flex flex-col items-center text-center text-left"
        >
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">📝</div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">Doctor Onboarding</h2>
          <p className="text-sm font-bold text-slate-400">Fill out a new application form to join the Care2Connect network.</p>
          <div className="mt-8 px-8 py-3 bg-slate-50 text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-colors w-full">
            Fill Form →
          </div>
        </button>

        {/* List Access Card */}
        <button 
          type="button"
          onClick={() => onNavigate('list')}
          className="group bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 hover:border-blue-600 transition-all flex flex-col items-center text-center text-left"
        >
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">📋</div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">Doctor List</h2>
          <p className="text-sm font-bold text-slate-400">Directly access the list of submitted forms for review and approval.</p>
          <div className="mt-8 px-8 py-3 bg-slate-50 text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-colors w-full">
            View List →
          </div>
        </button>

        {/* Medical Form Card */}
        <button 
          type="button"
          onClick={() => onNavigate('medical-form')}
          className="group bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 hover:border-green-600 transition-all flex flex-col items-center text-center text-left"
        >
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🏥</div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">Medical Onboarding</h2>
          <p className="text-sm font-bold text-slate-400">Register a new medical store or pharmacy with an approved doctor.</p>
          <div className="mt-8 px-8 py-3 bg-slate-50 text-green-600 rounded-xl text-xs font-black uppercase tracking-widest group-hover:bg-green-600 group-hover:text-white transition-colors w-full">
            Fill Form →
          </div>
        </button>

        {/* Medical List Card */}
        <button 
          type="button"
          onClick={() => onNavigate('medical-list')}
          className="group bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 hover:border-green-600 transition-all flex flex-col items-center text-center text-left"
        >
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🏥</div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">Medical List</h2>
          <p className="text-sm font-bold text-slate-400">Review and approve submitted medical stores and pharmacies.</p>
          <div className="mt-8 px-8 py-3 bg-slate-50 text-green-600 rounded-xl text-xs font-black uppercase tracking-widest group-hover:bg-green-600 group-hover:text-white transition-colors w-full">
            View List →
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
