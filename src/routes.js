import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import P404 from './pages/P404';
import DashboardAppPage from './pages/DashboardAppPage';
import Master from './pages/Master';
import UserP from './pages/UserP';
import UserP2 from './pages/UserP2';
import Review from './pages/Review';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/counsellorDB" />, index: true },
        { path: 'counsellorDB', element: <DashboardAppPage /> },
        { path: 'd/:name', element: <UserP2 /> },
        { path: 'f/:name', element: <UserP /> },
        { path: 's1', element: <Master /> },
        { path: 's2', element: <Review /> },
      ],
    },

    // ----------------------------------------------
    {
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: '404', element: <P404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
