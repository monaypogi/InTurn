import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  CheckSquare,
  Clock,
  AlertTriangle,
  FileText,
  UserCircle,
} from 'lucide-react';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import useFormValidation from '../../hooks/useFormValidation';
import { maxLength, oneOf } from '../../utils/validation';

const DOCUMENT_SUMMARY = {
  submitted: 48,
  approved: 24,
  pending: 24,
  missing: 15,
};

const REPORT_SUMMARY = {
  submitted: 48,
  approved: 24,
  pending: 24,
  missing: 15,
};

const REPORT_ROWS = [
  {
    id: 1,
    name: 'John Doe',
    team: 'UI/UX Designer',
    time: '09:00 AM',
    type: 'Daily Report',
    status: 'Approved',
    remarks: '',
    rowTone: 'default',
  },
  {
    id: 2,
    name: 'John Doe',
    team: 'UI/UX Designer',
    time: '09:10 AM',
    type: 'Daily Report',
    status: 'Approved',
    remarks: '',
    rowTone: 'default',
  },
  {
    id: 3,
    name: 'John Doe',
    team: 'UI/UX Designer',
    time: '09:00 AM',
    type: 'Documents',
    status: 'Approved',
    remarks: '',
    rowTone: 'default',
  },
  {
    id: 4,
    name: 'John Doe',
    team: 'UI/UX Designer',
    time: '09:00 AM',
    type: 'Documents',
    status: 'Approved',
    remarks: '',
    rowTone: 'default',
  },
  {
    id: 5,
    name: 'John Doe',
    team: 'UI/UX Designer',
    time: '---',
    type: '---',
    status: 'Did not submit',
    remarks: 'Did not submit',
    rowTone: 'danger',
  },
  {
    id: 6,
    name: 'John Doe',
    team: 'UI/UX Designer',
    time: '10:00 AM',
    type: 'Daily Report',
    status: 'Waiting...',
    remarks: 'Late Submitted',
    rowTone: 'warning',
  },
];

const PENDING_VERIFICATIONS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'JohnDoeWork@gmail.com',
    status: 'Pending Applicant',
    documents: [
      { id: 1, title: 'Documents - Non-Disclosure Agreement', file: 'Agreement.pdf' },
      { id: 2, title: 'Documents - Memorandum of Agreement', file: 'Agreement.pdf' },
    ],
  },
];

const rowToneStyles = {
  default: 'hover:bg-slate-700/40',
  warning: 'bg-amber-500/20 hover:bg-amber-500/30',
  danger: 'bg-red-500/20 hover:bg-red-500/30',
};

function SummaryCard({ title, summary, onViewAll }) {
  return (
    <div className="rounded-xl border border-slate-600 bg-slate-800 p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-slate-300">
          <CheckSquare className="h-4 w-4 text-emerald-400" />
          Submitted <span className="ml-auto text-white">{summary.submitted}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Clock className="h-4 w-4 text-amber-400" />
          Pending <span className="ml-auto text-white">{summary.pending}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <CheckSquare className="h-4 w-4 text-sky-400" />
          Approved <span className="ml-auto text-white">{summary.approved}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          Missing <span className="ml-auto text-white">{summary.missing}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onViewAll}
        className="mt-4 w-full rounded-lg bg-amber-500/80 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-500"
      >
        View All
      </button>
    </div>
  );
}

