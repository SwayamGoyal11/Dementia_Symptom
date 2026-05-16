import { Link } from 'react-router-dom';
import { Shield, Bell, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 glass-card border-b border-white/10 z-50 flex items-center justify-between px-6">
      <Link to="/" className="flex items-center space-x-2">
        <div className="relative">
          <Shield className="w-8 h-8 text-cyber-accent" />
          <div className="absolute inset-0 bg-cyber-accent blur-md opacity-50"></div>
        </div>
        <span className="text-xl font-bold tracking-wider neon-text">CogniGuard</span>
      </Link>

      <div className="flex items-center space-x-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
        <Link to="/profile" className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/20 hover:border-cyber-accent transition-colors">
          <User className="w-5 h-5 text-gray-300" />
          <span className="text-sm font-medium text-gray-300">Admin</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
