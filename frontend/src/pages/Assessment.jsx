import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, Smartphone, Brain, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Assessment = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    digitalUsage: { screenTime: 5, appsUsed: 5, appSwitching: 3, notificationFreq: 3, longestSession: 2, nightUsage: 3, socialMedia: 3, compulsiveChecking: 3 },
    stress: { mentalFatigue: 3, notificationAnxiety: 3, taskOverwhelm: 3, difficultyRelaxing: 3, sleepDisturbance: 3, physicalSymptoms: 3, irritability: 3, productivityAnxiety: 3 },
    cognitive: { generalForgetfulness: 3, shortTermMemory: 3, informationRetention: 3, focusFragmentation: 3, attentionSpan: 3, spatialAwareness: 3, slowerThinking: 3, problemSolving: 3, creativeThinking: 3 }
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard'); // Simulate submission
  };

  const renderLikert = (section, key, label) => (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-slate-700 mb-3">{label}</label>
      <div className="flex justify-between items-center gap-2">
        <span className="text-xs text-slate-400 font-medium">Never</span>
        {[1, 2, 3, 4, 5].map(val => (
          <button
            key={val}
            type="button"
            onClick={() => setFormData({ ...formData, [section]: { ...formData[section], [key]: val } })}
            className={`w-10 h-10 rounded-full font-bold transition-all ${
              formData[section][key] === val 
                ? 'bg-health-primary text-white shadow-md shadow-health-primary/30 scale-110' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {val}
          </button>
        ))}
        <span className="text-xs text-slate-400 font-medium">Always</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Digital Cognitive Assessment</h1>
        <p className="text-slate-500">A multi-step evaluation of your digital habits, stress levels, and cognitive strain.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-10 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-health-primary rounded-full z-0 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
        
        {[
          { num: 1, label: 'Digital Usage', icon: Smartphone },
          { num: 2, label: 'Stress Indicators', icon: Activity },
          { num: 3, label: 'Cognitive Strain', icon: Brain },
          { num: 4, label: 'Complete', icon: CheckCircle }
        ].map((s) => {
          const Icon = s.icon;
          const isActive = step >= s.num;
          return (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-slate-50 transition-colors ${isActive ? 'bg-health-primary text-white' : 'bg-slate-200 text-slate-400'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-bold mt-2 ${isActive ? 'text-health-primary' : 'text-slate-400'}`}>{s.label}</span>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">Part 1: Digital Usage Behavior</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Daily Screen Time (hours): {formData.digitalUsage.screenTime}h</label>
                <input type="range" min="0" max="16" value={formData.digitalUsage.screenTime} onChange={e => setFormData({...formData, digitalUsage: {...formData.digitalUsage, screenTime: parseInt(e.target.value)}})} className="w-full accent-health-primary" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Longest Continuous Screen Session (hours): {formData.digitalUsage.longestSession}h</label>
                <input type="range" min="0" max="8" value={formData.digitalUsage.longestSession} onChange={e => setFormData({...formData, digitalUsage: {...formData.digitalUsage, longestSession: parseInt(e.target.value)}})} className="w-full accent-health-primary" />
              </div>
              
              {renderLikert('digitalUsage', 'appSwitching', 'How frequently do you rapidly switch between multiple apps?')}
              {renderLikert('digitalUsage', 'notificationFreq', 'How often are you interrupted by non-essential notifications?')}
              {renderLikert('digitalUsage', 'nightUsage', 'How often do you use digital devices within 1 hour before sleep?')}
              {renderLikert('digitalUsage', 'compulsiveChecking', 'How often do you compulsively check your device without a specific purpose?')}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">Part 2: Stress & Fatigue Indicators</h2>
              {renderLikert('stress', 'mentalFatigue', 'I experience mental fatigue or "brain fog" after extended screen use.')}
              {renderLikert('stress', 'notificationAnxiety', 'I feel anxious or stressed when hearing notification sounds.')}
              {renderLikert('stress', 'taskOverwhelm', 'I feel overwhelmed by the volume of digital tasks and messages.')}
              {renderLikert('stress', 'difficultyRelaxing', 'I find it difficult to relax without checking a digital device.')}
              {renderLikert('stress', 'sleepDisturbance', 'I experience difficulty falling or staying asleep.')}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">Part 3: Cognitive Overload Symptoms</h2>
              {renderLikert('cognitive', 'generalForgetfulness', 'I frequently forget minor details or recent conversations.')}
              {renderLikert('cognitive', 'focusFragmentation', 'I struggle to maintain focus on a single task for more than 20 minutes without digital distraction.')}
              {renderLikert('cognitive', 'informationRetention', 'I find it difficult to retain information read on a screen compared to paper.')}
              {renderLikert('cognitive', 'slowerThinking', 'I feel my thinking process is slower or more sluggish than usual.')}
              {renderLikert('cognitive', 'creativeThinking', 'I have difficulty generating new ideas or engaging in deep, creative thought.')}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="w-24 h-24 bg-health-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-health-primary" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Assessment Complete</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">Your responses have been recorded anonymously. Our AI engine is ready to calculate your digital cognitive risk profile.</p>
              <button onClick={handleSubmit} className="btn-primary w-full max-w-xs">
                Generate Analytics
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {step < 4 && (
          <div className="flex justify-between mt-10 pt-6 border-t border-slate-200">
            <button onClick={prevStep} disabled={step === 1} className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-colors ${step === 1 ? 'opacity-0 cursor-default' : 'text-slate-600 hover:bg-slate-100'}`}>
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button onClick={nextStep} className="btn-primary flex items-center space-x-2">
              <span>Next Step</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessment;
