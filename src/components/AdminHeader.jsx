import { useEffect, useRef, useState } from 'react';
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
  const mobileMenuRef = useRef(null);
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive ? 'bg-slate-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`;
  const iconLinkClass = ({ isActive }) =>
    `flex items-center justify-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-slate-600 text-amber-400' : 'text-amber-400 hover:bg-slate-700'
    }`;

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleClickOutside = (event) => {
      if (!mobileMenuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 lg:hidden">
          <div className="text-amber-400">
            <LogoIcon />
          </div>

          <div ref={mobileMenuRef} className="relative lg:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-2 text-sm text-slate-200"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              Menu
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-xl border border-slate-600 bg-slate-800/95 p-3 shadow-2xl backdrop-blur-sm">
                <nav className="flex flex-col gap-1">
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
                  <NavLink to="/admin/notifications" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                    <Bell className="w-5 h-5" /> Notifications
                  </NavLink>
                  <NavLink to="/admin/profile" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                    <User className="w-5 h-5" /> Profile
                  </NavLink>
                </nav>
                <div className="mt-3 flex justify-end border-t border-slate-700 pt-3">
                  <LogoutButton />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden grid-cols-[auto_1fr_auto] items-center gap-6 py-3 lg:grid">
          <div className="text-amber-400">
            <LogoIcon />
          </div>

          <div className="min-w-0">
            <nav className="flex items-center justify-center gap-1">
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
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-4">
            <NavLink
              to="/admin/notifications"
              className={iconLinkClass}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </NavLink>
            <NavLink
              to="/admin/profile"
              className={iconLinkClass}
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </NavLink>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
