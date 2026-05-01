import React, { useState } from 'react';

const AdminDashboard = ({ submissions, onBack, onAction }) => {
  const [selectedForm, setSelectedForm] = useState(null);

  // If no submissions are passed, use some mock data so the UI isn't empty
  const displaySubmissions = submissions && submissions.length > 0 ? submissions : [
    {
      id: "APP-001",
      status: "Pending",
      date: new Date().toISOString().split('T')[0],
      onboarding: {
        fullName: "Dr. Rahul Sharma",
        phone: "9876543210",
        gender: "Male",
        state: "Maharashtra",
        college: "AIIMS Delhi",
        degree: "MBBS, MD",
        completionYear: "2015",
        registrationNumber: "REG12345M",
        specialization: "Cardiology",
        clinicLocation: "Mumbai Central, MH",
        timings: "10:00 AM - 06:00 PM",
        fees: "1500",
      },
      essentials: {
        email: "rahul.sharma@example.com",
        secondaryId: "PAN-ABCDE1234F",
        appointmentfee: "1500",
        otcfee: "200",
        platformfee: "100"
      },
      documents: {
        idProof: { preview: "https://via.placeholder.com/150" },
        registrationDoc: { preview: "https://via.placeholder.com/150" },
        hospitalId: null,
        photo: { preview: "https://via.placeholder.com/150" }
      }
    }
  ];

  const handleAction = (id, actionType) => {
    if (onAction) {
      onAction(id, actionType);
    }
    if (selectedForm && selectedForm.id === id) {
      setSelectedForm({ ...selectedForm, status: actionType });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex flex-col">
      {/* Admin Header Theme */}
      <div className="w-full bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] pt-10 pb-20 px-6 text-center text-white relative">
        <button onClick={onBack} className="absolute left-6 top-10 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
          ← Back to Portal
        </button>
        <h1 className="text-3xl font-black italic tracking-tighter uppercase">Care2Connect</h1>
        <p className="text-[10px] font-bold uppercase opacity-60 tracking-[0.3em] mt-2">Admin Approval Dashboard</p>
      </div>

      <div className="max-w-7xl mx-auto -mt-12 px-4 pb-20 w-full flex-1 flex gap-6 flex-col md:flex-row">
        
        {/* Left Column: List of Forms */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 border border-slate-100 p-6 flex-1 overflow-y-auto max-h-[800px]">
            <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-4">
              Submitted Forms
              <div className="h-px flex-1 bg-slate-100"></div>
            </h2>
            
            <div className="space-y-4">
              {displaySubmissions.map((sub) => (
                <div 
                  key={sub.id} 
                  onClick={() => setSelectedForm(sub)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedForm?.id === sub.id ? 'border-blue-600 bg-blue-50' : 'border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-black text-slate-400">{sub.id}</span>
                    <span className={`text-[10px] px-2 py-1 rounded font-black uppercase ${
                      sub.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      sub.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {sub.status || 'Pending'}
                    </span>
                  </div>
                  <h3 className="font-bold text-blue-900">{sub.onboarding?.fullName || 'Unknown Doctor'}</h3>
                  <p className="text-xs text-slate-500 mt-1">{sub.onboarding?.specialization || 'N/A'} • {sub.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Form Details */}
        <div className="w-full md:w-2/3">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-slate-100 overflow-hidden h-full flex flex-col">
            {!selectedForm ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400">
                <div className="text-6xl mb-4 opacity-50">📄</div>
                <h3 className="text-xl font-black text-slate-600">Select a Form</h3>
                <p className="text-sm font-bold mt-2">Click on a submission from the list to view details and take action.</p>
              </div>
            ) : (
              <>
                <div className="p-8 md:p-10 flex-1 overflow-y-auto">
                  <div className="flex justify-between items-end mb-8 pb-6 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{selectedForm.id}</span>
                      <h2 className="text-3xl font-black text-slate-800 mt-1">{selectedForm.onboarding?.fullName}</h2>
                    </div>
                    <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
                      selectedForm.status === 'Approved' ? 'bg-green-100 text-green-700 border-2 border-green-200' :
                      selectedForm.status === 'Rejected' ? 'bg-red-100 text-red-700 border-2 border-red-200' :
                      'bg-amber-100 text-amber-700 border-2 border-amber-200'
                    }`}>
                      {selectedForm.status || 'Pending'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Section 1 */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <h3 className="font-black text-blue-900 border-b border-slate-200 pb-3 mb-4 text-sm uppercase tracking-wider">Identity & Contact</h3>
                      <div className="space-y-3 text-sm">
                        <DetailRow label="Email" value={selectedForm.essentials?.email} />
                        <DetailRow label="Phone" value={selectedForm.onboarding?.phone} />
                        <DetailRow label="Gender" value={selectedForm.onboarding?.gender} />
                        <DetailRow label="Secondary ID" value={selectedForm.essentials?.secondaryId} />
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <h3 className="font-black text-blue-900 border-b border-slate-200 pb-3 mb-4 text-sm uppercase tracking-wider">Academic Profile</h3>
                      <div className="space-y-3 text-sm">
                        <DetailRow label="Degree" value={selectedForm.onboarding?.degree} />
                        <DetailRow label="College" value={selectedForm.onboarding?.college} />
                        <DetailRow label="State" value={selectedForm.onboarding?.state} />
                        <DetailRow label="Reg. Number" value={selectedForm.onboarding?.registrationNumber} />
                        <DetailRow label="Specialization" value={selectedForm.onboarding?.specialization} />
                      </div>
                    </div>

                    {/* Section 3 */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 md:col-span-2">
                      <h3 className="font-black text-blue-900 border-b border-slate-200 pb-3 mb-4 text-sm uppercase tracking-wider">Clinic & Operations</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <DetailRow label="Address" value={selectedForm.onboarding?.clinicLocation} />
                        <DetailRow label="Timings" value={selectedForm.onboarding?.timings} />
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <DetailRow label="Doctor Fee" value={`₹${selectedForm.onboarding?.fees || 0}`} />
                          <DetailRow label="Appt Fee" value={`₹${selectedForm.essentials?.appointmentfee || 0}`} />
                          <DetailRow label="OTC Fee" value={`₹${selectedForm.essentials?.otcfee || 0}`} />
                          <DetailRow label="Platform Fee" value={`₹${selectedForm.essentials?.platformfee || 0}`} />
                        </div>
                      </div>
                    </div>

                    {/* Section 4 */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 md:col-span-2">
                      <h3 className="font-black text-blue-900 border-b border-slate-200 pb-3 mb-4 text-sm uppercase tracking-wider">Document Verification</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <DocPreview label="ID Proof" doc={selectedForm.documents?.idProof} />
                        <DocPreview label="Reg Doc" doc={selectedForm.documents?.registrationDoc} />
                        <DocPreview label="Hosp ID" doc={selectedForm.documents?.hospitalId} />
                        <DocPreview label="Photo" doc={selectedForm.documents?.photo} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="bg-slate-50 p-6 md:p-8 flex items-center justify-end gap-4 border-t border-slate-100">
                  {selectedForm.status !== 'Rejected' && (
                    <button 
                      onClick={() => handleAction(selectedForm.id, 'Rejected')}
                      className="px-8 py-4 bg-white border-2 border-red-100 text-red-600 hover:bg-red-50 hover:border-red-600 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                    >
                      ✗ Reject Profile
                    </button>
                  )}
                  {selectedForm.status !== 'Approved' && (
                    <button 
                      onClick={() => handleAction(selectedForm.id, 'Approved')}
                      className="px-8 py-4 bg-blue-600 hover:bg-blue-800 text-white rounded-2xl shadow-xl shadow-blue-200 text-xs font-black uppercase tracking-widest transition-all"
                    >
                      ✓ Approve Onboarding
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between border-b border-slate-200/50 pb-1 last:border-0">
    <span className="font-bold text-slate-500">{label}</span>
    <span className="font-black text-slate-800 text-right max-w-[60%] truncate" title={value || '-'}>{value || '-'}</span>
  </div>
);

const DocPreview = ({ label, doc }) => (
  <div className="flex flex-col items-center">
    <div className={`w-full h-24 rounded-xl flex items-center justify-center border-2 overflow-hidden bg-white mb-2 ${doc ? 'border-green-200' : 'border-slate-200 border-dashed'}`}>
      {doc && doc.preview ? (
        <img src={doc.preview} alt={label} className="w-full h-full object-cover" />
      ) : doc ? (
        <span className="text-3xl">📄</span>
      ) : (
        <span className="text-xs font-bold text-slate-300">MISSING</span>
      )}
    </div>
    <span className="text-[10px] font-black uppercase text-slate-500">{label}</span>
  </div>
);

export default AdminDashboard;
