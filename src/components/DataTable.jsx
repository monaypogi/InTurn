function DataTable({
  title,
  children,
  footer = null,
  className = '',
  headerClassName = 'border-b border-slate-700 px-4 py-3',
  titleClassName = 'text-lg font-semibold text-white',
  bodyClassName = 'overflow-x-auto',
}) {
  return (
    <div className={`rounded-xl border border-slate-600 bg-slate-800 overflow-hidden ${className}`.trim()}>
      {title ? (
        <div className={headerClassName}>
          <h2 className={titleClassName}>{title}</h2>
        </div>
      ) : null}
      <div className={bodyClassName}>{children}</div>
      {footer}
    </div>
  );
}

export default DataTable;
