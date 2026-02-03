import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, User, Users, CheckCircle } from 'lucide-react';
import AdminHeader from '../../components/AdminHeader';
import MetricCard from '../../components/MetricCard';
import InternManagement from './InternManagement';
import AttendanceMonitoring from './AttendanceMonitoring';
import Notifications from './Notifications';
import Reports from './Reports';
import ViewDocuments from './ViewDocuments';
import ViewDailyReports from './ViewDailyReports';
import DocumentUpload from './DocumentUpload';

// Mock data
const MOCK_INTERNS = [
  { id: 1, name: 'John Doe', time: '2 hours ago', team: 'UI/UX - Team 1', status: 'Present - On time', statusType: 'present' },
  { id: 2, name: 'Jane Smith', time: '2 hours ago', team: 'Frontend - AVAA', status: 'Present - On time', statusType: 'present' },
  { id: 3, name: 'Bob Wilson', time: '2 hours ago', team: 'QA - Team 1', status: 'Absent', statusType: 'absent' },
];
const MOCK_SUBMISSIONS = [
  { id: 1, name: 'John Doe', time: '2 hours ago', type: 'Documents', status: 'Pending Applicant' },
  { id: 2, name: 'Jane Smith', time: '2 hours ago', type: 'Daily Reports', status: 'Pending Applicant' },
  { id: 3, name: 'Bob Wilson', time: '2 hours ago', type: 'Documents', status: 'Pending Applicant' },
];

function AdminLayout() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Render content by path so nested Routes are not needed (avoids matching issues with /admin/*)
  let mainContent = null;
  if (pathname === '/admin' || pathname === '/admin/') {
    mainContent = <DashboardHome currentTime={currentTime} />;
  } else if (pathname.startsWith('/admin/interns')) {
    mainContent = <InternManagement />;
  } else if (pathname.startsWith('/admin/attendance')) {
    mainContent = <AttendanceMonitoring />;
  } else if (pathname.startsWith('/admin/notifications')) {
    mainContent = <Notifications />;
  } else if (pathname.startsWith('/admin/reports/documents/upload')) {
    mainContent = <DocumentUpload />;
  } else if (pathname.startsWith('/admin/reports/documents')) {
    mainContent = <ViewDocuments />;
  } else if (pathname.startsWith('/admin/reports/daily')) {
    mainContent = <ViewDailyReports />;
  } else if (pathname.startsWith('/admin/reports')) {
    mainContent = <Reports />;
  } else {
    mainContent = <DashboardHome currentTime={currentTime} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {mainContent}
      </main>
    </div>
  );
}

function DashboardHome({ currentTime }) {
  const navigate = useNavigate();
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <>
      {/* Welcome banner */}
      <section className="relative rounded-xl overflow-hidden mb-8 bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800')] bg-cover bg-center opacity-30" />
        <div className="relative px-8 py-10">
          <h1 className="text-3xl font-bold mb-1">Welcome, Admin</h1>
          <p className="text-slate-300 text-sm mb-4">
            {formattedDate} {formattedTime}
          </p>
          <p className="text-slate-200 mb-1">Monitor and manage your interns efficiently</p>
          <p className="text-slate-400 text-sm mb-6">
            Track attendance, review reports, and verify documents in a centralized dashboard.
          </p>
          <button
            type="button"
            onClick={() => navigate('/admin/reports')}
            className="px-5 py-2.5 rounded-lg font-medium bg-amber-500 hover:bg-amber-600 text-white transition-colors"
          >
            View Reports
          </button>
        </div>
      </section>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard icon={<Users className="w-10 h-10" />} label="Total Interns" value="128" />
        <MetricCard icon={<CheckCircle className="w-10 h-10" />} label="Today's Attendance" value="42 | 128" />
        <MetricCard icon={<FileText className="w-10 h-10" />} label="Pending Reports" value="21" />
        <MetricCard icon={<FileText className="w-10 h-10" />} label="Pending Documents" value="9" />
      </div>

      {/* Three columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ManageInternsCard interns={MOCK_INTERNS} />
        <RecentSubmissionsCard submissions={MOCK_SUBMISSIONS} />
        <AttendanceSummaryCard present={42} late={10} absent={7} />
      </div>
    </>
  );
}

function ManageInternsCard({ interns }) {
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl overflow-hidden">
      <h2 className="px-6 py-4 text-lg font-semibold border-b border-slate-600">Manage Interns</h2>
      <ul className="divide-y divide-slate-600">
        {interns.map((intern) => (
          <li key={intern.id} className="px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-amber-400">
                  <User className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-white truncate">{intern.name}</p>
                  <p className="text-slate-400 text-sm">{intern.time}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        intern.statusType === 'present' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <span className="text-sm text-slate-300">
                      {intern.team} · {intern.status}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="flex-shrink-0 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium"
              >
                Manage
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecentSubmissionsCard({ submissions }) {
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl overflow-hidden">
      <h2 className="px-6 py-4 text-lg font-semibold border-b border-slate-600">Recent Submissions</h2>
      <ul className="divide-y divide-slate-600">
        {submissions.map((sub) => (
          <li key={sub.id} className="px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-amber-400">
                  <User className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-white truncate">{sub.name}</p>
                  <p className="text-slate-400 text-sm">{sub.time}</p>
                  <p className="text-sm text-slate-300 mt-1">
                    {sub.type} · {sub.status}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="flex-shrink-0 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium"
              >
                Review
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AttendanceSummaryCard({ present, late, absent }) {
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl overflow-hidden">
      <h2 className="px-6 py-4 text-lg font-semibold border-b border-slate-600">Attendance</h2>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-green-400 font-medium">Present</span>
          <span className="text-xl font-bold text-white">{present}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-amber-400 font-medium">Late</span>
          <span className="text-xl font-bold text-white">{late}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-red-400 font-medium">Absent</span>
          <span className="text-xl font-bold text-white">{absent}</span>
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-slate-400">This section will be built out in a future update.</p>
    </div>
  );
}

function AdminDashboard() {
  return <AdminLayout />;
}

export default AdminDashboard;
