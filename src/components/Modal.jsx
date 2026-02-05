function Modal({
  isOpen,
  children,
  overlayClassName = 'bg-slate-900/80',
  containerClassName = 'px-4',
  panelClassName = 'w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl',
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${overlayClassName} ${containerClassName}`.trim()}>
      <div className={panelClassName} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  );
}

export default Modal;
