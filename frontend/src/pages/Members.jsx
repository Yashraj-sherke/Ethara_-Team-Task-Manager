import { useState, useEffect } from 'react';
import { getUsers } from '../api/userService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Badge from '../components/common/Badge';
import { getInitials } from '../utils/helpers';
import toast from 'react-hot-toast';

const Members = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data.data || []))
      .catch(() => toast.error('Failed to load members'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white">Team Members</h1>
        <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-1">{users.length} members</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {users.map((u) => (
          <div key={u._id} className="group rounded-2xl bg-white dark:bg-surface-900 p-5 sm:p-6 shadow-sm border border-surface-100 dark:border-surface-800 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary-200 dark:hover:border-primary-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-sm sm:text-base font-bold text-white shadow-md group-hover:scale-110 transition-transform">
                {getInitials(u.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base font-semibold text-surface-900 dark:text-white truncate">{u.name}</p>
                <p className="text-xs sm:text-sm text-surface-400 dark:text-surface-500 truncate">{u.email}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Badge variant={u.role === 'admin' ? 'primary' : 'success'}>{u.role}</Badge>
              <span className="text-xs text-surface-400 dark:text-surface-500">Joined {new Date(u.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
