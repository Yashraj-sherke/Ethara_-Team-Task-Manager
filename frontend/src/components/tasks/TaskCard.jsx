import { HiCalendar, HiUser, HiFlag } from 'react-icons/hi';
import { formatDate, isOverdue, getStatusColor, getPriorityColor } from '../../utils/helpers';

const TaskCard = ({ task, onStatusChange, onEdit, onDelete, isAdmin, currentUserId }) => {
  const overdue = isOverdue(task.dueDate, task.status);
  const canEdit = isAdmin || task.createdBy?._id === currentUserId;
  const canUpdateStatus = isAdmin || task.assignedTo?._id === currentUserId || task.createdBy?._id === currentUserId;
  const statuses = ['todo', 'in-progress', 'completed'];

  return (
    <div className={`rounded-xl bg-white p-5 shadow-sm border transition-all duration-200 hover:shadow-md ${overdue ? 'border-rose-200 bg-rose-50/30' : 'border-surface-100'}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <h4 className="text-sm font-semibold text-surface-900 leading-snug">{task.title}</h4>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-surface-500 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-surface-400">
        {task.assignedTo && (
          <div className="flex items-center gap-1">
            <HiUser className="h-3.5 w-3.5" />
            <span>{task.assignedTo.name}</span>
          </div>
        )}
        {task.dueDate && (
          <div className={`flex items-center gap-1 ${overdue ? 'text-rose-600 font-medium' : ''}`}>
            <HiCalendar className="h-3.5 w-3.5" />
            <span>{formatDate(task.dueDate)}{overdue ? ' (Overdue)' : ''}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        {canUpdateStatus ? (
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${getStatusColor(task.status)}`}
          >
            {statuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        ) : (
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        )}

        {canEdit && (
          <div className="flex items-center gap-1">
            <button onClick={() => onEdit(task)} className="rounded-lg p-1.5 text-surface-400 hover:text-primary-600 hover:bg-primary-50 transition-colors text-xs">Edit</button>
            <button onClick={() => onDelete(task._id)} className="rounded-lg p-1.5 text-surface-400 hover:text-rose-600 hover:bg-rose-50 transition-colors text-xs">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
