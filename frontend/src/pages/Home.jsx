import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Bot, ArrowRight, Activity, Globe, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: Shield, title: 'Real-time Protection', desc: 'AI-driven threat detection blocking malicious URLs instantly.' },
  { icon: Bot, title: 'AI Phishing Analysis', desc: 'Advanced language models scan emails for social engineering.' },
  { icon: Eye, title: 'QR Code Scanning', desc: 'Decode and verify QR codes before you scan them.' },
  { icon: Lock, title: 'Data Privacy', desc: 'Enterprise-grade encryption secures your scans and history.' }
];

const stats = [
  { icon: Activity, value: '2.4M+', label: 'Threats Blocked' },
  { icon: Globe, value: '150+', label: 'Countries Supported' },
  { icon: Database, value: '99.9%', label: 'Detection Rate' }
];

const Home = () => {
  return (
    <div className="text-white min-h-[calc(100vh-64px)] pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-cyber-accent/30 bg-cyber-accent/10 mb-8">
            <Shield className="w-4 h-4 text-cyber-accent" />
            <span className="text-sm font-medium text-cyber-accent">Next-Gen Cybersecurity Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Detect & Neutralize <br />
            <span className="neon-text">Digital Threats</span> with AI
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            CogniGuard is your intelligent shield against phishing, scam emails, and malicious URLs. Stay one step ahead of cybercriminals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/dashboard" className="btn-primary flex items-center space-x-2 w-full sm:w-auto justify-center">
              <span>Analyze Threat</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="px-6 py-3 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all w-full sm:w-auto justify-center font-bold">
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-10 border-y border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-cyber-primary/20 flex items-center justify-center mb-4 border border-cyber-primary/30">
                  <Icon className="w-6 h-6 text-cyber-primary" />
                </div>
                <h3 className="text-4xl font-black text-white mb-2">{stat.value}</h3>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Comprehensive <span className="text-cyber-accent">Protection</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Advanced tools designed to identify and eliminate threats before they compromise your data.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 group hover:border-cyber-accent/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyber-primary/20 to-cyber-accent/20 flex items-center justify-center mb-6 border border-white/10 group-hover:border-cyber-accent/50 transition-colors">
                  <Icon className="w-7 h-7 text-cyber-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feat.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
