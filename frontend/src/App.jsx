import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Assessment = lazy(() => import('./pages/Assessment'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center text-slate-500 font-semibold">
    Loading...
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </Router>
  );
}

export default App;
