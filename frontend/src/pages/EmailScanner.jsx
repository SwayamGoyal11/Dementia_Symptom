import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Shield, ShieldAlert, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

const EmailScanner = () => {
  const [emailText, setEmailText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeEmail = (text) => {
    const lowerText = text.toLowerCase();
    let score = 100;
    const indicators = [];

    const patterns = [
      { regex: /\burgent\b|\bimmediate action\b|\bact now\b/, points: 18, label: 'Urgency language used' },
      { regex: /\bclick here\b|\bverify your account\b|\breset your password\b|\bconfirm your identity\b/, points: 18, label: 'Suspicious call to action detected' },
      { regex: /\bpassword\b|\bssn\b|\bcredit card\b|\bbank account\b|\bsecurity code\b/, points: 25, label: 'Requesting sensitive credentials' },
      { regex: /\bdear customer\b|\bdear user\b|\bdear valued\b|\bvalued customer\b/, points: 12, label: 'Generic greeting used' },
      { regex: /\baccount suspended\b|\baccount locked\b|\bpayment failed\b|\bunauthorized login\b/, points: 22, label: 'Account action scare tactic detected' },
      { regex: /\bfree\b|\bgift\b|\bprize\b|\bcongratulations\b/, points: 10, label: 'Too-good-to-be-true offer detected' },
    ];

    patterns.forEach(({ regex, points, label }) => {
      if (regex.test(lowerText)) {
        score -= points;
        indicators.push(label);
      }
    });

    if (lowerText.includes('http://') || lowerText.includes('https://')) {
      score -= 8;
      indicators.push('Contains a direct link in the message');
    }

    if (lowerText.includes('reply to') || lowerText.includes('sender')) {
      score -= 6;
      indicators.push('Email references reply or sender information');
    }

    if (lowerText.length < 40) {
      score -= 5;
      indicators.push('Very short email body, which can indicate a template');
    }

    if (lowerText.includes('unsubscribe') && !lowerText.includes('newsletter')) {
      score -= 5;
      indicators.push('Suspicious unsubscribe request present');
    }

    score = Math.max(0, Math.min(100, score));
    const status = score < 50 ? 'dangerous' : score < 80 ? 'suspicious' : 'safe';

    return {
      status,
      score,
      indicators: indicators.length ? indicators : ['No clear phishing indicators detected']
    };
  };

  const handleScan = (e) => {
    e.preventDefault();
    if (!emailText) return;
    
    setIsScanning(true);
    setResult(null);

    // Simulate AI analysis
    setTimeout(() => {
      setResult(analyzeEmail(emailText));
      setIsScanning(false);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Email Phishing Detector</h1>
        <p className="text-gray-400">Paste the content of a suspicious email below. Our NLP models will scan for social engineering patterns and threats.</p>
      </div>

      <div className="glass-card p-8">
        <form onSubmit={handleScan} className="flex flex-col space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-4 w-6 h-6 text-gray-500" />
            <textarea 
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              placeholder="Paste email content here... (e.g. Dear user, your account has been suspended. Please click here to verify your identity.)" 
              className="w-full h-48 bg-cyber-light border-2 border-white/10 rounded-xl pl-14 pr-4 py-4 text-white focus:outline-none focus:border-cyber-accent transition-colors resize-none"
              required
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={isScanning || !emailText}
            className="btn-primary flex items-center justify-center space-x-2 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Analyzing Email Content...</span>
              </>
            ) : (
              <>
                <Shield className="w-6 h-6" />
                <span>Scan Email</span>
              </>
            )}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-card p-8 border-2 ${
              result.status === 'safe' ? 'border-green-500/50' :
              result.status === 'suspicious' ? 'border-yellow-500/50' :
              'border-red-500/50'
            }`}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                  {result.status === 'safe' ? <ShieldCheck className="w-10 h-10 text-green-400" /> :
                   result.status === 'suspicious' ? <ShieldAlert className="w-10 h-10 text-yellow-400" /> :
                   <ShieldAlert className="w-10 h-10 text-red-400" />}
                  <h2 className="text-3xl font-bold capitalize">{result.status}</h2>
                </div>
                <p className="text-gray-400 mb-6">
                  {result.status === 'safe' ? 'This email does not show common signs of phishing.' :
                   result.status === 'suspicious' ? 'This email uses manipulative language often found in scams.' :
                   'Warning! This text strongly matches known phishing attacks. Do not click any links.'}
                </p>
                
                <h3 className="text-lg font-bold mb-3">Analysis Breakdown</h3>
                <ul className="space-y-2 text-left">
                  {result.indicators.map((ind, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4 text-cyber-accent" />
                      <span className="text-gray-300">{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col items-center justify-center p-6 bg-cyber-light rounded-xl min-w-[200px]">
                <div className="text-5xl font-black mb-2" style={{
                  color: result.status === 'safe' ? '#4ade80' : result.status === 'suspicious' ? '#facc15' : '#f87171'
                }}>
                  {result.score}%
                </div>
                <p className="text-gray-400 font-medium text-center">Trust Score</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmailScanner;
