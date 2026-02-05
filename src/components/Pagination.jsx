const variantStyles = {
  slate: {
    active: 'bg-slate-600 text-white',
    inactive: 'bg-slate-800 text-slate-300 hover:bg-slate-700',
    next: 'bg-slate-700 text-slate-200 hover:bg-slate-600',
  },
  teal: {
    active: 'bg-teal-500 text-white',
    inactive: 'bg-slate-700 text-slate-200 hover:bg-slate-600',
    next: 'bg-teal-500 text-white hover:bg-teal-600',
  },
  amber: {
    active: 'bg-amber-500 text-slate-900',
    inactive: 'bg-slate-700 text-slate-200 hover:bg-slate-600',
    next: 'bg-amber-500 text-slate-900 hover:bg-amber-600',
  },
};

function Pagination({
  currentPage = 1,
  totalPages = 100,
  pages = [1, 2, 3, 4, 5],
  variant = 'slate',
  nextLabel = 'Next',
  className = '',
  onPageChange,
  onNext,
}) {
  const styles = variantStyles[variant] || variantStyles.slate;

  return (
    <footer className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${className}`.trim()}>
      <span>Page {currentPage} of {totalPages}</span>
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={onPageChange ? () => onPageChange(page) : undefined}
            className={`h-8 min-w-[2rem] rounded-lg px-2 text-sm font-medium ${
              page === currentPage ? styles.active : styles.inactive
            }`}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          onClick={onNext}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${styles.next}`}
        >
          {nextLabel}
        </button>
      </div>
    </footer>
  );
}

export default Pagination;
