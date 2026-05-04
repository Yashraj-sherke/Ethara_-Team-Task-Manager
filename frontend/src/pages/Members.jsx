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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Team Members</h1>
        <p className="text-sm text-surface-500 mt-1">{users.length} members</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <div key={u._id} className="rounded-2xl bg-white p-6 shadow-sm border border-surface-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-base font-bold text-white shadow-md">
                {getInitials(u.name)}
              </div>
              <div className="min-w-0">
                <p className="text-base font-semibold text-surface-900 truncate">{u.name}</p>
                <p className="text-sm text-surface-400 truncate">{u.email}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Badge variant={u.role === 'admin' ? 'primary' : 'success'}>{u.role}</Badge>
              <span className="text-xs text-surface-400">Joined {new Date(u.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
