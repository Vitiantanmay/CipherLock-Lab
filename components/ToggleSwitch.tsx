
import React from 'react';

interface ToggleSwitchProps {
  isOn: boolean;
  handleToggle: () => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, handleToggle, disabled = false }) => {
  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      className={`relative w-20 h-10 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
        isOn ? 'bg-green-500/50' : 'bg-gray-700'
      } ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]'}`}
    >
      <div
        className={`bg-white w-8 h-8 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          isOn ? 'translate-x-10' : 'translate-x-0'
        }`}
      />
      <span className={`absolute font-bold text-lg ${isOn ? 'left-3 text-white' : 'right-3 text-gray-300'}`}>
        {isOn ? '1' : '0'}
      </span>
    </button>
  );
};

export default ToggleSwitch;
