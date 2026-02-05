import { useMemo, useState } from 'react';
import { CheckSquare, Check, Clock, AlertTriangle, FileText, UserCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReportPageHeader from '../../components/reports/ReportPageHeader';
import ReportStatsGrid from '../../components/reports/ReportStatsGrid';
import ComplianceTable from '../../components/reports/ComplianceTable';
import MissingSubmissionsTable from '../../components/reports/MissingSubmissionsTable';
import Modal from '../../components/Modal';

const STATS = [
  { id: 'submitted', label: 'Submitted', value: 48, icon: CheckSquare, tone: 'text-emerald-400' },
  { id: 'approved', label: 'Approved', value: 24, icon: Check, tone: 'text-sky-400' },
  { id: 'pending', label: 'Pending', value: 24, icon: Clock, tone: 'text-amber-400' },
  { id: 'missing', label: 'Missing', value: 15, icon: AlertTriangle, tone: 'text-red-400' },
];

const COMPLIANCE_ROWS = [
  { id: 1, name: 'John Doe', email: 'JohnDoesWork@gmail.com', date: 'January 26, 2026', status: 'Verified' },
  { id: 2, name: 'John Doe', email: 'JohnDoesWork@gmail.com', date: 'January 26, 2026', status: 'Verified' },
  { id: 3, name: 'John Doe', email: 'JohnDoesWork@gmail.com', date: 'January 26, 2026', status: 'Verified' },
  { id: 4, name: 'John Doe', email: 'JohnDoesWork@gmail.com', date: 'January 26, 2026', status: 'Pending' },
];

const PENDING_DOCUMENTS = [
  { id: 1, title: 'Documents - Non-Disclosure Agreement', file: 'Agreement.pdf' },
  { id: 2, title: 'Documents - Memorandum of Agreement', file: 'Agreement.pdf' },
];

const MISSING_ROWS = [
  { id: 1, name: 'John Doe', email: 'JohnDoesWork@gmail.com', joined: 'January 26, 2026', files: 'NDA' },
  { id: 2, name: 'John Doe', email: 'JohnDoesWork@gmail.com', joined: 'January 26, 2026', files: 'MOA/NDA' },
  { id: 3, name: 'John Doe', email: 'JohnDoesWork@gmail.com', joined: 'January 26, 2026', files: 'MOA/NDA' },
  { id: 4, name: 'John Doe', email: 'JohnDoesWork@gmail.com', joined: 'January 26, 2026', files: 'NDA' },
];

function ViewDocuments() {
  const navigate = useNavigate();
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [activeRequest, setActiveRequest] = useState(null);
  const openVerification = (row) => {
    setActiveRequest({
      name: row.name,
      email: row.email,
      status: 'Pending Applicant',
      documents: PENDING_DOCUMENTS,
    });
    setIsVerificationOpen(true);
  };
  const closeVerification = () => {
    setIsVerificationOpen(false);
    setActiveRequest(null);
  };

  const complianceRows = useMemo(
    () =>
      COMPLIANCE_ROWS.map((row) =>
        row.status === 'Pending'
          ? {
              ...row,
              statusNode: (
                <button
                  type="button"
                  onClick={() => openVerification(row)}
                  className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 hover:bg-amber-500/30"
                >
                  {row.status}
                </button>
              ),
            }
          : row
      ),
    []
  );
  const missingRows = useMemo(() => MISSING_ROWS, []);

  return (
    <div className="space-y-6">
      <ReportPageHeader title="Documents" onBack={() => navigate('/admin/reports')} />

      <ReportStatsGrid stats={STATS} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ComplianceTable title="All Compliance" rows={complianceRows} />
        <MissingSubmissionsTable
          title="Missing Submissions"
          rows={missingRows.map((row) => ({ ...row, date: row.joined }))}
          dateLabel="Joined"
          showFiles
          footerActionLabel="View Company Documents"
          onFooterAction={() => navigate('/admin/reports/documents/upload')}
        />
      </div>

      {isVerificationOpen && activeRequest && (
        <Modal
          isOpen={isVerificationOpen}
          overlayClassName="bg-slate-900/80"
          panelClassName="w-full max-w-lg rounded-2xl border border-slate-600 bg-slate-800 p-6 shadow-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Document Verification</h3>
              <p className="text-xs text-slate-400">Review and verify the submitted documents.</p>
            </div>
            <button
              type="button"
              onClick={closeVerification}
              className="rounded-full p-1 text-slate-300 hover:bg-slate-700 hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <UserCircle className="h-10 w-10 text-amber-400" />
            <div>
              <p className="font-semibold text-white">{activeRequest.name}</p>
              <p className="text-xs text-slate-400">{activeRequest.email}</p>
              <p className="text-xs text-amber-300">{activeRequest.status}</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {activeRequest.documents.map((doc) => (
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
            />
          </div>

          <div className="mt-4">
            <label className="text-xs uppercase tracking-wide text-slate-400">Remarks</label>
            <textarea
              className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-700/40 p-3 text-sm text-slate-200"
              rows={3}
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              Reject
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg bg-teal-600 py-2 text-sm font-semibold text-white hover:bg-teal-500"
            >
              Approve
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ViewDocuments;
