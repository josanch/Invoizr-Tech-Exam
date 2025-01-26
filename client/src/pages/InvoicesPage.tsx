import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useAppDispatch, useAppSelector } from '../hooks';
import Layout from "../components/Layout/Layout";
import InvoicesTable from "../components/Invoices/InvoicesTable";
//import { fetchInvoices, selectInvoices } from '../store/invoicesSlice';
//import ErrorPage from "./ErrorPage";

const InvoicesPage = () => {
  const navigate = useNavigate();
  //const dispatch = useAppDispatch();
  //const { invoices, isLoading, error } = useAppSelector(selectInvoices);

  const token = localStorage.getItem('token');

  useEffect(() => {
    document.title = "Login";
  }, []);

  useEffect(() => {
    if (!token) {
      // Redirect if no token
      navigate('/login');
    }
  }, [navigate]);  

  return (
    <>
    <Layout>
      {
        token === null ? null :
        <div className="flex flex-col items-center justify-center min-h- bg-gray-50">
        <div className="w-full max-w-6xl p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Invoices
          </h2>
          
          <InvoicesTable />
          
        </div>
      </div>
      }
    </Layout>

  </>);
};

export default InvoicesPage;
