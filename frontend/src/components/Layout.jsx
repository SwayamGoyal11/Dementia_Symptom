import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-cyber-dark bg-cyber-gradient relative">
        <div className="absolute top-0 left-0 w-full h-full bg-glow-gradient pointer-events-none"></div>
        <Navbar />
        <div className="pt-16 relative z-10">
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark flex">
      <Navbar />
      <Sidebar />
      <main className="flex-1 ml-64 pt-16 min-h-screen overflow-y-auto relative bg-cyber-gradient">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-glow-gradient pointer-events-none opacity-50"></div>
        <div className="p-8 relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
