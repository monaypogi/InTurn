import { useMemo } from 'react';
import { CheckSquare, Check, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReportPageHeader from '../../components/reports/ReportPageHeader';
import ReportStatsGrid from '../../components/reports/ReportStatsGrid';
import ComplianceTable from '../../components/reports/ComplianceTable';
import MissingSubmissionsTable from '../../components/reports/MissingSubmissionsTable';

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

const MISSING_ROWS = [
  { id: 1, name: 'John Doe', email: 'JohnDoesWork@gmail.com', joined: 'January 26, 2026', files: 'NDA' },
  { id: 2, name: 'John Doe', email: 'JohnDoesWork@gmail.com', joined: 'January 26, 2026', files: 'MOA/NDA' },
  { id: 3, name: 'John Doe', email: 'JohnDoesWork@gmail.com', joined: 'January 26, 2026', files: 'MOA/NDA' },
  { id: 4, name: 'John Doe', email: 'JohnDoesWork@gmail.com', joined: 'January 26, 2026', files: 'NDA' },
];

function ViewDocuments() {
  const navigate = useNavigate();
  const complianceRows = useMemo(() => COMPLIANCE_ROWS, []);
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
          footerActionLabel="Upload Documents"
          onFooterAction={() => navigate('/admin/reports/documents/upload')}
        />
      </div>
    </div>
  );
}

export default ViewDocuments;
