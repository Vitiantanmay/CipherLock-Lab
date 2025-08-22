
import React from 'react';
import { LinkButton } from '../components/Button';
import CssCube from '../components/CssCube';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh]">
      <div className="mb-8">
        <CssCube />
      </div>
      <h1 className="text-5xl md:text-7xl font-bold tracking-widest mb-4 animate-pulse">
        CIPHERLOCK LAB
      </h1>
      <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-12">
        Learn digital locks, logic gates, and ciphers interactively.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <LinkButton to="/lock">Digital Lock</LinkButton>
        <LinkButton to="/gates">Logic Gates</LinkButton>
        <LinkButton to="/ciphers">Ciphers</LinkButton>
      </div>
    </div>
  );
};

export default HomePage;
