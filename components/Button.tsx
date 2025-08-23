import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface LinkButtonProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const commonClasses = "px-6 py-3 text-lg font-bold uppercase tracking-wider border-2 border-white/50 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white flex items-center justify-center text-center";
const hoverClasses = "hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.7)]";

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={`${commonClasses} ${hoverClasses} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

export const LinkButton: React.FC<LinkButtonProps> = ({ children, className, ...props }) => {
    return (
        <Link className={`${commonClasses} ${hoverClasses} ${className || ''}`} {...props}>
            {children}
        </Link>
    );
}
