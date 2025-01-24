import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
  message: string;
  redirectTo?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message, redirectTo }) => {
  const navigate = useNavigate();
  const [redirectLabel, setRedirectLabel] = useState('');

  useEffect(() => {
    if(redirectTo === '/')
      {
        setRedirectLabel('Got to Home');
      } 
    
      if (redirectLabel === '' || redirectLabel === null || redirectLabel === undefined) {
        setRedirectLabel('Go to Login');
      }
  }, [])

  const handleRedirect = () => {
    if (redirectTo) {
      navigate(redirectTo);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        {redirectTo && (
          <button
            onClick={handleRedirect}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            { redirectLabel }
            {/* Go to Login */}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
