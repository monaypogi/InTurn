import { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import MetricCard from '../../components/MetricCard';

const ATTENDANCE_ROWS = [
  { id: 1, name: 'John Doe', team: 'UI/UX Designer', timeIn: '09:00 AM', timeOut: '---', hours: '2 hours', status: 'Present - On time', statusType: 'present' },
  { id: 2, name: 'Jane Smith', team: 'Frontend - AVAA', timeIn: '09:10 AM', timeOut: '---', hours: '2 hours', status: 'Present - Late', statusType: 'late' },
  { id: 3, name: 'Bob Wilson', team: 'QA - Team 1', timeIn: '---', timeOut: '---', hours: '---', status: 'Absent', statusType: 'absent' },
  { id: 4, name: 'Emma Wilson', team: 'UI/UX Designer', timeIn: '09:00 AM', timeOut: '---', hours: '2 hours', status: 'Present - On time', statusType: 'present' },
  { id: 5, name: 'Liam Carter', team: 'Frontend Developer', timeIn: '09:05 AM', timeOut: '---', hours: '2 hours', status: 'Present - On time', statusType: 'present' },
];

const statusTextClass = {
  present: 'text-green-400',
  late: 'text-amber-400',
  absent: 'text-red-400',
};

function Avatar({ name }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-amber-400">
      {initial}
    </div>
  );
}

function AttendanceMonitoring() {
  const [startDate, setStartDate] = useState('04 / 21 / 2026');
  const [endDate, setEndDate] = useState('06 / 24 / 2026');
  const [reportType, setReportType] = useState('Present - On Time');

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative rounded-xl overflow-hidden border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800')" }}
        />
        <div className="relative px-8 py-10">
          <h1 className="text-2xl font-bold text-white">Attendance Monitoring & Reports</h1>
          <p className="mt-1 text-slate-300">Monitor and generate attendance reports of your interns.</p>
        </div>
      </section>

      {/* Attendance Overview */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Attendance Overview</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Present" value="42" variant="teal" />
          <MetricCard label="Late" value="10" variant="warning" />
          <MetricCard label="Absent" value="7" variant="danger" />
          <MetricCard label="Undertime" value="0" variant="default" />
        </div>
      </section>

      {/* Two columns: table + sidebar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Intern Attendance table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Intern Attendance</h2>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
            >
              Filter <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <div className="rounded-xl border border-slate-600 bg-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-700">
                <thead className="bg-slate-700/60">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <th className="px-4 py-3">Intern</th>
                    <th className="px-4 py-3">Team</th>
                    <th className="px-4 py-3">Time In</th>
                    <th className="px-4 py-3">Time Out</th>
                    <th className="px-4 py-3">Hours Rendered</th>
                    <th className="px-4 py-3">Attendance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700 text-sm text-slate-200">
                  {ATTENDANCE_ROWS.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-700/40">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar name={row.name} />
                          <span className="font-medium text-white">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block rounded-full bg-slate-600 px-2.5 py-0.5 text-xs text-slate-200">
                          {row.team}
                        </span>
                      </td>
                      <td className="px-4 py-3">{row.timeIn}</td>
                      <td className="px-4 py-3">{row.timeOut}</td>
                      <td className="px-4 py-3">{row.hours}</td>
                      <td className={`px-4 py-3 font-medium ${statusTextClass[row.statusType] || 'text-slate-300'}`}>
                        {row.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <footer className="flex flex-col gap-3 border-t border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <span>Page 1 of 100</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`h-8 min-w-[2rem] rounded-lg px-2 text-sm font-medium ${
                      p === 1 ? 'bg-teal-500 text-white' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  className="rounded-lg bg-teal-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-600"
                >
                  Next &gt;
                </button>
              </div>
            </footer>
          </div>
        </div>

        {/* Right: Generate Reports + Attendance Summary */}
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-600 bg-slate-800 p-6">
            <h3 className="text-base font-semibold text-white">Generate Reports</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 py-2.5 pl-3 pr-10 text-slate-100"
                  />
                  <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 py-2.5 pl-3 pr-10 text-slate-100"
                  />
                  <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
                  Type
                </label>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg border border-slate-600 bg-slate-700 px-3 py-2.5 text-left text-slate-200"
                >
                  {reportType}
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
              </div>
              <button
                type="button"
                className="w-full rounded-lg bg-teal-500 py-2.5 font-medium text-white hover:bg-teal-600"
              >
                Generate Report
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-600 bg-slate-800 p-6">
            <h3 className="text-base font-semibold text-white">Attendance Summary</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
              January 25 - 31, 2026
              <Calendar className="h-4 w-4" />
            </p>
            <div className="mt-4 h-48 rounded-lg border border-slate-600 bg-slate-700/50 flex items-center justify-center text-slate-400 text-sm">
              Bar chart placeholder (S M T W T F S)
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-green-500" /> Present
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-red-500" /> Absent
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-amber-500" /> Late
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-sky-400" /> Undertime
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceMonitoring;
