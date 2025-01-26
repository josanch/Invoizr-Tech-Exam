// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import appLogo from '../../assets/nivoice-app-logo.png';
import { NavLink } from "react-router-dom";

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
          <NavLink 
            to="/"
            className={({ isActive }: { isActive: boolean }) =>
              `block p-2 rounded ${
                isActive ? "bg-[#FFA015] text-white" : "hover:bg-[#FFA015] text-white"
              }`
            }
          >
            Dashboard
            </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }: { isActive: boolean }) =>
              `block p-2 rounded ${
                isActive ? "bg-[#FFA015] text-white" : "hover:bg-[#FFA015] text-white"
              }`
            }
          >
            Login
          </NavLink>
        </li>        
        <li>
          <NavLink
            to="/invoices"
            className={({ isActive }: { isActive: boolean }) =>
              `block p-2 rounded ${
                isActive ? "bg-[#FFA015] text-white" : "hover:bg-[#FFA015] text-white"
              }`
            }
          >
            Invoices
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={({ isActive }: { isActive: boolean }) =>
              `block p-2 rounded ${
                isActive ? "bg-[#FFA015] text-white" : "hover:bg-[#FFA015] text-white"
              }`
            }
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            className={({ isActive }: { isActive: boolean }) =>
              `block p-2 rounded ${
                isActive ? "bg-[#FFA015] text-white" : "hover:bg-[#FFA015] text-white"
              }`
            }
          >
            Users
          </NavLink>
        </li>        
      </ul>
    </aside>
  );
};

export default Sidebar;
