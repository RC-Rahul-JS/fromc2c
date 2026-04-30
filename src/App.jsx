import React, { useState, useEffect } from 'react';
import jsonfile from '../1.json';

const DoctorAdminPortal = () => {
  // --- STATE: STEP TRACKING ---
  const [currentStep, setCurrentStep] = useState(1);

  // --- ALL ORIGINAL DATA PRESERVED ---
  const [onboarding, setOnboarding] = useState({
    fullName: '', phone: '', title: '', specialization: '', gender: '', city: '',
    registrationNumber: '', registrationCouncil: '', registrationYear: '',
    degree: '', college: '', completionYear: '', experience: '',
    clinicLocation: '', state: '', timings: '', fees: '', terms: false, status: 'Pending'
  });

  const [essentials, setEssentials] = useState({
    name: "", email: "", phone: "", secondaryId: "", speciality: "", experience: "",
    address: "", district: "", state: "", password: "", confirmPassword: "",
    phonenumberID: "", whatsAppBusinessAccountID: "", doctorfee: "",
    appointmentfee: "", otcfee: "", platformfee: "", appointmentdatelimit: "", role: "doctor"
  });

  const [cityList, setCityList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [degreeList, setDegreeList] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({
    idProof: null, registrationDoc: null, hospitalId: null, photo: null
  });

  // --- ALL ORIGINAL LOGIC PRESERVED ---
  useEffect(() => {
    if (jsonfile && jsonfile.length > 0) {
      const states = [...new Set(jsonfile.map(item => item.state))].filter(Boolean);
      setCityList(states);
    }
  }, []);

  useEffect(() => {
    const currentState = onboarding.state || essentials.state;
    if (currentState) {
      const filteredData = jsonfile.filter(item => item.state === currentState);
      setDegreeList([...new Set(filteredData.map(item => item.course))].filter(Boolean));
      setCollegeList([...new Set(filteredData.map(item => item.college))].filter(Boolean));
    }
  }, [onboarding.state, essentials.state]);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFiles(prev => ({ ...prev, [field]: { file, preview: reader.result } }));
    };
    reader.readAsDataURL(file);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (essentials.password !== essentials.confirmPassword) return alert("Passwords do not match!");
    if (!onboarding.terms) return alert("Please accept the Terms & Conditions");

    const finalData = { onboarding, essentials, documents: uploadedFiles };
    console.log("FINAL_JSON_SAVE:", JSON.stringify(finalData, null, 2));
    alert("Profile Synchronized Successfully!");
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* Care2Connect Header Theme */}
      <div className="w-full bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] pt-12 pb-24 px-6 text-center text-white">
        <h1 className="text-3xl font-black italic tracking-tighter uppercase">Care2Connect</h1>
        <p className="text-[10px] font-bold uppercase opacity-60 tracking-[0.3em] mt-2">Horizontal Admin Workflow</p>
        
        {/* Step Progress Bar */}
        <div className="max-w-2xl mx-auto mt-10 flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/20 -translate-y-1/2 z-0"></div>
          {[1, 2, 3, 4, 5].map(step => (
            <div key={step} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all duration-500 ${currentStep >= step ? 'bg-white text-blue-900 shadow-xl scale-110' : 'bg-blue-800 text-blue-300 border border-white/20'}`}>
              {step}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto -mt-12 px-4 pb-20">
        <form onSubmit={handleFinalSubmit} className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 overflow-hidden border border-slate-100">
          
          <div className="p-8 md:p-12">
            {/* Step 1: Identity */}
            {currentStep === 1 && (
              <StepWrapper title="Identity & Contacts">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full Name" value={onboarding.fullName} onChange={v => { setOnboarding({...onboarding, fullName: v}); setEssentials({...essentials, name: v}); }} />
                  <Input label="Email Address" type="email" value={essentials.email} onChange={v => setEssentials({...essentials, email: v})} />
                  <Input label="Primary Phone" type="tel" value={onboarding.phone} onChange={v => { setOnboarding({...onboarding, phone: v.replace(/[^0-9]/g, '')}); setEssentials({...essentials, phone: v.replace(/[^0-9]/g, '')}); }} />
                  <Input label="Secondary ID" value={essentials.secondaryId} onChange={v => setEssentials({...essentials, secondaryId: v})} />
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Gender Selection</label>
                    <div className="flex gap-3">
                      {['Male', 'Female', 'Other'].map(g => (
                        <button key={g} type="button" onClick={() => setOnboarding({...onboarding, gender: g})}
                          className={`flex-1 py-4 text-xs font-black rounded-2xl border-2 transition-all ${onboarding.gender === g ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400'}`}>
                          {g.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </StepWrapper>
            )}

            {/* Step 2: Academic */}
            {currentStep === 2 && (
              <StepWrapper title="Academic & Medical License">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SearchableDropdown label="Practice State" options={cityList} value={onboarding.state} onChange={v => { setOnboarding({...onboarding, state: v}); setEssentials({...essentials, state: v}); }} />
                  <SearchableDropdown label="Medical College" options={collegeList} value={onboarding.college} onChange={v => setOnboarding({...onboarding, college: v})} />
                  <SearchableDropdown label="Primary Degree" options={degreeList} value={onboarding.degree} onChange={v => setOnboarding({...onboarding, degree: v})} />
                  <Input label="Completion Year" value={onboarding.completionYear} onChange={v => setOnboarding({...onboarding, completionYear: v})} />
                  <Input label="Registration Number" value={onboarding.registrationNumber} onChange={v => setOnboarding({...onboarding, registrationNumber: v})} />
                  <Input label="Specialization" value={onboarding.specialization} onChange={v => { setOnboarding({...onboarding, specialization: v}); setEssentials({...essentials, speciality: v}); }} />
                </div>
              </StepWrapper>
            )}

            {/* Step 3: Clinical */}
            {currentStep === 3 && (
              <StepWrapper title="Clinic & Fee Configuration">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Clinic Address" value={onboarding.clinicLocation} onChange={v => { setOnboarding({...onboarding, clinicLocation: v}); setEssentials({...essentials, address: v}); }} />
                  <Input label="Operational Hours" value={onboarding.timings} onChange={v => setOnboarding({...onboarding, timings: v})} />
                </div>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <FeeInput label="Doc Fee" value={onboarding.fees} onChange={v => { setOnboarding({...onboarding, fees: v}); setEssentials({...essentials, doctorfee: v}); }} />
                  <FeeInput label="Appt Fee" value={essentials.appointmentfee} onChange={v => setEssentials({...essentials, appointmentfee: v})} />
                  <FeeInput label="OTC Fee" value={essentials.otcfee} onChange={v => setEssentials({...essentials, otcfee: v})} />
                  <FeeInput label="Platform" value={essentials.platformfee} onChange={v => setEssentials({...essentials, platformfee: v})} />
                </div>
              </StepWrapper>
            )}

            {/* Step 4: Documents */}
            {currentStep === 4 && (
              <StepWrapper title="Document Verification Vault">
                <div className="grid grid-cols-2 gap-4">
                  <FileBox label="ID PROOF" field="idProof" file={uploadedFiles.idProof} onChange={handleFileChange} />
                  <FileBox label="REG. DOC" field="registrationDoc" file={uploadedFiles.registrationDoc} onChange={handleFileChange} />
                  <FileBox label="HOSP ID" field="hospitalId" file={uploadedFiles.hospitalId} onChange={handleFileChange} />
                  <FileBox label="PHOTO" field="photo" file={uploadedFiles.photo} onChange={handleFileChange} />
                </div>
              </StepWrapper>
            )}

            {/* Step 5: Finalize */}
            {currentStep === 5 && (
              <StepWrapper title="Security & Confirmation">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <Input label="Admin Password" type="password" value={essentials.password} onChange={v => setEssentials({...essentials, password: v})} />
                  <Input label="Confirm Password" type="password" value={essentials.confirmPassword} onChange={v => setEssentials({...essentials, confirmPassword: v})} />
                </div>
                <label className="flex items-center gap-4 p-6 bg-blue-50 rounded-2xl border border-blue-100 cursor-pointer mb-8">
                  <input type="checkbox" checked={onboarding.terms} onChange={e => setOnboarding({...onboarding, terms: e.target.checked})} className="w-6 h-6 rounded text-blue-600" />
                  <span className="text-xs font-black text-blue-900 uppercase tracking-tighter">I certify all information is correct.</span>
                </label>
                <button type="submit" className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-200 uppercase tracking-widest text-sm">
                  Complete Synchronization
                </button>
              </StepWrapper>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="bg-slate-50 p-6 flex justify-between items-center border-t border-slate-100">
            <button type="button" onClick={prevStep} disabled={currentStep === 1} className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${currentStep === 1 ? 'opacity-0' : 'text-slate-400 hover:text-blue-600'}`}>
              ← Back
            </button>
            {currentStep < 5 && (
              <button type="button" onClick={nextStep} className="bg-white border-2 border-blue-600 text-blue-600 px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                Next Step →
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

/* --- HELPERS --- */
const StepWrapper = ({ title, children }) => (
  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
    <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-4">
      {title}
      <div className="h-px flex-1 bg-slate-100"></div>
    </h2>
    {children}
  </div>
);

const Input = ({ label, value, onChange, type = "text" }) => (
  <div className="flex flex-col">
    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">{label}</label>
    <input required type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm font-bold outline-none focus:bg-white focus:border-blue-600 transition-all" />
  </div>
);

const FeeInput = ({ label, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-[9px] font-black text-blue-900 uppercase mb-1.5 ml-1">{label} (₹)</label>
    <input required type="number" value={value} onChange={e => onChange(e.target.value)} className="w-full bg-white border border-slate-200 p-3 rounded-xl text-sm font-black text-blue-600 outline-none" />
  </div>
);

const FileBox = ({ label, field, file, onChange }) => (
  <div className="relative h-32 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center bg-slate-50 hover:bg-blue-50 transition-all cursor-pointer overflow-hidden group">
    {file ? <img src={file.preview} className="absolute inset-0 w-full h-full object-cover" alt="Preview" /> : <div className="text-center"><span className="text-2xl">📁</span><p className="text-[9px] font-black text-slate-400 mt-2 uppercase">{label}</p></div>}
    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => onChange(e, field)} />
  </div>
);

const SearchableDropdown = ({ label, options, value, onChange }) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col relative">
      <label className="text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">{label}</label>
      <input className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm font-bold outline-none focus:bg-white focus:border-blue-600" value={open ? search : value} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 200)} onChange={e => setSearch(e.target.value)} placeholder="Select..." />
      {open && (
        <div className="absolute top-[105%] left-0 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 max-h-40 overflow-y-auto p-2">
          {options.filter(o => o.toLowerCase().includes(search.toLowerCase())).map((o, i) => (
            <div key={i} onMouseDown={() => {onChange(o); setOpen(false);}} className="p-3 text-[11px] font-bold text-slate-600 hover:bg-blue-600 hover:text-white cursor-pointer rounded-xl transition-all">{o}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAdminPortal;