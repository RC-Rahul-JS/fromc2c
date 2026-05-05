import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Form from './Form';
import List from './List';
import MedicalForm from './MedicalForm';
import MedicalList from './MedicalList';

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'form', 'list', 'medical-form', 'medical-list'
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [medicalSubmissions, setMedicalSubmissions] = useState([]);

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const handleFormSubmit = (finalData) => {
    setAllSubmissions(prev => [...prev, finalData]);
    setCurrentView('dashboard');
  };

  const handleListAction = (id, actionType) => {
    setAllSubmissions(prev => prev.map(sub => sub.id === id ? { ...sub, status: actionType } : sub));
  };

  const handleMedicalFormSubmit = (finalData) => {
    setMedicalSubmissions(prev => [...prev, finalData]);
    setCurrentView('dashboard');
  };

  const handleMedicalListAction = (id, actionType) => {
    setMedicalSubmissions(prev => prev.map(sub => sub.id === id ? { ...sub, status: actionType } : sub));
  };

  return (
    <>
      {currentView === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      
      {currentView === 'form' && (
        <Form 
          onSubmitSuccess={handleFormSubmit} 
          onBack={() => handleNavigate('dashboard')} 
        />
      )}
      
      {currentView === 'list' && (
        <List 
          submissions={allSubmissions} 
          onBack={() => handleNavigate('dashboard')} 
          onAction={handleListAction}
        />
      )}

      {currentView === 'medical-form' && (
        <MedicalForm 
          onSubmitSuccess={handleMedicalFormSubmit} 
          onBack={() => handleNavigate('dashboard')} 
        />
      )}

      {currentView === 'medical-list' && (
        <MedicalList 
          submissions={medicalSubmissions} 
          onBack={() => handleNavigate('dashboard')} 
          onAction={handleMedicalListAction}
        />
      )}
    </>
  );
};

export default App;