function VerificationPanel({ requests }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasRequests = requests.length > 0;
  const current = requests[currentIndex] || null;
  const { values, errors, handleChange, handleBlur, validateForm, resetForm } = useFormValidation(
    { message: '', remarks: '' },
    {
      message: [maxLength(500)],
      remarks: [maxLength(1000)],
    }
  );

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % requests.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + requests.length) % requests.length);
  };

  const handleDecision = () => {
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
  };

  useEffect(() => {
    resetForm();
  }, [currentIndex, resetForm]);

  if (!hasRequests) {
    return (
      <div className="flex min-h-[420px] flex-col rounded-xl border border-slate-600 bg-slate-800 p-6">
        <h3 className="text-lg font-semibold text-white">Document Verification</h3>
        <div className="mt-6 flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-600 bg-slate-700/40 p-6 text-center">
          <FileText className="h-8 w-8 text-slate-400" />
          <p className="text-sm text-slate-400">No pending document verification requests.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[420px] rounded-xl border border-slate-600 bg-slate-800 p-6">
      <h3 className="text-lg font-semibold text-white">Document Verification</h3>
      <div className="mt-4 flex items-center gap-3">
        <UserCircle className="h-10 w-10 text-amber-400" />
        <div>
          <p className="font-semibold text-white">{current.name}</p>
          <p className="text-xs text-slate-400">{current.email}</p>
          <p className="text-xs text-amber-300">{current.status}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {current.documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between rounded-lg border border-slate-600 bg-slate-700/40 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-slate-200" />
              <div>
                <p className="text-sm text-white">{doc.title}</p>
                <p className="text-xs text-slate-400">{doc.file}</p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-lg bg-slate-600 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-500"
            >
              View
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <label className="text-xs uppercase tracking-wide text-slate-400">Message</label>
        <textarea
          className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-700/40 p-3 text-sm text-slate-200"
          rows={2}
          placeholder="message..."
          value={values.message}
          onChange={(event) => handleChange('message', event.target.value)}
          onBlur={() => handleBlur('message')}
        />
        {errors.message && <p className="mt-2 text-xs text-red-400">{errors.message}</p>}
      </div>

      <div className="mt-4">
        <label className="text-xs uppercase tracking-wide text-slate-400">Remarks</label>
        <textarea
          className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-700/40 p-3 text-sm text-slate-200"
          rows={3}
          value={values.remarks}
          onChange={(event) => handleChange('remarks', event.target.value)}
          onBlur={() => handleBlur('remarks')}
        />
        {errors.remarks && <p className="mt-2 text-xs text-red-400">{errors.remarks}</p>}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={handleDecision}
          className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-500"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={handleDecision}
          className="flex-1 rounded-lg bg-teal-600 py-2 text-sm font-semibold text-white hover:bg-teal-500"
        >
          Approve
        </button>
      </div>

      {requests.length > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            className="rounded-lg bg-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-600"
          >
            Previous
          </button>
          <span className="text-xs text-slate-400">
            {currentIndex + 1} / {requests.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-lg bg-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function Reports() {
  const navigate = useNavigate();
  const [internFilter] = useState('All Interns');
  const typeOptions = ['All', 'Daily Report', 'Documents'];
  const { values, errors, handleChange, handleBlur } = useFormValidation(
    { search: '', typeFilter: 'All' },
    {
      search: [maxLength(100)],
      typeFilter: [oneOf(typeOptions)],
    }
  );

  const filteredRows = useMemo(() => {
    const query = values.search.trim().toLowerCase();
    return REPORT_ROWS.filter((row) => {
      const matchesQuery =
        query.length === 0 ||
        [row.name, row.team, row.type, row.status].some((field) =>
          field.toLowerCase().includes(query)
        );
      const matchesType = values.typeFilter === 'All' || row.type === values.typeFilter;
      return matchesQuery && matchesType;
    });
  }, [values.search, values.typeFilter]);

  return (
    <div className="space-y-6">
      <section className="relative rounded-xl overflow-hidden border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800')" }}
        />
        <div className="relative px-8 py-10">
          <h1 className="text-2xl font-bold text-white">Document and Reports Verification</h1>
          <p className="mt-1 text-slate-300">Approve, Reject, and Give Remarks on Intern’s Documents</p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SummaryCard
              title="Documents"
              summary={DOCUMENT_SUMMARY}
              onViewAll={() => navigate('/admin/reports/documents')}
            />
            <SummaryCard
              title="Daily Reports"
              summary={REPORT_SUMMARY}
              onViewAll={() => navigate('/admin/reports/daily')}
            />
          </div>

          <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={values.search}
                onChange={(event) => handleChange('search', event.target.value)}
                onBlur={() => handleBlur('search')}
                placeholder="Search"
                className="w-full rounded-lg border border-slate-600 bg-slate-800 py-2 pl-9 pr-3 text-sm text-slate-200"
              />
              {errors.search && <p className="mt-1 text-xs text-red-400">{errors.search}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label className="relative">
                <span className="mr-2 text-sm font-semibold text-white">Type:</span>
                <select
                  className="appearance-none rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 pr-9 text-sm text-slate-200"
                  value={values.typeFilter}
                  onChange={(event) => handleChange('typeFilter', event.target.value)}
                  onBlur={() => handleBlur('typeFilter')}
                >
                  {typeOptions.map((option) => (
                    <option key={option} value={option} className="bg-slate-800 text-slate-200">
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </label>
              {errors.typeFilter && <p className="text-xs text-red-400">{errors.typeFilter}</p>}
            </div>
          </div>

          <DataTable
            footer={
              <Pagination
                currentPage={1}
                totalPages={100}
                variant="slate"
                className="border-t border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-400"
              />
            }
          >
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-700/60">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="px-4 py-3">Intern</th>
                  <th className="px-4 py-3">Team</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 text-sm text-slate-200">
                {filteredRows.map((row) => (
                  <tr key={row.id} className={rowToneStyles[row.rowTone]}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <UserCircle className="h-8 w-8 text-amber-400" />
                        <span className="font-medium text-white">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-slate-600 px-2.5 py-0.5 text-xs text-slate-200">
                        {row.team}
                      </span>
                    </td>
                    <td className="px-4 py-3">{row.time}</td>
                    <td className="px-4 py-3">{row.type}</td>
                    <td className="px-4 py-3">{row.status}</td>
                    <td className="px-4 py-3 text-slate-300">{row.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTable>
        </div>
        </div>
        <VerificationPanel requests={PENDING_VERIFICATIONS} />
      </div>
    </div>
  );
}

export default Reports;
