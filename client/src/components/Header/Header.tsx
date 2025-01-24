// src/components/Header/Header.tsx
import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectAuth, logout} from '../../store/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faBell, faCog, faMoon, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/authCheck';

const Header = () => {
  const dispatch = useAppDispatch();
  const { token, isAuthenticated } = useAppSelector(selectAuth);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Mapping routes to breadcrumb labels
  const routeMap: Record<string, string> = {
    '/': 'Home',
    '/login': 'Login',
    '/register': 'Register',
    '/users': 'Users',
    '/profile': 'Profile',
    '/invoices': 'Invoices',
    '/invoices/:id': 'Invoice Details',
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout()); 
    navigate('/'); 
  };

  const handleProfile = () => {
    navigate('/profile');
  }

  // Update breadcrumbs dynamically
  useEffect(() => {
    const pathnames = location.pathname === '/' 
      ? ['Home']
      : location.pathname.split('/').filter(Boolean).map((_, index) => {
        const route = `/${location.pathname.split('/').filter(Boolean).slice(0, index + 1).join('/')}`;
        return routeMap[route] || route;
      });

    setBreadcrumbs(pathnames);
  }, [location.pathname]);  

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      //console.log('Token expired. Logging out...');
      dispatch(logout());
      // Todo create modal window
      navigate('/login');
    } else if (!token) {
      //console.log('No token found. User is logged out.');
    }
  }, [token, dispatch, navigate]);

  return (
    <header className="bg-gray-50 shadow-md border-b border-gray-300 px-6 py-4 flex items-center justify-between">
      {/* Title and Breadcrumb */}
      <div>
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Invoice App</h1>
          <div className="text-lg font-semibold">
          <ul className="breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <li key={index}>
              {index !== breadcrumbs.length - 1 ? (
                <Link to={`/${breadcrumbs.slice(0, index + 1).join('/')}`}>{crumb}</Link>
              ) : (
                <span>{crumb}</span>
              )}
            </li>
          ))}
        </ul>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Search and Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded bg-gray-100 text-gray-800 shadow-inner"
          />

          {/* Icon Buttons */}
          <div className="flex items-center gap-4">
            <button aria-label="Alerts" className="group">
              <FontAwesomeIcon
                icon={faBell}
                className="text-gray-500 group-hover:text-[#FFA015] transition-colors duration-200 text-xl"
              />
            </button>
            <button aria-label="Settings" className="group">
              <FontAwesomeIcon
                icon={faCog}
                className="text-gray-500 group-hover:text-[#FFA015] transition-colors duration-200 text-lg"
              />
            </button>
            <button aria-label="Theme" className="group">
              <FontAwesomeIcon
                icon={faMoon}
                className="text-gray-500 group-hover:text-[#FFA015] transition-colors duration-200 text-lg"
              />
            </button>
            {/* <button aria-label="Profile" className="group">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-gray-500 group-hover:text-[#FFA015] transition-colors duration-200 text-lg"
              />
            </button> */}
          </div>
        </div>

        {/* Login/Logout Button */}
        <div className="flex-shrink-0 ml-1 w-24 text-right">
          {isAuthenticated ? (
            <button
              className="text-gray-500 group hover:text-[#FFA015] font-medium cursor-pointer text-lg"
              onClick={handleLogout}
            >
              <FontAwesomeIcon
                icon={faUser}
                className="text-gray-500 group-hover:text-[#FFA015] transition-colors duration-200 text-lg mr-2"
              />{' '}
              Logout
            </button>
          ) : (
            <button
              className="text-gray-500 group hover:text-[#FFA015] font-medium cursor-pointer text-lg"
              onClick={handleLogin}
            >
              <FontAwesomeIcon
                icon={faSignInAlt}
                className="text-gray-500 group-hover:text-[#FFA015] transition-colors duration-200 text-lg mr-2"
              />{' '}
              Login
            </button>
          )}
        </div>
      </div>

    </header>
  );
};

export default Header;
