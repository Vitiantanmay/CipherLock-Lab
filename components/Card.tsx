
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-black/30 border border-gray-700 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/70 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
