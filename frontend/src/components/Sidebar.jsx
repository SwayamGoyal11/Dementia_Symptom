import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Database, Settings, LogOut, Users } from 'lucide-react';
import { clsx } from 'clsx';

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'New Assessment', path: '/assessment', icon: FileText },
    { name: 'Research Admin', path: '/admin', icon: Users },
  ];

  return (
    <div className="w-64 h-screen bg-white fixed left-0 top-0 border-r border-slate-200 flex flex-col pt-20 z-40 shadow-sm">
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-2 px-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = path === link.path || path.startsWith(link.path + '/');
            return (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group font-medium',
                  isActive 
                    ? 'bg-health-primary/10 text-health-primary' 
                    : 'text-slate-600 hover:text-health-primary hover:bg-slate-50'
                )}
              >
                <Icon className={clsx('w-5 h-5', isActive ? 'text-health-primary' : 'text-slate-400 group-hover:text-health-primary')} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-200">
        <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
