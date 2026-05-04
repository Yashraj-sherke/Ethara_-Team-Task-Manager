const TaskFilters = ({ filters, onChange }) => {
  const selectClass = "rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 px-3 py-2 text-xs sm:text-sm text-surface-700 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all";

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <select className={selectClass} value={filters.status} onChange={(e) => onChange({ ...filters, status: e.target.value })}>
        <option value="">All Status</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select className={selectClass} value={filters.priority} onChange={(e) => onChange({ ...filters, priority: e.target.value })}>
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      {(filters.status || filters.priority) && (
        <button onClick={() => onChange({ status: '', priority: '' })} className="rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-surface-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
          Clear
        </button>
      )}
    </div>
  );
};

export default TaskFilters;
