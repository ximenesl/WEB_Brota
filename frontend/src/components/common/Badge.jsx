import React from 'react';

const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const baseClasses = 'inline-block py-1 px-3 rounded-full text-xs font-medium capitalize';

  const variants = {
    disponivel: 'bg-status-disponivel text-white',
    esgotado: 'bg-status-esgotado text-white',
    estoquebaixo: 'bg-status-estoque-baixo text-white',
    default: 'bg-secondary-text text-white',
  };

  const normalizedVariant = children?.toString().toLowerCase().replace(' ', '') || variant;

  const combinedClasses = `${baseClasses} ${variants[normalizedVariant] || variants.default} ${className}`;

  return (
    <span className={combinedClasses} {...props}>
      {children}
    </span>
  );
};

export default Badge;
