import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Expenses } from './components/Expenses';
import { Income } from './components/Income';
import { Goal } from './components/Goal';
import { Financialplan } from './components/Financialplan';
import { Header } from './components/Header';
import { GlobalProvider } from './components/globalContext';

const App = () => {
  const navigationStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    margin: '0 auto',
    marginTop: '40px'
  };

  const bubbleStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2vh',
    width: '16%',
    marginTop: '10px',
    borderRadius: '25%',
    backgroundColor: 'bisque'
  };

  return (
    <GlobalProvider> {/* Ensure that the context wraps the components */}
      <Router>
        <Header />
        <div id='Navigation' style={navigationStyle}>
          <div style={bubbleStyle}>
            <Link to="/financial-plan" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>Financial Plan</h2>
            </Link>
          </div>
          <div style={bubbleStyle}>
            <Link to="/goal" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>Saving for Goal</h2>
            </Link>
          </div>
          <div style={bubbleStyle}>
            <Link to="/income" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>Income</h2>
            </Link>
          </div>
          <div style={bubbleStyle}>
            <Link to="/expenses" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>Expenses</h2>
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Financialplan />} />
          <Route path="/financial-plan" element={<Financialplan />} />
          <Route path="/goal" element={<Goal />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
};

export default App;
