import { HiCalendar, HiUser } from 'react-icons/hi';
import { formatDate, isOverdue, getStatusColor, getPriorityColor } from '../../utils/helpers';

const TaskCard = ({ task, onStatusChange, onEdit, onDelete, isAdmin, currentUserId }) => {
  const overdue = isOverdue(task.dueDate, task.status);
  const canEdit = isAdmin || task.createdBy?._id === currentUserId;
  const canUpdateStatus = isAdmin || task.assignedTo?._id === currentUserId || task.createdBy?._id === currentUserId;
  const statuses = ['todo', 'in-progress', 'completed'];

  return (
    <div className={`group rounded-xl bg-white dark:bg-surface-900 p-4 sm:p-5 shadow-sm border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${overdue ? 'border-rose-200 dark:border-rose-500/30 bg-rose-50/30 dark:bg-rose-500/5' : 'border-surface-100 dark:border-surface-800 hover:border-primary-200 dark:hover:border-primary-500/30'}`}>
      <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
        <h4 className="text-sm font-semibold text-surface-900 dark:text-white leading-snug line-clamp-2">{task.title}</h4>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold shrink-0 ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-xs text-surface-500 dark:text-surface-400 mb-2 sm:mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 text-xs text-surface-400 dark:text-surface-500">
        {task.assignedTo && (
          <div className="flex items-center gap-1">
            <HiUser className="h-3.5 w-3.5" />
            <span className="truncate max-w-[100px] sm:max-w-[140px]">{task.assignedTo.name}</span>
          </div>
        )}
        {task.dueDate && (
          <div className={`flex items-center gap-1 ${overdue ? 'text-rose-600 dark:text-rose-400 font-medium' : ''}`}>
            <HiCalendar className="h-3.5 w-3.5" />
            <span>{formatDate(task.dueDate)}{overdue ? ' ⚠' : ''}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        {canUpdateStatus ? (
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className={`rounded-full px-2 sm:px-2.5 py-1 text-xs font-semibold border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${getStatusColor(task.status)}`}
          >
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        ) : (
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusColor(task.status)}`}>{task.status}</span>
        )}

        {canEdit && (
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(task)} className="rounded-lg p-1.5 text-surface-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors text-xs">Edit</button>
            <button onClick={() => onDelete(task._id)} className="rounded-lg p-1.5 text-surface-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors text-xs">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
