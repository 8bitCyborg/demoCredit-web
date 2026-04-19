import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/userSlice';
import { useLogoutMutation } from '../services/auth';
import { Menu, X, User, ArrowLeftRight, FileText, LogOut } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-sans text-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl select-none">D</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">demoCredit</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col py-8 px-4 transition-transform duration-300 transform
        lg:translate-x-0 lg:static lg:inset-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 mb-10">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl select-none">D</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">demoCredit</span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 flex-1">
          <NavLink to="/dashboard/profile" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
            <User size={20} className="shrink-0" />
            Profile
          </NavLink>

          <NavLink to="/dashboard/transfers" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
            <ArrowLeftRight size={20} className="shrink-0" />
            Transfers
          </NavLink>

          <NavLink to="/dashboard/loans" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
            <ArrowLeftRight size={20} className="shrink-0" />
            Loans
          </NavLink>

          <NavLink to="/dashboard/documentation" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
            <FileText size={20} className="shrink-0" />
            Documentation
          </NavLink>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 mt-4"
        >
          <LogOut size={20} className="shrink-0" />
          Logout
        </button>
      </aside>

      {/* Main content area */}
      <main className="flex-1 w-full min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
