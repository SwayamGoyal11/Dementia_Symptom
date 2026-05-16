import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login logic
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyber-primary rounded-full blur-[80px] opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyber-accent rounded-full blur-[80px] opacity-50"></div>
        
        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <Shield className="w-12 h-12 text-cyber-accent drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-400 text-center mb-8">
            {isLogin ? 'Enter your credentials to access your dashboard' : 'Join CogniGuard to secure your digital footprint'}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                  <input type="text" className="input-cyber pl-12" placeholder="John Doe" required />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                <input type="email" className="input-cyber pl-12" placeholder="name@company.com" required />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                <input type="password" className="input-cyber pl-12" placeholder="••••••••" required />
              </div>
              {isLogin && (
                <div className="flex justify-end mt-2">
                  <a href="#" className="text-sm text-cyber-accent hover:underline">Forgot password?</a>
                </div>
              )}
            </div>
            
            <button type="submit" className="btn-primary w-full mt-6">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-cyber-accent hover:underline font-medium">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
