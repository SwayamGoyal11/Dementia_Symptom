import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Activity, Brain, Smartphone, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

const mockRadarData = [
  { subject: 'Memory', A: 80, fullMark: 100 },
  { subject: 'Attention', A: 65, fullMark: 100 },
  { subject: 'Processing', A: 70, fullMark: 100 },
  { subject: 'Stress', A: 85, fullMark: 100 },
  { subject: 'Digital Fatigue', A: 90, fullMark: 100 },
  { subject: 'Sleep Quality', A: 40, fullMark: 100 },
];

const mockTrendData = [
  { name: 'Week 1', stress: 65, digital: 70 },
  { name: 'Week 2', stress: 70, digital: 80 },
  { name: 'Week 3', stress: 85, digital: 90 },
  { name: 'Week 4', stress: 80, digital: 85 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Risk Analytics Dashboard</h1>
          <p className="text-slate-500 mt-1">Review your digital cognitive overload indicators based on your recent assessment.</p>
        </div>
        <div className="glass-card px-6 py-3 flex items-center space-x-4 border-amber-200 bg-amber-50">
          <div className="text-right">
            <p className="text-sm text-amber-700 font-bold uppercase tracking-wider">Overall Risk Category</p>
            <p className="text-2xl font-black text-amber-600">Moderate Risk</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-amber-700" />
          </div>
        </div>
      </div>

      {/* Index Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Digital Overload Index', value: '78/100', icon: Smartphone, color: 'text-health-accent', bg: 'bg-health-accent/10' },
          { title: 'Stress Index', value: '65/100', icon: Activity, color: 'text-health-warning', bg: 'bg-health-warning/10' },
          { title: 'Cognitive Impact Index', value: '55/100', icon: Brain, color: 'text-health-success', bg: 'bg-health-success/10' },
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
                  <p className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${stat.color.replace('text-', 'bg-')}`} style={{ width: stat.value.split('/')[0] + '%' }}></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Cognitive & Stress Profile</h3>
          <p className="text-sm text-slate-500 mb-6">A multidimensional view of your behavioral assessment.</p>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockRadarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                <Radar name="User Profile" dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.4} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Trend Analysis</h3>
          <p className="text-sm text-slate-500 mb-6">Historical correlation between digital usage and stress levels.</p>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="digital" name="Digital Usage" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="stress" name="Stress Level" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="glass-card p-8 bg-gradient-to-br from-white to-health-primary/5 border-health-primary/20">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-health-primary/10 rounded-lg">
            <Lightbulb className="w-6 h-6 text-health-primary" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Personalized Evidence-Based Recommendations</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex space-x-4 items-start">
            <div className="mt-1 w-2 h-2 rounded-full bg-health-danger flex-shrink-0"></div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-bold text-health-danger uppercase tracking-wider bg-health-danger/10 px-2 py-0.5 rounded">High Priority</span>
                <span className="text-xs text-slate-400 font-medium">Focus Recovery</span>
              </div>
              <h4 className="font-bold text-slate-800 mb-1">Notification Fasting</h4>
              <p className="text-sm text-slate-600">Your notification frequency is associated with elevated cognitive fatigue. Disable all non-essential push notifications for the next 7 days.</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex space-x-4 items-start">
            <div className="mt-1 w-2 h-2 rounded-full bg-health-warning flex-shrink-0"></div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-bold text-health-warning uppercase tracking-wider bg-health-warning/10 px-2 py-0.5 rounded">Medium Priority</span>
                <span className="text-xs text-slate-400 font-medium">Sleep Hygiene</span>
              </div>
              <h4 className="font-bold text-slate-800 mb-1">Implement Screen Curfew</h4>
              <p className="text-sm text-slate-600">Late-night screen exposure may impact memory consolidation. Disconnect from devices 90 minutes before bedtime.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
