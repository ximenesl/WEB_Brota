import React from 'react';

const Input = ({ icon, className = '', ...props }) => {
  const hasIcon = !!icon;
  
  const baseInputClasses = "w-full h-[36px] py-1 px-3 bg-input-background border border-transparent rounded-lg text-sm text-dark-text transition-colors duration-200 ease-in-out placeholder:text-light-text focus:outline-none focus:border-primary";
  const paddingClass = hasIcon ? 'pl-10' : 'pl-3';

  const combinedClasses = `${baseInputClasses} ${paddingClass} ${className}`;

  return (
    <div className="relative w-full">
      {hasIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-text flex items-center justify-center">
          {icon}
        </div>
      )}
      <input className={combinedClasses} {...props} />
    </div>
  );
};

export default Input;
