const StatsCard = ({ title, value, icon: Icon, color = 'primary', trend }) => {
  const colors = {
    primary: 'from-primary-500 to-primary-700 shadow-primary-500/25',
    success: 'from-emerald-500 to-emerald-700 shadow-emerald-500/25',
    warning: 'from-amber-500 to-amber-700 shadow-amber-500/25',
    danger: 'from-rose-500 to-rose-700 shadow-rose-500/25',
    info: 'from-sky-500 to-sky-700 shadow-sky-500/25',
    purple: 'from-violet-500 to-violet-700 shadow-violet-500/25',
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-surface-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-surface-500">{title}</p>
          <p className="text-3xl font-bold text-surface-900">{value}</p>
          {trend && <p className="text-xs text-surface-400">{trend}</p>}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colors[color]} shadow-lg`}>
          {Icon && <Icon className="h-6 w-6 text-white" />}
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${colors[color]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </div>
  );
};

export default StatsCard;
