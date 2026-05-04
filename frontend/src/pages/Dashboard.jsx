import { useState, useEffect } from 'react';
import { HiFolder, HiClipboardList, HiCheck, HiClock, HiExclamation, HiTrendingUp, HiPlus } from 'react-icons/hi';
import { getDashboard } from '../api/userService';
import { useAuth } from '../hooks/useAuth';
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data.data))
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  const { stats = {}, recentTasks = [] } = data || {};

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getDateString = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white">
            {getGreeting()}, {user?.name?.split(' ')[0]} <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-2 flex items-center gap-2">
            <span>📅</span> {getDateString()} • You have <span className="font-bold text-primary-600 dark:text-primary-400">{stats.pendingTasks || 0} tasks</span> to complete
          </p>
        </div>
        {isAdmin && (
          <Link to="/projects" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            <HiPlus className="h-4 w-4" /> New Project
          </Link>
        )}
      </div>

      {/* Stats Grid - 3 columns top, 3 columns bottom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatsCard title="Total Projects" value={stats.totalProjects || 0} icon={HiFolder} color="primary" trend="+12%" />
        <StatsCard title="Total Tasks" value={stats.totalTasks || 0} icon={HiClipboardList} color="info" trend="Stable" />
        <StatsCard title="Completed" value={stats.completedTasks || 0} icon={HiCheck} color="success" trend="+24%" />
        <StatsCard title="In Progress" value={stats.inProgressTasks || 0} icon={HiTrendingUp} color="purple" trend="In Flow" />
        <StatsCard title="Pending" value={stats.pendingTasks || 0} icon={HiClock} color="warning" trend="-5%" />
        <StatsCard title="Overdue" value={stats.overdueTasks || 0} icon={HiExclamation} color="danger" trend={stats.overdueTasks > 0 ? 'Action Required' : 'All Clear'} />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RecentActivity tasks={recentTasks} />
        </div>
        <div className="rounded-2xl bg-white dark:bg-surface-900 p-6 shadow-sm border border-surface-100 dark:border-surface-800 hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/projects" className="flex items-center gap-3 rounded-xl p-3 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors group">
              <HiFolder className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">View Projects</span>
            </Link>
            <Link to="/tasks" className="flex items-center gap-3 rounded-xl p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors group">
              <HiClipboardList className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Manage Tasks</span>
            </Link>
            {isAdmin && (
              <Link to="/members" className="flex items-center gap-3 rounded-xl p-3 bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-colors group">
                <HiFolder className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Team Members</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
