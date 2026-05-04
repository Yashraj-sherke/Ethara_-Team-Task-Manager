import { Link } from 'react-router-dom';
import { HiFolder, HiUsers, HiClipboardList, HiPencil, HiTrash } from 'react-icons/hi';
import { formatDate } from '../../utils/helpers';

const ProjectCard = ({ project, isAdmin, onEdit, onDelete }) => {
  const statusColors = {
    active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    completed: 'bg-primary-100 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400',
    'on-hold': 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  };

  return (
    <div className="group rounded-2xl bg-white dark:bg-surface-900 p-5 sm:p-6 shadow-sm border border-surface-100 dark:border-surface-800 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary-200 dark:hover:border-primary-500/30 transition-all duration-300">
      <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-500/10 group-hover:scale-110 transition-transform">
            <HiFolder className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="min-w-0">
            <Link to={`/projects/${project._id}`} className="text-sm sm:text-base font-semibold text-surface-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors truncate block">
              {project.name}
            </Link>
            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium mt-1 ${statusColors[project.status] || statusColors.active}`}>
              {project.status}
            </span>
          </div>
        </div>
        {isAdmin && (
          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button onClick={(e) => { e.preventDefault(); onEdit(); }} className="p-1.5 rounded-lg text-surface-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors">
              <HiPencil className="h-3.5 w-3.5" />
            </button>
            <button onClick={(e) => { e.preventDefault(); onDelete(); }} className="p-1.5 rounded-lg text-surface-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
              <HiTrash className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {project.description && (
        <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mb-3 sm:mb-4 line-clamp-2">{project.description}</p>
      )}

      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-surface-400 dark:text-surface-500 pt-3 border-t border-surface-100 dark:border-surface-800">
        <div className="flex items-center gap-1.5">
          <HiUsers className="h-3.5 w-3.5" />
          <span>{project.members?.length || 0}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <HiClipboardList className="h-3.5 w-3.5" />
          <span>{project.taskCount || 0} tasks</span>
        </div>
        <span className="ml-auto">{formatDate(project.createdAt)}</span>
      </div>
    </div>
  );
};

export default ProjectCard;
