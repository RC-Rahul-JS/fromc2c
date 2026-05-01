import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Form from './Form';
import List from './List';

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'form', 'list'
  const [allSubmissions, setAllSubmissions] = useState([]);

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
    </>
  );
};

export default App;