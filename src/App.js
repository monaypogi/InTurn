import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import InternDashboard from './pages/InternDashboard';
import InternAttendance from './pages/InternAttendance';
import InternReports from './pages/InternReports';
import InternLayout from "./layouts/InternLayout";
import InternNotifications from './pages/InternNotifications';
import InternDocuments from './pages/InternDocuments';
import { AttendanceProvider } from "./context/AttendanceContext";
import { DocumentsProvider } from "./context/DocumentsContext";
import { NotificationProvider } from './context/NotificationContext';

function App() {
  const isAuthenticated = true;
  const userRole = 'intern';

  return (
    <NotificationProvider>
      <DocumentsProvider>
        <AttendanceProvider>
          <Router>
            <Routes>

              {/* Login */}
              <Route path="/login" element={<LoginPage />} />

              {/* Admin */}
              <Route
                path="/admin/*"
                element={
                  isAuthenticated && userRole === 'admin'
                    ? <AdminDashboard />
                    : <Navigate to="/login" />
                }
              />

              {/* Intern layout */}
              <Route
                path="/intern/*"
                element={
                  isAuthenticated && userRole === 'intern'
                    ? <InternLayout />
                    : <Navigate to="/login" />
                }
              >
                <Route index element={<InternDashboard />} />
                <Route path="reports" element={<InternReports />} />
                <Route path="attendance" element={<InternAttendance />} />
                <Route path="notifications" element={<InternNotifications />} />
                <Route path="documents" element={<InternDocuments />} />

              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/intern" />} />

            </Routes>
          </Router>
        </AttendanceProvider>
      </DocumentsProvider>
    </NotificationProvider>
  );
}

export default App;
