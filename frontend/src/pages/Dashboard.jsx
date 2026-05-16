import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Activity, Brain, Smartphone, AlertTriangle, Lightbulb } from 'lucide-react';

const Dashboard = () => {
  const location = useLocation();
  const data = location.state?.assessmentData;

  // Calculate dynamic scores if data exists
  const average = (obj) => {
    if (!obj) return 3;
    const values = Object.values(obj).filter((value) => typeof value === 'number' && Number.isFinite(value));
    if (!values.length) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  };

  const normalize = (value, max) => Math.min(Math.max((Number(value) || 0) / max, 0), 1) * 100;

  let digitalOverloadIndex = 78;
  let stressIndex = 65;
  let cognitiveImpactIndex = 55;
  
  if (data) {
    const digitalMetrics = [
      normalize(data.digitalUsage.screenTime, 16),
      normalize(data.digitalUsage.longestSession, 8),
      normalize(data.digitalUsage.appsUsed, 20),
      normalize(data.digitalUsage.appSwitching, 5),
      normalize(data.digitalUsage.notificationFreq, 5),
      normalize(data.digitalUsage.nightUsage, 5),
      normalize(data.digitalUsage.socialMedia, 5),
      normalize(data.digitalUsage.compulsiveChecking, 5),
    ];

    digitalOverloadIndex = Math.round(digitalMetrics.reduce((sum, score) => sum + score, 0) / digitalMetrics.length);
    stressIndex = Math.round((average(data.stress) / 5) * 100);
    cognitiveImpactIndex = Math.round((average(data.cognitive) / 5) * 100);
  }

  const overallRiskScore = Math.round((digitalOverloadIndex * 0.3) + (stressIndex * 0.3) + (cognitiveImpactIndex * 0.4));
  let riskCategory = 'Low Risk';
  let riskColor = 'text-green-600';
  let riskBg = 'bg-green-200';
  
  if (overallRiskScore >= 70) {
    riskCategory = 'High Risk';
    riskColor = 'text-health-danger';
    riskBg = 'bg-health-danger/20';
  } else if (overallRiskScore >= 40) {
    riskCategory = 'Moderate Risk';
    riskColor = 'text-amber-600';
    riskBg = 'bg-amber-200';
  }

  const radarData = [
    { subject: 'Memory', A: data ? Math.round(data.cognitive.generalForgetfulness / 5 * 100) : 80, fullMark: 100 },
    { subject: 'Attention', A: data ? Math.round(data.cognitive.attentionSpan / 5 * 100) : 65, fullMark: 100 },
    { subject: 'Processing', A: data ? Math.round(data.cognitive.slowerThinking / 5 * 100) : 70, fullMark: 100 },
    { subject: 'Stress', A: data ? Math.round(data.stress.taskOverwhelm / 5 * 100) : 85, fullMark: 100 },
    { subject: 'Digital Fatigue', A: data ? Math.round(data.stress.mentalFatigue / 5 * 100) : 90, fullMark: 100 },
    { subject: 'Sleep Quality', A: data ? Math.round((6 - data.stress.sleepDisturbance) / 5 * 100) : 40, fullMark: 100 },
  ];

  const trendData = [
    { name: 'Week 1', stress: Math.max(0, stressIndex - 18), digital: Math.max(0, digitalOverloadIndex - 16) },
    { name: 'Week 2', stress: Math.max(0, stressIndex - 10), digital: Math.max(0, digitalOverloadIndex - 9) },
    { name: 'Week 3', stress: Math.max(0, stressIndex - 5), digital: Math.max(0, digitalOverloadIndex - 4) },
    { name: 'Current', stress: stressIndex, digital: digitalOverloadIndex },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Risk Analytics Dashboard</h1>
          <p className="text-slate-500 mt-1">Review your digital cognitive overload indicators based on your recent assessment.</p>
        </div>
        <div className={`glass-card px-6 py-3 flex items-center space-x-4 border-slate-200 ${riskBg.replace('/20', '/40')}`}>
          <div className="text-right">
            <p className={`text-sm font-bold uppercase tracking-wider ${riskColor}`}>Overall Risk Category</p>
            <p className={`text-2xl font-black ${riskColor}`}>{riskCategory} ({overallRiskScore})</p>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${riskBg}`}>
            <AlertTriangle className={`w-6 h-6 ${riskColor}`} />
          </div>
        </div>
      </div>

      {/* Index Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Digital Overload Index', value: `${digitalOverloadIndex}/100`, icon: Smartphone, color: 'text-health-accent', bg: 'bg-health-accent/10' },
          { title: 'Stress Index', value: `${stressIndex}/100`, icon: Activity, color: 'text-health-warning', bg: 'bg-health-warning/10' },
          { title: 'Cognitive Impact Index', value: `${cognitiveImpactIndex}/100`, icon: Brain, color: 'text-health-success', bg: 'bg-health-success/10' },
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
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
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
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          {(data && data.digitalUsage.notificationFreq >= 4) || (!data) ? (
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
          ) : null}
          
          {(data && data.digitalUsage.nightUsage >= 4) || (!data) ? (
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
          ) : null}

          {data && overallRiskScore >= 70 && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex space-x-4 items-start">
              <div className="mt-1 w-2 h-2 rounded-full bg-health-danger flex-shrink-0"></div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-bold text-health-danger uppercase tracking-wider bg-health-danger/10 px-2 py-0.5 rounded">Urgent Priority</span>
                  <span className="text-xs text-slate-400 font-medium">Digital Detox</span>
                </div>
                <h4 className="font-bold text-slate-800 mb-1">Structured Detox Protocol</h4>
                <p className="text-sm text-slate-600">Your scores indicate a high level of digital cognitive overload. Implement a strict 24-hour digital detox protocol this weekend.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
