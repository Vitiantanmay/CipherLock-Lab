
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DigitalLockPage from './pages/DigitalLockPage';
import LogicGatesPage from './pages/LogicGatesPage';
import CipherLabPage from './pages/CipherLabPage';
import Header from './components/Header';

function App(): React.ReactNode {
  return (
    <HashRouter>
      <div className="bg-black text-white min-h-screen font-['Orbitron'] antialiased">
        <Header />
        <main className="p-4 md:p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lock" element={<DigitalLockPage />} />
            <Route path="/gates" element={<LogicGatesPage />} />
            <Route path="/ciphers" element={<CipherLabPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
