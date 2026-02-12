import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authAPI } from './services/api';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import InternDashboard from './pages/InternDashboard';
import InternAttendance from './pages/InternAttendance';
import InternReports from './pages/InternReports';
import InternLayout from './layouts/InternLayout';
import InternNotifications from './pages/InternNotifications';
import InternDocuments from './pages/InternDocuments';
import { AttendanceProvider } from './context/AttendanceContext';
import { DocumentsProvider } from './context/DocumentsContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  // Temporary fake authentication state (frontend-only)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'admin' | 'intern'
  const [roleId, setRoleId] = useState(null); // adminId or internId
  const [loading, setLoading] = useState(true);

  // Load fake auth state from localStorage so refresh keeps you "logged in"
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authAPI.getUser();
          const { user } = response.data;
          
          setIsAuthenticated(true);
          setUserRole(user.isAdmin ? 'admin' : 'intern');
          setRoleId(user.isAdmin ? user.adminId : user.internId);
        } catch (err) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUserRole(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Called by LoginPage after a successful login
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUserRole(userData.role);
    setRoleId(userData.roleId);
  };

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center">Loading InTurn...</div>;

  return (
    <NotificationProvider>
      <DocumentsProvider>
        <AttendanceProvider>
          <Router>
            <Routes>
              {/* Login Logic */}
              <Route 
              path="/login" 
              element={
                isAuthenticated
                ? <Navigate to={userRole === 'admin' ? '/admin' : '/intern'} />
                : <LoginPage onLogin={handleLogin} />
              }
              />

              {/* Protected Admin Route */}
              <Route
                path="/admin/*"
                element={
                  isAuthenticated && userRole === 'admin'
                    ? <AdminDashboard adminId={roleId} />
                    : <Navigate to="/login" />
                }
              />

              {/* Protected Intern Routes */}
              <Route
                path="/intern/*"
                element={
                  isAuthenticated && userRole === 'intern'
                    ? <InternLayout internId={roleId} />
                    : <Navigate to="/login" />
                }
              >
                <Route index element={<InternDashboard />} />
                <Route path="reports" element={<InternReports />} />
                <Route path="attendance" element={<InternAttendance />} />
                <Route path="notifications" element={<InternNotifications />} />
                <Route path="documents" element={<InternDocuments />} />
              </Route>

              <Route
                path="*"
                element={<Navigate to="/login" />}/>
            </Routes>
          </Router>
        </AttendanceProvider>
      </DocumentsProvider>
    </NotificationProvider>
  );
}

export default App;