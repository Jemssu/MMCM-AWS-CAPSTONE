import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import LandingPage from './web_user/LandingPage.jsx';
import AdminPage from "./web_admin/AdminPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} /> {/* optional */}
      </Routes>
    </Router>
  );
}

export default App;
