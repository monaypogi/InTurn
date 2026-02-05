import { UserCircle, Upload } from 'lucide-react';

function MissingSubmissionsTable({
  title,
  rows,
  dateLabel = 'Date',
  showFiles = false,
  actionLabel = 'Remind',
  footerActionLabel,
  onFooterAction,
}) {
  return (
    <div className="rounded-xl border border-slate-600 bg-slate-800 overflow-hidden flex flex-col">
      <div className="border-b border-slate-700 px-4 py-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-700/60">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3">Intern</th>
              <th className="px-4 py-3">{dateLabel}</th>
              {showFiles && <th className="px-4 py-3">Files</th>}
              <th className="px-4 py-3"> </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 text-sm text-slate-200">
            {rows.map((row) => (
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
                {showFiles && <td className="px-4 py-3">{row.files}</td>}
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="rounded-lg bg-amber-500/70 px-3 py-1 text-xs font-semibold text-slate-900 hover:bg-amber-500"
                  >
                    {actionLabel}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footerActionLabel && (
        <div className="mt-auto flex items-center justify-end border-t border-slate-700 bg-slate-800 px-4 py-4">
          <button
            type="button"
            onClick={onFooterAction}
            className="flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-600"
          >
            <Upload className="h-4 w-4" />
            {footerActionLabel}
          </button>
        </div>
      )}
    </div>
  );
}

export default MissingSubmissionsTable;
