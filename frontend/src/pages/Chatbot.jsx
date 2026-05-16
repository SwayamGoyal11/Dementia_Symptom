import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, ShieldAlert } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI Cybersecurity Assistant. Ask me anything about phishing, safe browsing, or how to secure your accounts.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "I can certainly help with that. Maintaining strong passwords, enabling Two-Factor Authentication (2FA), and staying vigilant against unexpected emails are the best ways to protect yourself online.";
      
      const lowerInput = userMessage.content.toLowerCase();
      if (lowerInput.includes('phishing')) {
        aiResponse = "Phishing is a cyber attack that uses disguised email as a weapon. The goal is to trick the email recipient into believing that the message is something they want or need — a request from their bank, for instance, or a note from someone in their company — and to click a link or download an attachment.";
      } else if (lowerInput.includes('ransomware')) {
        aiResponse = "Ransomware is malicious software that infects your computer and displays messages demanding a fee to be paid in order for your system to work again. This class of malware is a criminal moneymaking scheme that can be installed through deceptive links in an email message, instant message or website.";
      } else if (lowerInput.includes('safe')) {
        aiResponse = "To check if a website is safe, look for 'https' in the URL, check for the padlock icon, and use our URL Scanner tool to analyze the domain for hidden threats or poor reputation scores.";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col glass-card overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-cyber-dark/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-cyber-accent/20 flex items-center justify-center border border-cyber-accent/50">
            <Bot className="w-6 h-6 text-cyber-accent" />
          </div>
          <div>
            <h2 className="font-bold">CogniGuard AI Assistant</h2>
            <div className="flex items-center space-x-2 text-xs text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
        <ShieldAlert className="w-6 h-6 text-gray-500 hover:text-white transition-colors cursor-pointer" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-3`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-cyber-primary/20 border border-cyber-primary/50' : 'bg-cyber-accent/20 border border-cyber-accent/50'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-cyber-primary" /> : <Bot className="w-4 h-4 text-cyber-accent" />}
              </div>
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-cyber-primary to-purple-600 text-white rounded-br-none' 
                  : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/10'
              }`}>
                {msg.content}
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end gap-3">
              <div className="w-8 h-8 rounded-full bg-cyber-accent/20 border border-cyber-accent/50 flex items-center justify-center">
                <Bot className="w-4 h-4 text-cyber-accent" />
              </div>
              <div className="bg-white/10 p-4 rounded-2xl rounded-bl-none border border-white/10 flex space-x-2">
                <div className="w-2 h-2 bg-cyber-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-cyber-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-cyber-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 bg-cyber-dark/80 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a cybersecurity question..." 
            className="flex-1 bg-cyber-light border border-white/20 rounded-full px-6 py-3 text-white focus:outline-none focus:border-cyber-accent transition-colors"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-full bg-cyber-accent flex items-center justify-center text-cyber-dark hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
