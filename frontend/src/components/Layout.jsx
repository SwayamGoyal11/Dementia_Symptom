import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-slate-50 relative">
        <Navbar />
        <div className="pt-16 relative z-10">
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Navbar />
      <Sidebar />
      <main className="flex-1 ml-64 pt-16 min-h-screen overflow-y-auto relative">
        <div className="p-8 relative z-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
