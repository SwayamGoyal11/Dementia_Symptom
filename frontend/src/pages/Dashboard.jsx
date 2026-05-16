import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ShieldAlert, CheckCircle, AlertTriangle, Activity } from 'lucide-react';

const data = [
  { name: 'Mon', threats: 4, scanned: 20 },
  { name: 'Tue', threats: 7, scanned: 35 },
  { name: 'Wed', threats: 2, scanned: 25 },
  { name: 'Thu', threats: 9, scanned: 45 },
  { name: 'Fri', threats: 3, scanned: 30 },
  { name: 'Sat', threats: 1, scanned: 15 },
  { name: 'Sun', threats: 5, scanned: 40 },
];

const recentScans = [
  { id: 1, type: 'URL', target: 'http://secure-login-update.com', status: 'dangerous', time: '2 mins ago', score: 12 },
  { id: 2, type: 'Email', target: 'Urgent: Account Verification', status: 'suspicious', time: '1 hour ago', score: 65 },
  { id: 3, type: 'URL', target: 'https://github.com', status: 'safe', time: '3 hours ago', score: 100 },
  { id: 4, type: 'QR Code', target: 'Menu PDF', status: 'safe', time: '5 hours ago', score: 95 },
];

const Dashboard = () => {
  return (
    <div className="text-white space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Security Dashboard</h1>
          <p className="text-gray-400 mt-1">Real-time overview of your digital security posture.</p>
        </div>
        <div className="glass-card px-6 py-3 flex items-center space-x-4 border-cyber-accent/30">
          <div className="text-right">
            <p className="text-sm text-gray-400">Risk Score</p>
            <p className="text-2xl font-bold text-cyber-success">92/100</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-cyber-success/20 flex items-center justify-center border border-cyber-success/50">
            <ShieldAlert className="w-6 h-6 text-cyber-success" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Scans', value: '1,284', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/20' },
          { title: 'Threats Blocked', value: '34', icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-400/20' },
          { title: 'Safe Links', value: '1,150', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/20' },
          { title: 'Warnings', value: '100', icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-bold mb-6">Threat Activity Timeline</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff003c" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff003c" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorScanned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid #ffffff20', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="scanned" stroke="#00f0ff" fillOpacity={1} fill="url(#colorScanned)" />
                <Area type="monotone" dataKey="threats" stroke="#ff003c" fillOpacity={1} fill="url(#colorThreats)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6">Recent Scans</h3>
          <div className="space-y-4">
            {recentScans.map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div>
                  <p className="font-medium text-sm truncate max-w-[150px]" title={scan.target}>{scan.target}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-400">{scan.type}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">{scan.time}</span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-bold ${
                  scan.status === 'safe' ? 'bg-green-500/20 text-green-400' :
                  scan.status === 'suspicious' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {scan.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
