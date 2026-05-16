import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Link as LinkIcon, Mail, QrCode, ShieldAlert, BookOpen, Bot, Settings, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'URL Scanner', path: '/scan/url', icon: LinkIcon },
    { name: 'Email Scanner', path: '/scan/email', icon: Mail },
    { name: 'QR Scanner', path: '/scan/qr', icon: QrCode },
    { name: 'Threat Feed', path: '/feed', icon: ShieldAlert },
    { name: 'Awareness Training', path: '/training', icon: BookOpen },
    { name: 'AI Assistant', path: '/chat', icon: Bot },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen glass-card fixed left-0 top-0 border-r border-white/10 flex flex-col pt-20 z-40">
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
                  'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group',
                  isActive 
                    ? 'bg-gradient-to-r from-cyber-primary/40 to-cyber-accent/10 border-l-4 border-cyber-accent text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className={clsx('w-5 h-5', isActive ? 'text-cyber-accent' : 'text-gray-400 group-hover:text-cyber-accent')} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-white/10">
        <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
