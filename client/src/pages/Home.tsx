import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useQuery } from '@tanstack/react-query';

const fetchUsersCount = async () => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const data = await response.json();
  // Assuming the response is an array of users
  return data.length;
};

const fetchInvoicesCount = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/invoices', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch invoices');
  }
  const data = await response.json();
  // Assuming the response is an array of invoices
  return data.length;
};

const Home = () => {
  useEffect(() => {
    document.title = 'Invoice App';
  }, []);

  const usersQuery = useQuery({
    queryKey: ['usersCount'],
    queryFn: fetchUsersCount,
    // Only fetch if logged in
    enabled: !!localStorage.getItem('token'),
    refetchOnWindowFocus: false,
  });

  const invoicesQuery = useQuery({
    queryKey: ['invoicesCount'],
    queryFn: fetchInvoicesCount,
    // Only fetch if logged in
    enabled: !!localStorage.getItem('token'),
    refetchOnWindowFocus: false,
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-6">Welcome to Invoice App</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* User Counts Widget */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">User Counts</h3>
            <p className="mt-2 text-3xl font-bold text-blue-500">
              {usersQuery.isSuccess ? usersQuery.data : 0}
            </p>
          </div>

          {/* Invoice Counts Widget */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Invoice Counts</h3>
            <p className="mt-2 text-3xl font-bold text-blue-500">
              {invoicesQuery.isSuccess ? invoicesQuery.data : 0}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
