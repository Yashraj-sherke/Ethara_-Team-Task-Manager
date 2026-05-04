import { useState, useEffect } from 'react';
import { HiFolder, HiClipboardList, HiCheck, HiClock, HiExclamation, HiTrendingUp } from 'react-icons/hi';
import { getDashboard } from '../api/userService';
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data.data))
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  const { stats = {}, recentTasks = [] } = data || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Dashboard</h1>
        <p className="text-sm text-surface-500 mt-1">Overview of your team's progress</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard title="Total Projects" value={stats.totalProjects || 0} icon={HiFolder} color="primary" />
        <StatsCard title="Total Tasks" value={stats.totalTasks || 0} icon={HiClipboardList} color="info" />
        <StatsCard title="Completed" value={stats.completedTasks || 0} icon={HiCheck} color="success" />
        <StatsCard title="In Progress" value={stats.inProgressTasks || 0} icon={HiTrendingUp} color="purple" />
        <StatsCard title="Pending" value={stats.pendingTasks || 0} icon={HiClock} color="warning" />
        <StatsCard title="Overdue" value={stats.overdueTasks || 0} icon={HiExclamation} color="danger" />
      </div>

      <RecentActivity tasks={recentTasks} />
    </div>
  );
};

export default Dashboard;
