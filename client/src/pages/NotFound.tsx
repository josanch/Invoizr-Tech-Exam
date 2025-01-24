import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  let error = '404 - Page Not Found';
  useEffect(() => {
    if (error === '404 - Page Not Found') {
      // Redirect to login page
      //navigate('/');
    }
  }, [error]);

  return (

      <ErrorPage message={error} redirectTo="/" />

  );
};

export default NotFound;
