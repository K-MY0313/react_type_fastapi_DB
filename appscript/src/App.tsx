import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage, SelectionPage } from './pages/LoginAndSelection';
import EmployeeGetForm from './pages/get';
import EmployeePostForm from './pages/post';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/selection" element={<SelectionPage />} />
      <Route path="/get" element={<EmployeeGetForm />} />
      <Route path="/post" element={<EmployeePostForm />} />
    </Routes>
  );
};

export default App;