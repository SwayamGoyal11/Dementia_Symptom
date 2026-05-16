import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="*" element={<div className="text-slate-800 text-center mt-20 text-3xl font-bold">404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
