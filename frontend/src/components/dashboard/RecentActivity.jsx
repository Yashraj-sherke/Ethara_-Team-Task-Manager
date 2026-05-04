import { getStatusColor, timeAgo } from '../../utils/helpers';

const RecentActivity = ({ tasks = [] }) => {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-surface-100">
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Recent Activity</h3>
        <p className="text-sm text-surface-400 text-center py-8">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-surface-100">
      <h3 className="text-lg font-semibold text-surface-900 mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task._id} className="flex items-center gap-4 rounded-xl p-3 hover:bg-surface-50 transition-colors">
            <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${task.status === 'completed' ? 'bg-emerald-500' : task.status === 'in-progress' ? 'bg-amber-500' : 'bg-surface-300'}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-surface-800 truncate">{task.title}</p>
              <p className="text-xs text-surface-400">
                {task.project?.name} {task.assignedTo ? `• ${task.assignedTo.name}` : ''}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
              <span className="text-xs text-surface-400 hidden sm:block">{timeAgo(task.updatedAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
