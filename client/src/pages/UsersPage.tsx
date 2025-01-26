import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useQuery } from '@tanstack/react-query'
import {
    getCoreRowModel,
    createColumnHelper,
    useReactTable,
  } from '@tanstack/react-table';
import ErrorPage from './ErrorPage';

const fetchUsers = async () => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Unauthorized: Token missing');
        }
        const response = await fetch('http://localhost:3000/users/', {
                headers: {
                    // Add the Bearer token
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        );
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch Users');
        }
        return response.json();
    } catch (error: any) {
        throw new Error(error.message || 'An unexpected error occurred');
    }

};

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    document.title = "Profile";
  }, []);

  useEffect(() => {
    if (!token) {
      // Redirect if no token
      navigate('/login');
    }
  }, [navigate]);

  if (!token) {
    // Prevent rendering page if no token
    return null;
  }
  
  // Fetch data using React Query
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    enabled: !!token,
  });

 // Define table columns 
 const columnHelper = createColumnHelper<any>();

 const columns = [
     columnHelper.accessor('id', {
       header: 'ID',
       cell: (info) => info.getValue(),
     }),
     columnHelper.accessor('username', {
       header: 'Username',
       cell: (info) => info.getValue(),
     }),
     columnHelper.accessor('email', {
       header: 'Email',
       cell: (info) => info.getValue(),
     }),
     columnHelper.accessor('name', {
       header: 'Name',
       cell: (info) => info.getValue(),
     }),
   ];

  // Create table instance
  const table = useReactTable({
    data: users || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // if(isLoading !== true && isError == false){
  //   return null;
  // }

  if (isLoading) {
    return (
      <Layout>
        <p>Loading Users...</p>
      </Layout>
    );
  }

  if (isError){
    return(
        <Layout>
            <ErrorPage message={error?.message || 'An error occurred'} redirectTo="/login" />
        </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50">
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Users</h2>
          <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-white bg-blue-400">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-white bg-blue-400">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-white bg-blue-400">User Name</th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-white bg-blue-400">Name</th>
              </tr>
            </thead>
            <tbody>
                {users && users.map((user: any) => (
                <tr
                    key={user.id}  
                    className="hover:bg-gray-100"
                    >
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{user.id}</td>                        
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{user.username}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{user.name}</td>                    
                </tr>
                ))}                
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default UsersPage;
