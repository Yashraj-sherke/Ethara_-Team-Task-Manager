import { getStatusColor, timeAgo } from '../../utils/helpers';
import { Link } from 'react-router-dom';

const RecentActivity = ({ tasks = [] }) => {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-surface-900 p-6 shadow-sm border border-surface-100 dark:border-surface-800">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Recent Activity</h3>
        <p className="text-sm text-surface-400 text-center py-8">No recent activity</p>
      </div>
    );
  }

  const dotColors = ['bg-primary-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-500', 'bg-sky-500', 'bg-rose-500'];

  return (
    <div className="rounded-2xl bg-white dark:bg-surface-900 p-6 shadow-sm border border-surface-100 dark:border-surface-800 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white">Recent Activity</h3>
        <Link to="/tasks" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors">View All</Link>
      </div>
      <div className="space-y-1">
        {tasks.slice(0, 6).map((task, index) => (
          <div key={task._id} className="group flex items-start gap-4 rounded-xl p-3 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-all duration-200 cursor-pointer">
            <div className={`mt-1.5 h-2.5 w-2.5 rounded-full shrink-0 ${dotColors[index % dotColors.length]} ring-4 ring-white dark:ring-surface-900 group-hover:scale-125 transition-transform`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-surface-800 dark:text-surface-200 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                {task.title}
              </p>
              <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">
                {task.project?.name && <span className="text-primary-600 dark:text-primary-400 font-medium">{task.project.name}</span>}
                {task.assignedTo && <span> • Assigned to {task.assignedTo.name}</span>}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-xs text-surface-400 dark:text-surface-500">{timeAgo(task.updatedAt)}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
