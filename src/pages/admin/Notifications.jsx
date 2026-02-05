import { useState } from 'react';
import {
  Check,
  Clock,
  FileText,
  FileCheck,
  UserPlus,
  FileX2,
  X,
} from 'lucide-react';
import Pagination from '../../components/Pagination';

const FILTERS = [
  { id: 'all', label: 'All', count: 6, pillClass: 'bg-slate-500/30 text-slate-300' },
  { id: 'unread', label: 'Unread', count: 2, pillClass: 'bg-slate-500/30 text-slate-300' },
  { id: 'info', label: 'Info', count: 1, pillClass: 'bg-slate-500/30 text-slate-300' },
  { id: 'warning', label: 'Warning', count: 2, pillClass: 'bg-amber-500/30 text-amber-300' },
  { id: 'urgent', label: 'Urgent', count: 2, pillClass: 'bg-red-500/30 text-red-300' },
  { id: 'success', label: 'Success', count: 1, pillClass: 'bg-green-500/30 text-green-300' },
];

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'warning',
    icon: Clock,
    iconBg: 'bg-amber-500/20 text-amber-400',
    title: 'Missing Time Out',
    description: 'Emma Wilson has not recorded time-out for January 30, 2026',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'urgent',
    icon: FileText,
    iconBg: 'bg-red-500/20 text-red-400',
    title: 'Pending Daily Report',
    description: '4 interns have not submitted their daily reports today',
    time: '4 hours ago',
  },
  {
    id: 3,
    type: 'success',
    icon: FileCheck,
    iconBg: 'bg-green-500/20 text-green-400',
    title: 'Document Verified',
    description: 'NDA for Emma Wilson has been verified',
    time: '1 day ago',
  },
  {
    id: 4,
    type: 'info',
    icon: UserPlus,
    iconBg: 'bg-sky-500/20 text-sky-400',
    title: 'New Intern Added',
    description: 'Emma Wilson has been added to UI/UX department',
    time: '2 days ago',
  },
  {
    id: 5,
    type: 'warning',
    icon: Clock,
    iconBg: 'bg-amber-500/20 text-amber-400',
    title: 'Late Arrival',
    description: 'Emma Wilson arrived late on January 30, 2026',
    time: '3 days ago',
  },
  {
    id: 6,
    type: 'urgent',
    icon: FileX2,
    iconBg: 'bg-red-500/20 text-red-400',
    title: 'Document Rejected',
    description: 'MOA for Emma Wilson requires corrections',
    time: '3 days ago',
  },
];

function NotificationCard({ notification, onDismiss }) {
  const Icon = notification.icon;
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-600 bg-slate-800/80 px-5 py-4">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${notification.iconBg}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-white">{notification.title}</h3>
        <p className="mt-0.5 text-sm text-slate-400">{notification.description}</p>
        <p className="mt-2 text-xs text-slate-500">{notification.time}</p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(notification.id)}
        className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function Notifications() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [items, setItems] = useState(NOTIFICATIONS);

  const handleMarkAllRead = () => {
    // Placeholder: could set all as read in state/API
  };

  const handleDismiss = (id) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications & Alerts</h1>
          <p className="mt-1 text-slate-400">System notifications and important alerts</p>
        </div>
        <button
          type="button"
          onClick={handleMarkAllRead}
          className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-700"
        >
          <Check className="h-4 w-4" />
          Mark All as Read
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveFilter(f.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              activeFilter === f.id
                ? 'bg-slate-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {f.label}
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${f.pillClass}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {items.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onDismiss={handleDismiss}
          />
        ))}
      </div>

      <Pagination
        currentPage={1}
        totalPages={1}
        variant="slate"
        className="border-t border-slate-700 pt-4 text-sm text-slate-400"
      />
    </div>
  );
}

export default Notifications;
