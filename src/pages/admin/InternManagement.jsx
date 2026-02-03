import { Search, ChevronDown, Eye, BarChart3, Edit3 } from 'lucide-react';

const interns = [
  {
    id: 1,
    name: 'Emma Wilson',
    email: 'emma.wilson@gmail.com',
    department: 'UI/UX Designer',
    supervisor: 'Anna Lee',
    status: 'Active',
    startDate: '2026-01-01',
  },
  {
    id: 2,
    name: 'Liam Carter',
    email: 'liam.carter@gmail.com',
    department: 'Frontend Developer',
    supervisor: 'Jacob Kim',
    status: 'Active',
    startDate: '2026-01-01',
  },
  {
    id: 3,
    name: 'Mia Johnson',
    email: 'mia.johnson@gmail.com',
    department: 'QA Engineer',
    supervisor: 'Sofia Martinez',
    status: 'Inactive',
    startDate: '2026-01-01',
  },
  {
    id: 4,
    name: 'Noah Brown',
    email: 'noah.brown@gmail.com',
    department: 'Product Design',
    supervisor: 'Anna Lee',
    status: 'Active',
    startDate: '2026-01-01',
  },
  {
    id: 5,
    name: 'Olivia Green',
    email: 'olivia.green@gmail.com',
    department: 'Data Analyst',
    supervisor: 'Jacob Kim',
    status: 'Pending',
    startDate: '2026-01-01',
  },
  {
    id: 6,
    name: 'Ethan Rivera',
    email: 'ethan.rivera@gmail.com',
    department: 'Marketing',
    supervisor: 'Sofia Martinez',
    status: 'Active',
    startDate: '2026-01-01',
  },
  {
    id: 7,
    name: 'Sophia Clark',
    email: 'sophia.clark@gmail.com',
    department: 'UI/UX Designer',
    supervisor: 'Anna Lee',
    status: 'Active',
    startDate: '2026-01-01',
  },
];

const statusStyles = {
  Active: 'bg-green-500/20 text-green-300 border border-green-500/30',
  Inactive: 'bg-red-500/20 text-red-300 border border-red-500/30',
  Pending: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
};

function FilterButton({ label, value }) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-between rounded-lg bg-slate-700 border border-slate-600 px-4 py-3 text-left text-slate-200 transition-colors hover:bg-slate-600"
    >
      <span>
        <span className="block text-[11px] uppercase tracking-wide text-slate-400">{label}</span>
        <span className="text-sm font-medium">{value}</span>
      </span>
      <ChevronDown className="w-4 h-4 text-slate-400" />
    </button>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function Avatar({ name }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-base font-semibold text-amber-400">
      {initial}
    </div>
  );
}

function InternManagement() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold text-white">Intern Management</h1>
        <p className="mt-1 text-slate-400">Add and manage intern profiles</p>
      </section>

      <div className="rounded-xl border border-slate-600 bg-slate-800 p-6 space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full rounded-lg border border-slate-600 bg-slate-700 py-3 pl-11 pr-4 text-slate-100 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
            <FilterButton label="Status" value="All" />
            <FilterButton label="Department" value="All" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-600 bg-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700/60">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Supervisor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Start Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 text-sm text-slate-200">
              {interns.map((intern) => (
                <tr key={intern.id} className="hover:bg-slate-700/60">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={intern.name} />
                      <div>
                        <p className="font-medium text-white">{intern.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{intern.email}</td>
                  <td className="px-6 py-4">{intern.department}</td>
                  <td className="px-6 py-4">{intern.supervisor}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={intern.status} />
                  </td>
                  <td className="px-6 py-4">{intern.startDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        className="rounded-lg bg-slate-700 p-2 text-slate-200 transition-colors hover:bg-slate-600"
                        aria-label="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-lg bg-slate-700 p-2 text-slate-200 transition-colors hover:bg-slate-600"
                        aria-label="Performance"
                      >
                        <BarChart3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-lg bg-slate-700 p-2 text-slate-200 transition-colors hover:bg-slate-600"
                        aria-label="Edit"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-col gap-4 border-t border-slate-700 bg-slate-800 px-6 py-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <span>Page 1 of 100</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                type="button"
                className={`h-8 w-8 rounded-lg text-sm font-medium ${
                  page === 1 ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-amber-600"
            >
              Next
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default InternManagement;
