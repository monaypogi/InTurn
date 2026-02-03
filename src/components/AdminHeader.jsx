import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Calendar, FileText, Bell, User } from 'lucide-react';
import LogoutButton from './LogoutButton';

// Custom logo – replace later
const LogoIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8" fill="currentColor">
    <path d="M16 2L4 10v12l12 8 12-8V10L16 2zm0 2.5L22 9v11l-6 4-6-4V9l6-4.5z" />
  </svg>
);

function AdminHeader() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive ? 'bg-slate-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`;

  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="text-amber-400">
              <LogoIcon />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight">INTURN</span>
              <p className="text-xs text-slate-400">Internship Monitoring System</p>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            <NavLink to="/admin" end className={navLinkClass}>
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </NavLink>
            <NavLink to="/admin/interns" className={navLinkClass}>
              <Briefcase className="w-5 h-5" /> Interns
            </NavLink>
            <NavLink to="/admin/attendance" className={navLinkClass}>
              <Calendar className="w-5 h-5" /> Attendance
            </NavLink>
            <NavLink to="/admin/reports" className={navLinkClass}>
              <FileText className="w-5 h-5" /> Reports
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <NavLink
              to="/admin/notifications"
              className={({ isActive }) =>
                `flex items-center justify-center p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-slate-600 text-amber-400' : 'text-amber-400 hover:bg-slate-700'
                }`
              }
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </NavLink>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
