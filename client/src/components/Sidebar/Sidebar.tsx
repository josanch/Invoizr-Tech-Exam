// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import appLogo from '../../assets/nivoice-app-logo.png'

const Sidebar = () => {
  return (
    <aside 
      style={{
        background: 'linear-gradient(to bottom, #4A90E2, #A3C7F7)',
        color: 'white',
      }}
      className="w-64 h-screen p-6">
      <div className="text-center mb-6">
      <img src={appLogo} alt="Invoice App" />
      </div>
      <ul className="mt-15 space-y-4">
        <li>
          <a 
            href="/"
            className="block p-2 hover:bg-[#FFA015] rounded"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="/login"
            className="block p-2 hover:bg-[#FFA015] rounded"
          >
            Login
          </a>
        </li>        
        <li>
          <a
            href="/invoices"
            className="block p-2 hover:bg-[#FFA015] rounded">Invoices</a>
        </li>
        <li>
          <a
            href="/register"
            className="block p-2 hover:bg-[#FFA015] rounded"
          >
            Register
          </a>
        </li>
        <li>
          <a
            href="/users"
            className="block p-2 hover:bg-[#FFA015] rounded"
          >
            Users
          </a>
        </li>        
      </ul>
    </aside>
  );
};

export default Sidebar;
