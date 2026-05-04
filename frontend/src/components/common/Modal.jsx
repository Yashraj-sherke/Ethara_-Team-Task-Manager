import { useEffect } from 'react';
import { HiX } from 'react-icons/hi';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="fixed inset-0 bg-surface-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className={`relative w-full ${sizes[size]} transform rounded-t-2xl sm:rounded-2xl bg-white dark:bg-surface-900 shadow-2xl transition-all animate-in max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between border-b border-surface-100 dark:border-surface-800 px-4 sm:px-6 py-3 sm:py-4 shrink-0">
          <h3 className="text-base sm:text-lg font-semibold text-surface-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-600 transition-colors">
            <HiX className="h-5 w-5" />
          </button>
        </div>
        <div className="px-4 sm:px-6 py-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
