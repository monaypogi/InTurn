import { useEffect, useState } from 'react';
import { UserCircle } from 'lucide-react';
import Pagination from '../Pagination';

function ComplianceTable({ title, rows, dateLabel = 'Date Submitted', rowsPerPage = 6 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(rows.length / rowsPerPage));
  const paginatedRows = rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    return start + index;
  }).filter((page) => page <= totalPages);

  useEffect(() => {
    setCurrentPage(1);
  }, [rows.length, rowsPerPage]);

  return (
    <div className="rounded-xl border border-slate-600 bg-slate-800 overflow-hidden">
      <div className="border-b border-slate-700 px-4 py-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[640px] divide-y divide-slate-700 lg:min-w-full">
          <thead className="bg-slate-700/60">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3">Intern</th>
              <th className="px-4 py-3">{dateLabel}</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 text-sm text-slate-200">
            {paginatedRows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-700/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-8 w-8 text-amber-400" />
                    <div>
                      <p className="font-medium text-white">{row.name}</p>
                      <p className="text-xs text-slate-400">{row.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{row.date}</td>
                <td className="px-4 py-3">
                  {row.statusNode ? (
                    row.statusNode
                  ) : (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        row.status === 'Verified'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {row.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pages={pageNumbers}
        variant="slate"
        className="border-t border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-400"
        onPageChange={setCurrentPage}
        onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      />
    </div>
  );
}

export default ComplianceTable;
