import { useContext } from 'react';
import { HiMenu, HiLogout, HiSun, HiMoon, HiBell } from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { getInitials } from '../../utils/helpers';

const Navbar = ({ onMenuClick }) => {
  const { user, logout, isAdmin } = useAuth();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-surface-900/80 backdrop-blur-lg border-b border-surface-100 dark:border-surface-800">
      <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={onMenuClick} className="lg:hidden rounded-lg p-2 text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
            <HiMenu className="h-5 w-5" />
          </button>
          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Quick search..."
              className="w-48 lg:w-64 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 px-3 lg:px-4 py-2 text-sm text-surface-700 dark:text-surface-300 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={toggleDarkMode}
            className="rounded-xl p-2 sm:p-2.5 text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all duration-300 hover:scale-105"
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <HiSun className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" /> : <HiMoon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-500" />}
          </button>

          <button className="relative rounded-xl p-2 sm:p-2.5 text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
            <HiBell className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          <div className="hidden sm:block h-6 w-px bg-surface-200 dark:bg-surface-700 mx-1" />

          <div className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2">
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-surface-800 dark:text-surface-200">{user?.name}</p>
              <p className={`text-xs font-medium ${isAdmin ? 'text-primary-600 dark:text-primary-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{user?.role}</p>
            </div>
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-violet-600 text-xs sm:text-sm font-bold text-white shadow-md shadow-primary-500/20">
              {getInitials(user?.name)}
            </div>
            <button onClick={handleLogout} className="rounded-lg p-1.5 sm:p-2 text-surface-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 transition-colors" title="Logout">
              <HiLogout className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
