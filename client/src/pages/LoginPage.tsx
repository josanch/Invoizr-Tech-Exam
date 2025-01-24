import React, { useEffect } from 'react';
import Layout from "../components/Layout/Layout";
import Login from "../components/Login";

const LoginPage = () => {

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh] bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

          <Login />
          
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
