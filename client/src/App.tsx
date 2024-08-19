import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import DataOverview from './pages/DataOverview';

const App: React.FC = () => {
  return (
    <Router>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-around">
          <Link to="/" className="text-white font-bold">Home</Link>
          <Link to="/overview" className="text-white font-bold">Overview</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<DataOverview />} />
      </Routes>
    </Router>
  );
};

export default App;
