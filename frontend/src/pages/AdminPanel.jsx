import { motion } from 'framer-motion';
import { Users, FileText, Activity, BarChart2, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const mockDemoData = [
  { name: '18-24', value: 400 },
  { name: '25-34', value: 300 },
  { name: '35-44', value: 200 },
  { name: '45+', value: 100 },
];
const COLORS = ['#0ea5e9', '#14b8a6', '#f59e0b', '#ef4444'];

const mockRiskData = [
  { name: 'Low Risk', participants: 450 },
  { name: 'Moderate Risk', participants: 380 },
  { name: 'High Risk', participants: 170 },
];

const AdminPanel = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Research Administration</h1>
          <p className="text-slate-500 mt-1">Anonymized analytics and demographic overview of study participants.</p>
        </div>
        <div className="flex items-center space-x-2 bg-health-primary/10 text-health-primary px-4 py-2 rounded-full font-bold text-sm">
          <div className="w-2 h-2 rounded-full bg-health-primary animate-pulse"></div>
          <span>LIVE DATA</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Participants', value: '1,000', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { title: 'Assessments Logged', value: '3,452', icon: FileText, color: 'text-teal-500', bg: 'bg-teal-50' },
          { title: 'Avg Overall Risk', value: '58/100', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-50' },
          { title: 'Completion Rate', value: '94%', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{stat.title}</p>
              </div>
              <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Participant Demographics</h3>
          <p className="text-sm text-slate-500 mb-6">Age distribution of registered users in the study.</p>
          <div className="h-72 w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockDemoData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockDemoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {mockDemoData.map((entry, index) => (
              <div key={index} className="flex items-center text-xs text-slate-500 font-medium">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Population Risk Distribution</h3>
          <p className="text-sm text-slate-500 mb-6">Number of participants across different risk categories.</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockRiskData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="participants" name="Participants" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
