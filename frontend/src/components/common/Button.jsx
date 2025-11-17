import React from 'react';

const Button = ({ children, variant = 'primary', fullWidth = false, className = '', ...props }) => {
  const baseClasses = 'inline-flex justify-center items-center py-2 px-4 gap-2 rounded-lg text-sm font-normal transition-colors duration-200 ease-in-out';

  const variants = {
    primary: 'bg-brota-black text-white hover:opacity-90',
    secondary: 'bg-white text-dark-text border border-border-color hover:bg-gray-50',
  };

  const widthClass = fullWidth ? 'w-full' : 'w-auto';

  const combinedClasses = `${baseClasses} ${variants[variant]} ${widthClass} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
