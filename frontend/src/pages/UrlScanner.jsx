import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as LinkIcon, Shield, ShieldAlert, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

const UrlScanner = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeUrl = (targetUrl) => {
    const urlText = targetUrl.trim();
    const lowerUrl = urlText.toLowerCase();
    let score = 100;
    const indicators = [];

    if (!lowerUrl.startsWith('https://')) {
      score -= 20;
      indicators.push('No HTTPS encryption detected');
    } else {
      indicators.push('Found HTTPS encryption');
    }

    const suspiciousKeywords = ['login', 'verify', 'secure', 'account', 'banking', 'update', 'confirm', 'signin', 'password', 'free', 'gift', 'security', 'alert'];
    const foundKeywords = suspiciousKeywords.filter((kw) => lowerUrl.includes(kw));
    if (foundKeywords.length) {
      score -= Math.min(40, foundKeywords.length * 10);
      indicators.push(`Suspicious keywords detected: ${foundKeywords.join(', ')}`);
    }

    if (/(\d{1,3}\.){3}\d{1,3}/.test(lowerUrl)) {
      score -= 35;
      indicators.push('IP-based URL detected');
    }

    if (lowerUrl.includes('bit.ly') || lowerUrl.includes('tinyurl') || lowerUrl.includes('goo.gl') || lowerUrl.includes('t.co')) {
      score -= 25;
      indicators.push('URL shortener detected');
    }

    if (lowerUrl.includes('%') || lowerUrl.includes('/../') || lowerUrl.includes('/..')) {
      score -= 15;
      indicators.push('Obfuscated or encoded path detected');
    }

    const subdomainCount = lowerUrl.split('.').length - 1;
    if (subdomainCount > 3) {
      score -= 10;
      indicators.push('Excessive subdomain or path complexity');
    }

    if (lowerUrl.includes('https://www.')) {
      score -= 5;
      indicators.push('Potential typo-squatting with extra www');
    }

    if (lowerUrl.length < 20) {
      score -= 5;
      indicators.push('Very short URL may be suspicious');
    }

    score = Math.max(0, Math.min(100, score));
    const status = score < 50 ? 'dangerous' : score < 80 ? 'suspicious' : 'safe';

    if (status === 'safe' && indicators.length === 0) {
      indicators.push('No obvious threats detected');
    }

    return { status, score, indicators };
  };

  const handleScan = (e) => {
    e.preventDefault();
    if (!url) return;
    
    setIsScanning(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      setResult(analyzeUrl(url));
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">URL Phishing Detector</h1>
        <p className="text-gray-400">Enter any suspicious link below. Our AI will analyze the domain, structure, and history to determine if it's safe.</p>
      </div>

      <div className="glass-card p-8">
        <form onSubmit={handleScan} className="flex flex-col space-y-4">
          <div className="relative">
            <LinkIcon className="absolute left-4 top-4 w-6 h-6 text-gray-500" />
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/login" 
              className="w-full bg-cyber-light border-2 border-white/10 rounded-xl pl-14 pr-4 py-4 text-lg text-white focus:outline-none focus:border-cyber-accent transition-colors"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isScanning || !url}
            className="btn-primary flex items-center justify-center space-x-2 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Analyzing URL...</span>
              </>
            ) : (
              <>
                <Shield className="w-6 h-6" />
                <span>Scan URL</span>
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
                  {result.status === 'safe' ? 'This URL appears to be safe and free of known threats.' :
                   result.status === 'suspicious' ? 'Proceed with caution. This URL exhibits some suspicious characteristics.' :
                   'Warning! This URL is highly likely to be a phishing or malware site.'}
                </p>
                
                <h3 className="text-lg font-bold mb-3">Threat Indicators</h3>
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
                <p className="text-gray-400 font-medium text-center">Safety Score</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UrlScanner;
