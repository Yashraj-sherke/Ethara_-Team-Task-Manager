import Button from '../common/Button';

const TaskFilters = ({ filters, onChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={filters.status || ''}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        className="rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
      >
        <option value="">All Status</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={filters.dueDate || ''}
        onChange={(e) => onChange({ ...filters, dueDate: e.target.value })}
        className="rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
      >
        <option value="">All Dates</option>
        <option value="overdue">Overdue</option>
        <option value="today">Due Today</option>
        <option value="week">Due This Week</option>
      </select>

      {(filters.status || filters.dueDate) && (
        <Button variant="ghost" size="sm" onClick={() => onChange({})}>
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default TaskFilters;
