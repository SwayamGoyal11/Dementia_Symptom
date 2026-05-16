import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Upload, ShieldCheck, ShieldAlert, Loader2 } from 'lucide-react';

const QrScanner = () => {
  const [file, setFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return;
    
    setIsScanning(true);
    setResult(null);

    // Simulate QR decoding and threat analysis
    setTimeout(() => {
      // Dummy logic to return a random result based on file name or just randomly
      const isDangerous = file.name.includes('invoice') || file.name.includes('menu');
      
      if (isDangerous) {
        setResult({
          status: 'dangerous',
          url: 'http://malicious-redirect-789.com/payload',
          score: 18,
          indicators: ['Hidden redirect detected', 'Domain recently registered', 'Known malware distribution network']
        });
      } else {
        setResult({
          status: 'safe',
          url: 'https://www.legit-restaurant.com/menu',
          score: 98,
          indicators: ['Verified business domain', 'SSL Certificate valid', 'No hidden redirects']
        });
      }
      setIsScanning(false);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">QR Code Analyzer</h1>
        <p className="text-gray-400">Upload a QR code image to decode and analyze its hidden URL before scanning it with your phone.</p>
      </div>

      <div className="glass-card p-8">
        <form onSubmit={handleUpload} className="flex flex-col items-center space-y-6">
          <label className="w-full max-w-md h-64 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-cyber-accent hover:bg-white/5 transition-all group">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => {
                if(e.target.files[0]) setFile(e.target.files[0]);
              }}
            />
            {file ? (
              <div className="text-center">
                <QrCode className="w-16 h-16 text-cyber-accent mx-auto mb-4" />
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-sm text-gray-400 mt-2">Click to change file</p>
              </div>
            ) : (
              <div className="text-center text-gray-400 group-hover:text-cyber-accent transition-colors">
                <Upload className="w-12 h-12 mx-auto mb-4" />
                <p className="font-medium">Drag & drop or click to upload</p>
                <p className="text-sm mt-2">Supports JPG, PNG, WEBP</p>
              </div>
            )}
          </label>
          
          <button 
            type="submit" 
            disabled={isScanning || !file}
            className="btn-primary flex items-center justify-center space-x-2 py-4 px-12 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Extracting & Analyzing...</span>
              </>
            ) : (
              <>
                <QrCode className="w-6 h-6" />
                <span>Analyze QR Code</span>
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
              result.status === 'safe' ? 'border-green-500/50' : 'border-red-500/50'
            }`}
          >
            <div className="text-center mb-6">
              {result.status === 'safe' ? (
                <ShieldCheck className="w-16 h-16 text-green-400 mx-auto mb-4" />
              ) : (
                <ShieldAlert className="w-16 h-16 text-red-400 mx-auto mb-4" />
              )}
              <h2 className="text-3xl font-bold capitalize">{result.status}</h2>
            </div>
            
            <div className="bg-cyber-light p-4 rounded-xl mb-6 flex flex-col md:flex-row items-center justify-between border border-white/10">
              <span className="text-gray-400 font-medium mb-2 md:mb-0">Embedded URL:</span>
              <span className={`font-mono truncate max-w-full md:max-w-[70%] ${result.status === 'safe' ? 'text-green-400' : 'text-red-400'}`}>
                {result.url}
              </span>
            </div>
            
            <h3 className="text-lg font-bold mb-3">AI Analysis Report</h3>
            <ul className="space-y-2 text-left">
              {result.indicators.map((ind, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${result.status === 'safe' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-gray-300">{ind}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QrScanner;
