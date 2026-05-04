import { HiFolder, HiUsers, HiClipboardList } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const { taskCounts = {} } = project;
  const progress = taskCounts.total > 0 ? Math.round((taskCounts.completed / taskCounts.total) * 100) : 0;

  return (
    <Link to={`/projects/${project._id}`} className="group block">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-surface-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
            <HiFolder className="h-6 w-6" />
          </div>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${project.status === 'active' ? 'bg-emerald-100 text-emerald-700' : project.status === 'completed' ? 'bg-sky-100 text-sky-700' : 'bg-surface-100 text-surface-600'}`}>
            {project.status}
          </span>
        </div>

        <h3 className="text-base font-semibold text-surface-900 mb-1 group-hover:text-primary-700 transition-colors truncate">{project.name}</h3>
        <p className="text-sm text-surface-500 mb-4 line-clamp-2">{project.description}</p>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-surface-500 mb-1.5">
            <span>Progress</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-surface-100 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-surface-400">
          <div className="flex items-center gap-1">
            <HiUsers className="h-4 w-4" />
            <span>{project.members?.length || 0} members</span>
          </div>
          <div className="flex items-center gap-1">
            <HiClipboardList className="h-4 w-4" />
            <span>{taskCounts.total || 0} tasks</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
