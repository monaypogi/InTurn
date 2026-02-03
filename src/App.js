import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import InternDashboard from './pages/InternDashboard';

function App() {
  // Temporary fake authentication state (frontend-only)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'admin' | 'intern'

  // Load fake auth state from localStorage so refresh keeps you "logged in"
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        if (parsed?.role === 'admin' || parsed?.role === 'intern') {
          setIsAuthenticated(true);
          setUserRole(parsed.role);
        }
      } catch {
        // ignore bad data
      }
    }
  }, []);

  // Called by LoginPage after a successful fake login
  const handleFakeLogin = ({ role }) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('auth', JSON.stringify({ role }));
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to="/login" />} 
        />

        <Route 
          path="/login" 
          element={
            isAuthenticated && userRole
              ? <Navigate to={userRole === 'admin' ? '/admin' : '/intern'} />
              : <LoginPage onLogin={handleFakeLogin} />
          } 
        />
        
        {/* Protected routes - Person A will add proper auth later */}
        <Route 
          path="/admin/*" 
          element={isAuthenticated && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/intern/*" 
          element={isAuthenticated && userRole === 'intern' ? <InternDashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;