import { forwardRef } from 'react';

const Input = forwardRef(({ label, type = 'text', error, className = '', ...props }, ref) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">{label}</label>}
    <input
      ref={ref}
      type={type}
      className={`w-full rounded-xl border bg-white dark:bg-surface-800 px-3.5 py-2.5 text-sm text-surface-900 dark:text-surface-200 placeholder:text-surface-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${error ? 'border-rose-400 focus:border-rose-500' : 'border-surface-200 dark:border-surface-700 focus:border-primary-500'} ${className}`}
      {...props}
    />
    {error && <p className="text-xs text-rose-500">{error}</p>}
  </div>
));

Input.displayName = 'Input';
export default Input;
