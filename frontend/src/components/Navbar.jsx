import { Link } from 'react-router-dom';
import { Activity, Bell, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-6 shadow-sm">
      <Link to="/" className="flex items-center space-x-2">
        <Activity className="w-8 h-8 text-health-primary" />
        <span className="text-xl font-bold tracking-wider text-slate-800">CogniGuard <span className="font-light text-health-secondary">Research</span></span>
      </Link>

      <div className="flex items-center space-x-6">
        <button className="relative text-slate-400 hover:text-health-primary transition-colors">
          <Bell className="w-6 h-6" />
        </button>
        <Link to="/login" className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 hover:border-health-primary transition-colors">
          <User className="w-5 h-5 text-slate-500" />
          <span className="text-sm font-medium text-slate-600">Participant</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
