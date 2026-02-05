import { useState } from 'react';
import { FileText, X, Upload, CloudUpload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReportPageHeader from '../../components/reports/ReportPageHeader';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';

const DOCUMENTS = [
  { id: 1, name: 'Non-Disclosure Agreement (NDA)', uploadedAt: '2026-01-01' },
  { id: 2, name: 'Business Permit', uploadedAt: '2026-01-01' },
  { id: 3, name: 'Internship Agreement', uploadedAt: '2026-01-01' },
];

function DocumentUpload() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <ReportPageHeader title="Documents" onBack={() => navigate('/admin/reports/documents')} />

      <DataTable title="Documents & Requirements">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-700/60">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3">Document Name</th>
              <th className="px-4 py-3">Date Uploaded</th>
              <th className="px-4 py-3"> </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 text-sm text-slate-200">
            {DOCUMENTS.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-700/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-slate-300" />
                    <span className="text-white">{doc.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{doc.uploadedAt}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg bg-red-500/80 px-3 py-1 text-xs font-semibold text-white hover:bg-red-500"
                  >
                    <X className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-600"
        >
          <Upload className="h-4 w-4" />
          Upload Documents
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        overlayClassName="bg-slate-900/70"
        panelClassName="w-full max-w-md rounded-xl border border-slate-600 bg-slate-800 shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
          <h3 className="text-base font-semibold text-white">Document Upload</h3>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-600 bg-slate-700/40 px-4 py-8 text-center">
            <CloudUpload className="h-8 w-8 text-slate-400" />
            <p className="mt-3 text-sm text-slate-200">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-400">PDF, DOC, DOCX (max. 100MB)</p>
          </div>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg bg-teal-600 py-2 text-sm font-semibold text-white hover:bg-teal-500"
            >
              Upload
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DocumentUpload;
