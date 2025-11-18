import React from 'react';
import { FiX } from 'react-icons/fi';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-[10px] shadow-lg outline outline-1 outline-offset-[-1px] outline-black/10 w-[512px]">
        <div className="p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
            <FiX className="w-6 h-6" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
