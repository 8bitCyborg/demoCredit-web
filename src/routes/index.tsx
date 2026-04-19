import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Transfers from '../pages/Transfers';
import Documentation from '../pages/Documentation';
import Loans from '../pages/Loans';

export const publicRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/documentation',
    element: <Documentation />,
  },
  {
    // Catch-all for public routes
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

export const privateRoutes = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/profile" replace />, // Default route for dashboard
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'dashboard/profile',
        element: <Profile />,
      },
      {
        path: 'dashboard/loans',
        element: <Loans />,
      },
      {
        path: 'dashboard/transfers',
        element: <Transfers />,
      },
      {
        path: 'dashboard/documentation',
        element: <Documentation />,
      },
      {
        // Catch-all for authenticated state
        path: '*',
        element: <Navigate to="/dashboard/profile" replace />,
      },
    ],
  },
]);
