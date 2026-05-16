import { motion } from 'framer-motion';
import { Activity, Brain, Shield, LineChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: Brain, title: 'Cognitive Evaluation', desc: 'Assess memory, focus fragmentation, and processing speed using scientifically-aligned metrics.' },
  { icon: Activity, title: 'Stress Indicators', desc: 'Measure notification anxiety and digital fatigue through interactive Likert scales.' },
  { icon: LineChart, title: 'Behavioral Analytics', desc: 'Visualize your digital habits and their correlation with potential cognitive overload.' },
  { icon: Shield, title: 'Privacy-First Architecture', desc: '100% anonymized research data. We prioritize ethical AI and user privacy.' }
];

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-health-primary/30 bg-health-primary/10 mb-8 text-health-primary text-sm font-semibold">
            <Activity className="w-4 h-4" />
            <span>Digital Dementia Research Initiative</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight text-slate-800">
            Early Detection of <br />
            <span className="gradient-text">Digital Dementia Risk</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            A research-aligned platform for identifying digital overload stress patterns and cognitive strain indicators in young adults. Understand your digital habits before they impact your cognitive wellness.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/assessment" className="btn-primary flex items-center space-x-2 w-full sm:w-auto justify-center">
              <span>Begin Assessment</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="btn-secondary w-full sm:w-auto justify-center">
              Participant Login
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-amber-50 border-y border-amber-200 text-amber-800 text-center px-6">
        <p className="max-w-4xl mx-auto font-medium flex items-center justify-center space-x-2">
          <Shield className="w-5 h-5 flex-shrink-0" />
          <span><strong>Research Disclaimer:</strong> This platform is intended for educational and research purposes only. It is not a medical diagnostic tool.</span>
        </p>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-800">Comprehensive <span className="gradient-text">Analysis</span></h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Evaluate your risk profile through three core pillars of digital wellness.</p>
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
                className="glass-card p-8 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-health-primary/10 flex items-center justify-center mb-6 text-health-primary group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800">{feat.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
