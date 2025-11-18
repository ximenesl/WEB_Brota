import React from 'react';

const Select = ({ children, className = '', label, ...props }) => {
  const baseClasses = "w-full h-[36px] py-1 px-3 pr-8 bg-input-background border border-transparent rounded-lg text-sm text-dark-text appearance-none cursor-pointer focus:outline-none focus:border-primary";
  
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <div className="relative w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="relative w-full">
        <select className={combinedClasses} {...props}>
          {children}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="var(--color-secondary-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
