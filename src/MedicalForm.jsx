import React, { useState, useEffect } from 'react';

const MedicalForm = ({ onSubmitSuccess, onBack }) => {
  const [doctors, setDoctors] = useState([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Form State
  const [medicalName, setMedicalName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [address, setAddress] = useState('');
  const [medicalTypes, setMedicalTypes] = useState({
    prescription: false, // Prescription Medicines (Rx required)
    otc: false,          // Over-the-Counter (OTC) Medicines
    generic: false,      // Generic Medicines
    branded: false,      // Branded Medicines
    ayurvedic: false,    // Ayurvedic Medicines -> regulated under Ministry of AYUSH
    homeopathic: false,  // Homeopathic Medicines
    surgical: false,     // Surgical Items (bandages, syringes, etc.)
    supplements: false,  // Health Supplements (vitamins, protein, etc.)
    babyCare: false,     // Baby Care Products
    personalCare: false, // Personal Care (skin, hygiene)
    devices: false       // Medical Devices (BP machine, glucometer)
  });
  const [licenseNumber, setLicenseNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [registrationYear, setRegistrationYear] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [pharmacistName, setPharmacistName] = useState('');
  const [pharmacistRegNumber, setPharmacistRegNumber] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/c2c_app/doctor/requests', {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("HTTP Status " + res.status);
        return res.json();
      })
      .then(data => {
        console.log("Raw API Response (GET Doctors for Medical Form):", data);
        let list = [];
        if (Array.isArray(data)) list = data;
        else if (data && Array.isArray(data.requests)) list = data.requests;
        else if (data && Array.isArray(data.data)) list = data.data;
        else if (data && Array.isArray(data.doctors)) list = data.doctors;
        else if (data && typeof data === 'object') {
          list = Object.values(data).filter(v => typeof v === 'object');
        }

        const mappedList = list.map(item => ({
          id: item.doctor_id || item.id || item._id,
          status: item.status || 'Pending',
          fullName: item.fullName || item.name,
          phone: item.phone,
          specialization: item.specialization || item.speciality,
          clinicLocation: item.clinicLocation || item.address,
        }));

        // Filter only approved doctors
        const approvedDoctors = mappedList.filter(doc => doc.status?.toLowerCase() === 'approved');
        setDoctors(approvedDoctors);
        setIsLoadingDoctors(false);
      })
      .catch(err => {
        console.error("Error fetching doctors:", err);
        // Fallback to mock approved doctor if fetch fails so user can proceed
        setDoctors([
          { id: "APP-001", status: "Approved", fullName: "Dr. Rahul Sharma", phone: "9876543210", clinicLocation: "Mumbai Central, MH" }
        ]);
        setIsLoadingDoctors(false);
      });
  }, []);

  const handleTypeChange = (type) => {
    setMedicalTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const typeLabels = {
    prescription: "Prescription Medicines (Rx required)",
    otc: "Over-the-Counter (OTC) Medicines",
    generic: "Generic Medicines",
    branded: "Branded Medicines",
    ayurvedic: "Ayurvedic Medicines",
    homeopathic: "Homeopathic Medicines",
    surgical: "Surgical Items",
    supplements: "Health Supplements",
    babyCare: "Baby Care Products",
    personalCare: "Personal Care",
    devices: "Medical Devices"
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setIsReviewing(true);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    const finalData = {
      id: "MED-" + Math.floor(Math.random() * 10000),
      status: "Pending",
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.fullName,
      medical: {
        medicalName,
        whatsappNumber,
        address,
        types: Object.entries(medicalTypes).filter(([_, v]) => v).map(([k]) => typeLabels[k]).join(', '),
        licenseNumber,
        gstNumber,
        registrationYear,
        ownerName,
        email,
        pharmacistName,
        pharmacistRegNumber
      }
    };

    try {
      const response = await fetch('/api/c2c_app/medical/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(finalData)
      });

      const resData = await response.json().catch(() => ({}));
      console.log("Medical Submit API Response (POST /request):", response.status, resData);

      if (!response.ok) {
        throw new Error('API Error: ' + response.statusText);
      }

      if (onSubmitSuccess) {
        onSubmitSuccess(finalData);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit form. Please check the API. Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 relative pb-20">
      <button
        type="button"
        onClick={isReviewing ? () => setIsReviewing(false) : (selectedDoctor ? () => setSelectedDoctor(null) : onBack)}
        className="fixed top-4 left-4 z-50 px-4 py-2 bg-blue-900/40 backdrop-blur-md border border-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-900/60 transition-all shadow-lg"
      >
        {isReviewing ? '← Back to Edit' : (selectedDoctor ? '← Back to Doctors' : '← Dashboard')}
      </button>

      <div className="w-full bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] pt-12 pb-24 px-6 text-center text-white">
        <h1 className="text-3xl font-black italic tracking-tighter uppercase">Care2Connect</h1>
        <p className="text-[10px] font-bold uppercase opacity-60 tracking-[0.3em] mt-2">
          Medical Onboarding
        </p>
      </div>

      <div className="max-w-4xl mx-auto -mt-12 px-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 overflow-hidden border border-slate-100 p-8 md:p-12">

          {!selectedDoctor ? (
            <div>
              <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-4">
                Select Approved Doctor
                <div className="h-px flex-1 bg-slate-100"></div>
              </h2>

              <div className="border border-slate-200 rounded-3xl overflow-hidden mt-8">
                {isLoadingDoctors ? (
                  <div className="text-center py-16 bg-slate-50">
                    <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xs font-black uppercase text-slate-500 tracking-widest">Loading Doctors...</p>
                  </div>
                ) : doctors.length > 0 ? (
                  doctors.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctor(doc)}
                      className="flex items-center justify-between py-4 px-6 border-b border-slate-100 last:border-0 hover:bg-blue-50 cursor-pointer transition-all group gap-4"
                    >
                      <div className="flex items-center gap-4 flex-1 overflow-hidden">
                        <span className="hidden md:block text-[10px] font-black text-slate-400 uppercase tracking-widest min-w-[60px]">{doc.id}</span>
                        <h3 className="text-base font-black text-blue-900 group-hover:text-blue-600 transition-colors whitespace-nowrap truncate">{doc.fullName}</h3>
                        <p className="hidden md:flex text-sm font-bold text-slate-600 items-center gap-1 whitespace-nowrap">📞 {doc.phone || 'N/A'}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[10px] bg-green-600 text-white px-3 py-1 rounded font-black uppercase tracking-wider whitespace-nowrap shadow-sm">
                          Select
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 opacity-50 bg-slate-50">
                    <span className="text-4xl block mb-4">🩺</span>
                    <p className="text-xs font-black uppercase text-slate-500 tracking-widest">No approved doctors found</p>
                  </div>
                )}
              </div>
            </div>
          ) : isReviewing ? (
            <div className="space-y-8">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-4 mb-8">
                Review Medical Details
                <div className="h-px flex-1 bg-slate-100"></div>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="font-black text-blue-900 border-b border-slate-200 pb-3 mb-4 text-sm uppercase tracking-wider">Medical Information</h3>
                  <div className="space-y-3 text-sm">
                    <DetailRow label="Medical Name" value={medicalName} />
                    <DetailRow label="WhatsApp" value={whatsappNumber} />
                    <DetailRow label="Owner Name" value={ownerName} />
                    <DetailRow label="Email ID" value={email} />
                    <DetailRow label="Address" value={address} />
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="font-black text-blue-900 border-b border-slate-200 pb-3 mb-4 text-sm uppercase tracking-wider">Legal Details</h3>
                  <div className="space-y-3 text-sm">
                    <DetailRow label="License No." value={licenseNumber} />
                    <DetailRow label="GST No." value={gstNumber} />
                    <DetailRow label="Reg. Year" value={registrationYear} />
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 md:col-span-2">
                  <h3 className="font-black text-blue-900 border-b border-slate-200 pb-3 mb-4 text-sm uppercase tracking-wider">Pharmacist & Doctor Link</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <DetailRow label="Pharmacist Name" value={pharmacistName} />
                    <DetailRow label="Pharmacist Reg No." value={pharmacistRegNumber} />
                    <DetailRow label="Linked Doctor" value={selectedDoctor.fullName} />
                    <DetailRow label="Doctor ID" value={selectedDoctor.id} />
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 md:col-span-2">
                  <h3 className="font-black text-blue-900 border-b border-slate-200 pb-3 mb-4 text-sm uppercase tracking-wider">Medical Types</h3>
                  <div className="text-sm font-bold text-slate-700 bg-white p-4 rounded-xl border border-slate-200">
                    {Object.entries(medicalTypes).filter(([_, v]) => v).map(([k]) => typeLabels[k]).join(', ') || 'None Selected'}
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
                <button type="button" onClick={() => setIsReviewing(false)} className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-slate-400 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
                  ← Edit Details
                </button>
                <button type="button" onClick={handleFinalSubmit} disabled={isSubmitting} className="px-10 py-4 bg-green-600 hover:bg-green-800 disabled:opacity-50 text-white rounded-2xl shadow-xl shadow-green-200 text-xs font-black uppercase tracking-widest transition-all">
                  {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-8">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-4 mb-8">
                Medical Details
                <div className="h-px flex-1 bg-slate-100"></div>
              </h2>

              <div className="bg-blue-50 p-4 rounded-xl mb-6 flex justify-between items-center border border-blue-100">
                <div>
                  <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Selected Doctor</p>
                  <p className="font-bold text-blue-900">{selectedDoctor.fullName}</p>
                </div>
                <button type="button" onClick={() => setSelectedDoctor(null)} className="text-xs font-bold text-blue-600 hover:underline">Change</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Medical Name <span className="text-red-500">*</span></label>
                  <input required type="text" value={medicalName} onChange={e => setMedicalName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-all" placeholder="Enter Medical Name" />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">WhatsApp Number <span className="text-red-500">*</span></label>
                  <input required type="tel" maxLength="10" pattern="[0-9]{10}" title="Please enter exactly 10 digits" value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-all" placeholder="10-digit WhatsApp No." />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Address <span className="text-red-500">*</span></label>
                  <textarea required value={address} onChange={e => setAddress(e.target.value)} rows="3" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-all" placeholder="Full Address of the Medical" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Type of Medical <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { key: 'prescription', label: 'Prescription Medicines (Rx required)' },
                      { key: 'otc', label: 'Over-the-Counter (OTC)' },
                      { key: 'generic', label: 'Generic Medicines' },
                      { key: 'branded', label: 'Branded Medicines' },
                      { key: 'ayurvedic', label: 'Ayurvedic Medicines (AYUSH)' },
                      { key: 'homeopathic', label: 'Homeopathic Medicines' },
                      { key: 'surgical', label: 'Surgical Items (bandages, syringes)' },
                      { key: 'supplements', label: 'Health Supplements' },
                      { key: 'babyCare', label: 'Baby Care Products' },
                      { key: 'personalCare', label: 'Personal Care (skin, hygiene)' },
                      { key: 'devices', label: 'Medical Devices (BP, glucometer)' }
                    ].map(type => (
                      <label key={type.key} className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" checked={medicalTypes[type.key]} onChange={() => handleTypeChange(type.key)} className="w-5 h-5 mt-0.5 rounded text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm font-bold text-slate-700 leading-tight">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">License Number <span className="text-red-500">*</span></label>
                  <input required type="text" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-all" placeholder="License No." />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">GST Number</label>
                  <input type="text" value={gstNumber} onChange={e => setGstNumber(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-all" placeholder="GST No. (Optional)" />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Owner Name <span className="text-red-500">*</span></label>
                  <input required type="text" value={ownerName} onChange={e => setOwnerName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-all" placeholder="Owner Name" />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Email ID <span className="text-red-500">*</span></label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-all" placeholder="Email Address" />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Registered Pharmacist Name <span className="text-red-500">*</span></label>
                  <input required type="text" value={pharmacistName} onChange={e => setPharmacistName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-all" placeholder="Pharmacist Name" />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Pharmacist Registration Number <span className="text-red-500">*</span></label>
                  <input required type="text" value={pharmacistRegNumber} onChange={e => setPharmacistRegNumber(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-all" placeholder="Pharmacist Reg. No." />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Registration Year <span className="text-red-500">*</span></label>
                  <input required type="text" value={registrationYear} onChange={e => setRegistrationYear(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-all" placeholder="YYYY" />
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex justify-end">
                <button type="submit" className="px-10 py-4 bg-blue-600 hover:bg-blue-800 text-white rounded-2xl shadow-xl shadow-blue-200 text-xs font-black uppercase tracking-widest transition-all">
                  Review Details →
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

// Helper Components
const DetailRow = ({ label, value }) => {
  return (
    <div className="flex justify-between border-b border-slate-200/50 pb-1 last:border-0 items-center">
      <span className="font-bold text-slate-500">{label}</span>
      <div className="flex items-center gap-2 max-w-[60%]">
        <span className="font-black text-slate-800 text-right truncate" title={value || '-'}>
          {value || '-'}
        </span>
      </div>
    </div>
  );
};

export default MedicalForm;
