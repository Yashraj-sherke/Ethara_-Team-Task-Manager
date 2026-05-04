import { NavLink } from 'react-router-dom';
import { HiViewGrid, HiFolder, HiClipboardList, HiUsers, HiX, HiChartBar } from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = ({ isOpen, onClose }) => {
  const { isAdmin } = useAuth();

  const navItems = [
    { to: '/', icon: HiViewGrid, label: 'Dashboard', color: 'text-primary-500' },
    { to: '/projects', icon: HiFolder, label: 'Projects', color: 'text-amber-500' },
    { to: '/tasks', icon: HiClipboardList, label: 'Tasks', color: 'text-emerald-500' },
    ...(isAdmin ? [{ to: '/members', icon: HiUsers, label: 'Team', color: 'text-sky-500' }] : []),
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group ${
      isActive
        ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400 shadow-sm'
        : 'text-surface-500 hover:bg-surface-100 hover:text-surface-800 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-200'
    }`;

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-surface-900 border-r border-surface-100 dark:border-surface-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 shadow-lg shadow-primary-500/25">
                <HiChartBar className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-surface-900 dark:text-white tracking-tight">TaskFlow</span>
            </div>
            <button onClick={onClose} className="lg:hidden rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">
              <HiX className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-4">
            <p className="px-4 mb-3 text-xs font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-wider">Menu</p>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass} onClick={onClose}>
                <item.icon className={`h-5 w-5 ${item.color} group-hover:scale-110 transition-transform`} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="px-5 py-4 mx-4 mb-4 rounded-xl bg-gradient-to-br from-primary-50 to-violet-50 dark:from-primary-500/10 dark:to-violet-500/10 border border-primary-100 dark:border-primary-500/20">
            <p className="text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1">Need help?</p>
            <p className="text-xs text-surface-500 dark:text-surface-400">Check docs or contact support</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
