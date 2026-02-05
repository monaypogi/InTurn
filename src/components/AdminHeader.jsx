import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Calendar, FileText, Bell, User, Menu, X } from 'lucide-react';
import LogoutButton from './LogoutButton';
import logo from '../assets/Logo.png';

const LogoIcon = () => (
  <img
    src={logo}
    alt="InTurn logo"
    className="h-12 sm:h-16 lg:h-19 w-48 sm:w-56 lg:w-64 object-contain"
  />
);

function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive ? 'bg-slate-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`;

  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="text-amber-400">
              <LogoIcon />
            </div>
          </div>

          <div className="flex items-center justify-between lg:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-2 text-sm text-slate-200"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              Menu
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
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

          <div className="flex items-center gap-4 self-end lg:self-auto">
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
            <NavLink
              to="/admin/profile"
              className={({ isActive }) =>
                `flex items-center justify-center p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-slate-600 text-amber-400' : 'text-amber-400 hover:bg-slate-700'
                }`
              }
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </NavLink>
            <LogoutButton />
          </div>
        </div>

        {isMenuOpen && (
          <nav className="flex flex-col gap-2 pb-4 lg:hidden">
            <NavLink to="/admin" end className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </NavLink>
            <NavLink to="/admin/interns" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
              <Briefcase className="w-5 h-5" /> Interns
            </NavLink>
            <NavLink to="/admin/attendance" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
              <Calendar className="w-5 h-5" /> Attendance
            </NavLink>
            <NavLink to="/admin/reports" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
              <FileText className="w-5 h-5" /> Reports
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

export default AdminHeader;
