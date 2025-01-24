import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

const sizeClasses = {
  small: 'max-w-sm',
  medium: 'max-w-md',
  large: 'max-w-2xl',
};

const InvoiceModal: React.FC<ModalProps> = ({ isOpen, onClose, size = 'medium', children }) => {
  if (!isOpen) return null;

  return (
    <div
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.82)' }} 
        className="fixed inset-0 flex items-center justify-center z-50">
      <div className={`w-full ${sizeClasses[size]} bg-white rounded-lg shadow-lg overflow-hidden`}>
        <div className="p-4">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 float-right"
          >
            &times;
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default InvoiceModal;
