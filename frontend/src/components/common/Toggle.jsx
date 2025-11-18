import React from 'react';

const Toggle = ({ label, description, enabled, onToggle }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-sm font-normal font-['Arimo'] leading-4 text-neutral-950">{label}</span>
        <span className="text-sm font-normal font-['Arimo'] leading-5 text-gray-500">{description}</span>
      </div>
      <button
        type="button"
        className={`w-8 h-5 rounded-full outline outline-1 outline-offset-[-1px] outline-black/0 flex items-center transition-colors ${
          enabled ? 'bg-gray-950' : 'bg-neutral-300'
        }`}
        onClick={onToggle}
      >
        <span
          className={`w-4 h-4 relative bg-white rounded-full transition-transform ${
            enabled ? 'transform translate-x-3.5' : 'transform translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;
