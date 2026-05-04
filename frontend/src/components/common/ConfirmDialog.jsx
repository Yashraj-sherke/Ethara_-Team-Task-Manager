import Button from './Button';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="fixed inset-0 bg-surface-900/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-t-2xl sm:rounded-2xl bg-white dark:bg-surface-900 p-5 sm:p-6 shadow-2xl animate-in">
        <h3 className="text-base sm:text-lg font-semibold text-surface-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-surface-500 dark:text-surface-400 mb-5">{message}</p>
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
          <Button variant="secondary" onClick={onCancel} className="w-full sm:w-auto">Cancel</Button>
          <Button variant="danger" onClick={onConfirm} className="w-full sm:w-auto">Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
