import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BillSplitter from './components/BillSplitter';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<BillSplitter />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
