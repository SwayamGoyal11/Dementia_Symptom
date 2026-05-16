import { motion } from 'framer-motion';
import { BookOpen, Shield, HelpCircle, CheckCircle, Lock, Monitor, EyeOff } from 'lucide-react';

const modules = [
  { title: 'Phishing 101', icon: Mail, desc: 'Learn how to identify fake emails and malicious links.', progress: 100 },
  { title: 'Password Security', icon: Lock, desc: 'Best practices for creating and storing strong passwords.', progress: 60 },
  { title: 'Social Engineering', icon: Users, desc: 'How attackers manipulate human psychology to breach systems.', progress: 0 },
  { title: 'Public Wi-Fi Risks', icon: Monitor, desc: 'Why public networks are dangerous and how to use them safely.', progress: 0 },
];

import { Mail, Users } from 'lucide-react'; // Added missing imports

const Awareness = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Awareness Training</h1>
          <p className="text-gray-400">Educate yourself against modern cyber threats. Knowledge is your first line of defense.</p>
        </div>
        <div className="glass-card px-6 py-4 mt-4 md:mt-0 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full border-4 border-cyber-accent flex items-center justify-center font-bold">
            40%
          </div>
          <div>
            <p className="text-sm text-gray-400">Overall Progress</p>
            <p className="font-bold">Beginner Level</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((mod, i) => {
          const Icon = mod.icon;
          return (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="glass-card p-6 flex flex-col h-full border border-white/5 hover:border-cyber-accent/50 transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyber-light flex items-center justify-center mb-4 group-hover:bg-cyber-accent/20 transition-colors">
                <Icon className="w-6 h-6 text-cyber-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">{mod.title}</h3>
              <p className="text-gray-400 text-sm flex-grow mb-6">{mod.desc}</p>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Progress</span>
                  <span className="font-bold">{mod.progress}%</span>
                </div>
                <div className="w-full h-2 bg-cyber-light rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${mod.progress === 100 ? 'bg-green-500' : 'bg-cyber-accent'}`} 
                    style={{ width: `${mod.progress}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 glass-card p-8 border-l-4 border-cyber-primary">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-primary/20 text-cyber-primary text-xs font-bold mb-4">
              <CheckCircle className="w-4 h-4" />
              <span>Recommended Quiz</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Test Your Phishing Detection Skills</h2>
            <p className="text-gray-400 mb-6">Take our interactive 10-question quiz to see if you can spot the difference between real and fake login pages.</p>
            <button className="btn-primary flex items-center space-x-2">
              <HelpCircle className="w-5 h-5" />
              <span>Start Quiz</span>
            </button>
          </div>
          <div className="w-full md:w-1/3">
            <div className="relative">
              <div className="absolute inset-0 bg-cyber-primary blur-3xl opacity-20 rounded-full"></div>
              <Shield className="w-32 h-32 mx-auto text-cyber-primary relative z-10 drop-shadow-[0_0_15px_rgba(112,0,255,0.8)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awareness;
