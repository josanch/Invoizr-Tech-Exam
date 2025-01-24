import React, { useState, useEffect } from 'react';
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchInvoices, selectInvoices } from '../../store/invoicesSlice';
import InvoiceModal from './InvoiceModal';
import { fetchInvoiceDetails } from '../../store/invoiceDetailsSlice';
import { useNavigate } from 'react-router-dom';


const Invoices: React.FC = () => {
    const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const { invoices, isLoading, error } = useAppSelector(selectInvoices);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (id: string) => {
    setIsModalOpen(true);
    dispatch(fetchInvoiceDetails(id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      dispatch(fetchInvoices());
    }
  }, [dispatch]);

  // Column helper for type safety
  const columnHelper = createColumnHelper<typeof invoices[0]>();

  // Define table columns
  const columns = [
    columnHelper.accessor('id', {
      header: 'Invoice ID',
    }),
    columnHelper.accessor('vendor_name', {
      header: 'Vendor Name',
      cell: (info) => info.getValue() || 'N/A',
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: (info) => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor('due_date', {
      header: 'Due Date',
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (info) => info.getValue() || 'No description provided',
    }),
    columnHelper.accessor('user_id', {
      header: 'User ID',
    }),
    columnHelper.accessor('paid', {
      header: 'Paid',
      cell: (info) => (info.getValue() ? 'Yes' : 'No'),
    }),
  ];

  // Create the table instance
  const table = useReactTable({
    // Data from Redux store
    data: invoices,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return null;
  }

  if (error !== '' && error !== null) {
    return null;
  }

  return (<>
    { invoices.length > 0 &&     <div className="w-full flex justify-center">
      <div className="w-[95%] overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-white bg-blue-400">Invoice ID</th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-white bg-blue-400">Vendor Name</th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-white bg-blue-400">Amount</th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-white bg-blue-400">Due Date</th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-white bg-blue-400">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-white bg-blue-400">User ID</th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-white bg-blue-400">Paid</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}  
                className="hover:bg-gray-100"
                onClick={() => handleRowClick(invoice.id)}
              >
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{invoice.id}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{invoice.vendor_name}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">${invoice.amount.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{new Date(invoice.due_date).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{invoice.description || 'No description'}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{invoice.user_id}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{invoice.paid ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InvoiceModal isOpen={isModalOpen} onClose={closeModal} size="large">
        <InvoiceDetailsContent />
      </InvoiceModal>
    </div>}
  </>);
};

const InvoiceDetailsContent: React.FC = () => {
  const { invoice, isLoading, error } = useAppSelector((state) => state.invoiceDetails);
  const navigate = useNavigate();
  useEffect(() => {
    if (error === 'Unauthorized: Session expired') {
      //alert('Your session has expired. Please log in again.');
      navigate('/login');
    }
  }, [error, navigate]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-center">Invoice Details</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-bold">ID</td>
            <td className="border border-gray-300 px-4 py-2">{invoice.id}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-bold">Vendor Name</td>
            <td className="border border-gray-300 px-4 py-2">{invoice.vendor_name}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-bold">Amount</td>
            <td className="border border-gray-300 px-4 py-2">${invoice.amount.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-bold">Due Date</td>
            <td className="border border-gray-300 px-4 py-2">
              {new Date(invoice.due_date).toLocaleDateString()}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-bold">Description</td>
            <td className="border border-gray-300 px-4 py-2">
              {invoice.description || 'No description available'}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-bold">Paid</td>
            <td className="border border-gray-300 px-4 py-2">{invoice.paid ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
