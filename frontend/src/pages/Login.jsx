import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, User as UserIcon, Calendar, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-health-primary to-health-secondary"></div>
        
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <Activity className="w-12 h-12 text-health-primary" />
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-2 text-slate-800">
            {isLogin ? 'Participant Login' : 'Join Research Study'}
          </h2>
          <p className="text-slate-500 text-center mb-8 text-sm">
            {isLogin ? 'Enter your credentials to view your health data' : 'Register to participate in the digital cognitive overload study'}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input type="text" className="input-field pl-12" placeholder="John Doe" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Age Range</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                      <select className="input-field pl-10" required>
                        <option value="">Select</option>
                        <option value="18-24">18-24</option>
                        <option value="25-34">25-34</option>
                        <option value="35-44">35-44</option>
                        <option value="45+">45+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Status</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                      <select className="input-field pl-10" required>
                        <option value="">Select</option>
                        <option value="Student">Student</option>
                        <option value="Professional">Professional</option>
                        <option value="Researcher">Researcher</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input type="email" className="input-field pl-12" placeholder="participant@university.edu" required />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input type="password" className="input-field pl-12" placeholder="••••••••" required />
              </div>
            </div>
            
            <button type="submit" className="btn-primary w-full mt-6 shadow-md shadow-health-primary/20">
              {isLogin ? 'Sign In' : 'Register for Study'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-slate-600 text-sm">
            {isLogin ? "Not participating yet? " : "Already participating? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-health-primary hover:underline font-semibold">
              {isLogin ? 'Register here' : 'Sign in here'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
