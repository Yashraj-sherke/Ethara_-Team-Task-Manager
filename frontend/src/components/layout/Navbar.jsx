import { HiMenu, HiLogout } from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { getInitials } from '../../utils/helpers';

const Navbar = ({ onMenuClick }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-surface-100">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden rounded-lg p-2 text-surface-500 hover:bg-surface-100 hover:text-surface-700 transition-colors">
            <HiMenu className="h-5 w-5" />
          </button>
          <div className="hidden sm:block">
            <h2 className="text-sm font-medium text-surface-400">Welcome back,</h2>
            <p className="text-base font-semibold text-surface-900">{user?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`hidden sm:inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${isAdmin ? 'bg-primary-100 text-primary-700' : 'bg-emerald-100 text-emerald-700'}`}>
            {user?.role}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-bold text-white shadow-md">
            {getInitials(user?.name)}
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-surface-500 hover:bg-rose-50 hover:text-rose-600 transition-colors" title="Logout">
            <HiLogout className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
