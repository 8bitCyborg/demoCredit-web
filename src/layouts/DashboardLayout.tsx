import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/userSlice';
import { useLogoutMutation } from '../services/auth';

const DashboardLayout: React.FC = () => {
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (error) {
      console.error('Failed to logout on server', error);
    }
    dispatch(logout());
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${isActive
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-white border-r border-gray-100 flex flex-col py-8 px-4 fixed inset-y-0 left-0 z-40">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 mb-10">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl select-none">D</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">demoCredit</span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 flex-1">
          <NavLink to="/dashboard/profile" className={navLinkClass}>
            {/* Person icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            Profile
          </NavLink>

          <NavLink to="/dashboard/transfers" className={navLinkClass}>
            {/* Arrow left-right icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            Transfers
          </NavLink>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 mt-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
          Logout
        </button>
      </aside>

      {/* Main content area */}
      <div className="flex-1 ml-64 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
