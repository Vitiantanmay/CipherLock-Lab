
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="p-4 flex justify-between items-center text-white/80">
      <Link to="/" className="text-xl font-bold tracking-widest hover:text-white transition-colors duration-300">
        CIPHERLOCK LAB
      </Link>
      {!isHomePage && (
        <Link to="/" className="text-sm uppercase tracking-wider border border-white/30 px-3 py-1 rounded-md hover:bg-white hover:text-black transition-all duration-300">
          &larr; Home
        </Link>
      )}
    </header>
  );
};

export default Header;
