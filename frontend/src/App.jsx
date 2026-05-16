import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UrlScanner from './pages/UrlScanner';
import EmailScanner from './pages/EmailScanner';
import QrScanner from './pages/QrScanner';
import ThreatFeed from './pages/ThreatFeed';
import Awareness from './pages/Awareness';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="scan/url" element={<UrlScanner />} />
          <Route path="scan/email" element={<EmailScanner />} />
          <Route path="scan/qr" element={<QrScanner />} />
          <Route path="feed" element={<ThreatFeed />} />
          <Route path="training" element={<Awareness />} />
          <Route path="chat" element={<Chatbot />} />
          <Route path="*" element={<div className="text-white text-center mt-20 text-3xl font-bold">404 - Breach Detected (Page Not Found)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
