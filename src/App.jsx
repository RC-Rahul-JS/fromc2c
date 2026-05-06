import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Form from './Form';
import List from './List';
import MedicalForm from './MedicalForm';
import MedicalList from './MedicalList';

const App = () => {
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [medicalSubmissions, setMedicalSubmissions] = useState([]);

  const handleFormSubmit = (finalData) => {
    setAllSubmissions(prev => [...prev, finalData]);
  };

  const handleListAction = (id, actionType) => {
    setAllSubmissions(prev => prev.map(sub => sub.id === id ? { ...sub, status: actionType } : sub));
  };

  const handleMedicalFormSubmit = (finalData) => {
    setMedicalSubmissions(prev => [...prev, finalData]);
  };

  const handleMedicalListAction = (id, actionType) => {
    setMedicalSubmissions(prev => prev.map(sub => sub.id === id ? { ...sub, status: actionType } : sub));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashbord" element={<Navigate to="/dashboard" replace />} />
        
        <Route path="/form" element={
          <Form 
            onSubmitSuccess={handleFormSubmit} 
          />
        } />
        
        <Route path="/list" element={
          <List 
            submissions={allSubmissions} 
            onAction={handleListAction}
          />
        } />

        <Route path="/medical-form" element={
          <MedicalForm 
            onSubmitSuccess={handleMedicalFormSubmit} 
          />
        } />

        <Route path="/medical-list" element={
          <MedicalList 
            submissions={medicalSubmissions} 
            onAction={handleMedicalListAction}
          />
        } />

        {/* Catch-all route -> Redirects to Dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;