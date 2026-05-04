import { NavLink } from 'react-router-dom';
import { HiViewGrid, HiFolder, HiClipboardList, HiUsers, HiX } from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = ({ isOpen, onClose }) => {
  const { isAdmin } = useAuth();

  const navItems = [
    { to: '/', icon: HiViewGrid, label: 'Dashboard' },
    { to: '/projects', icon: HiFolder, label: 'Projects' },
    { to: '/tasks', icon: HiClipboardList, label: 'Tasks' },
    ...(isAdmin ? [{ to: '/members', icon: HiUsers, label: 'Members' }] : []),
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
        : 'text-surface-300 hover:bg-surface-800 hover:text-white'
    }`;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-surface-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-6 py-6 border-b border-surface-800">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/30">
                <HiClipboardList className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">TaskFlow</span>
            </div>
            <button onClick={onClose} className="lg:hidden rounded-lg p-1.5 text-surface-400 hover:bg-surface-800 hover:text-white">
              <HiX className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-6">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass} onClick={onClose}>
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="px-4 py-4 border-t border-surface-800">
            <p className="text-xs text-surface-500 text-center">Team Task Manager v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
