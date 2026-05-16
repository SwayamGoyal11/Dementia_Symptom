import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Globe, Server, UserX, Database } from 'lucide-react';

const mockThreats = [
  { id: 1, type: 'Ransomware', target: 'Healthcare Sector', location: 'United States', time: 'Just now', severity: 'critical', icon: Database },
  { id: 2, type: 'DDoS Attack', target: 'Financial Services', location: 'London, UK', time: '2 mins ago', severity: 'high', icon: Server },
  { id: 3, type: 'Phishing Campaign', target: 'Office 365 Users', location: 'Global', time: '5 mins ago', severity: 'medium', icon: UserX },
  { id: 4, type: 'Malware Variant', target: 'Android Devices', location: 'Asia Pacific', time: '12 mins ago', severity: 'high', icon: ShieldAlert },
  { id: 5, type: 'Data Breach', target: 'E-commerce Platform', location: 'Europe', time: '20 mins ago', severity: 'critical', icon: Globe },
];

const ThreatFeed = () => {
  const [threats, setThreats] = useState(mockThreats);

  // Simulate incoming live threats
  useEffect(() => {
    const interval = setInterval(() => {
      const newThreat = {
        id: Date.now(),
        type: ['Zero-day Exploit', 'Credential Stuffing', 'SQL Injection'][Math.floor(Math.random() * 3)],
        target: ['Cloud Infrastructure', 'Crypto Exchange', 'Government DB'][Math.floor(Math.random() * 3)],
        location: ['Russia', 'Brazil', 'Australia', 'Unknown'][Math.floor(Math.random() * 4)],
        time: 'Just now',
        severity: ['critical', 'high', 'medium'][Math.floor(Math.random() * 3)],
        icon: ShieldAlert
      };
      
      setThreats(prev => [newThreat, ...prev.slice(0, 7)]);
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Global Threat Feed</h1>
          <p className="text-gray-400">Live intelligence on active cyber attacks worldwide.</p>
        </div>
        <div className="flex items-center space-x-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full border border-red-500/20">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="font-bold tracking-wider">LIVE FEED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Active Campaigns', value: '1,042' },
          { label: 'Critical Alerts', value: '87', color: 'text-red-400' },
          { label: 'Protected Nodes', value: '12.4K', color: 'text-green-400' },
          { label: 'Global Risk Level', value: 'SEVERE', color: 'text-red-500' }
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
            <h3 className={`text-3xl font-black ${stat.color || 'text-white'}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/10 grid grid-cols-12 gap-4 text-sm font-bold text-gray-400 uppercase tracking-wider">
          <div className="col-span-3">Threat Type</div>
          <div className="col-span-3">Target</div>
          <div className="col-span-2">Location</div>
          <div className="col-span-2 text-center">Severity</div>
          <div className="col-span-2 text-right">Time</div>
        </div>
        
        <div className="divide-y divide-white/5 relative">
          {threats.map((threat) => {
            const Icon = threat.icon;
            return (
              <motion.div 
                key={threat.id}
                initial={{ opacity: 0, x: -20, backgroundColor: 'rgba(255, 0, 60, 0.2)' }}
                animate={{ opacity: 1, x: 0, backgroundColor: 'rgba(255, 255, 255, 0)' }}
                transition={{ duration: 0.8 }}
                className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-white/5 transition-colors"
              >
                <div className="col-span-3 flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    threat.severity === 'critical' ? 'bg-red-500/20 text-red-400' : 
                    threat.severity === 'high' ? 'bg-orange-500/20 text-orange-400' : 
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold">{threat.type}</span>
                </div>
                <div className="col-span-3 text-gray-300">{threat.target}</div>
                <div className="col-span-2 text-gray-400">{threat.location}</div>
                <div className="col-span-2 flex justify-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    threat.severity === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 
                    threat.severity === 'high' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' : 
                    'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                  }`}>
                    {threat.severity.toUpperCase()}
                  </span>
                </div>
                <div className="col-span-2 text-right text-gray-500 text-sm">{threat.time}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThreatFeed;
