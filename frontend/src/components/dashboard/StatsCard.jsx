const StatsCard = ({ title, value, icon: Icon, color = 'primary', trend }) => {
  const configs = {
    primary: { bg: 'bg-primary-50 dark:bg-primary-500/10', icon: 'text-primary-600 dark:text-primary-400', bar: 'bg-primary-400', trendColor: 'text-primary-600', border: 'hover:border-primary-200 dark:hover:border-primary-500/30' },
    success: { bg: 'bg-emerald-50 dark:bg-emerald-500/10', icon: 'text-emerald-600 dark:text-emerald-400', bar: 'bg-emerald-400', trendColor: 'text-emerald-600', border: 'hover:border-emerald-200 dark:hover:border-emerald-500/30' },
    warning: { bg: 'bg-amber-50 dark:bg-amber-500/10', icon: 'text-amber-600 dark:text-amber-400', bar: 'bg-amber-400', trendColor: 'text-amber-600', border: 'hover:border-amber-200 dark:hover:border-amber-500/30' },
    danger: { bg: 'bg-rose-50 dark:bg-rose-500/10', icon: 'text-rose-600 dark:text-rose-400', bar: 'bg-rose-400', trendColor: 'text-rose-600', border: 'hover:border-rose-200 dark:hover:border-rose-500/30' },
    info: { bg: 'bg-sky-50 dark:bg-sky-500/10', icon: 'text-sky-600 dark:text-sky-400', bar: 'bg-sky-400', trendColor: 'text-sky-600', border: 'hover:border-sky-200 dark:hover:border-sky-500/30' },
    purple: { bg: 'bg-violet-50 dark:bg-violet-500/10', icon: 'text-violet-600 dark:text-violet-400', bar: 'bg-violet-400', trendColor: 'text-violet-600', border: 'hover:border-violet-200 dark:hover:border-violet-500/30' },
  };

  const c = configs[color] || configs.primary;
  const bars = [40, 65, 85, 55, 70];

  return (
    <div className={`group relative rounded-2xl bg-white dark:bg-surface-900 p-5 shadow-sm border border-surface-100 dark:border-surface-800 ${c.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.bg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          {Icon && <Icon className={`h-5 w-5 ${c.icon}`} />}
        </div>
        {trend && (
          <span className={`text-xs font-bold ${c.trendColor} bg-white dark:bg-surface-800 px-2 py-0.5 rounded-full border border-surface-100 dark:border-surface-700`}>
            {trend}
          </span>
        )}
      </div>

      <p className="text-xs font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-1">{title}</p>
      <p className="text-3xl font-bold text-surface-900 dark:text-white mb-3">{value}</p>

      {/* Mini bar chart */}
      <div className="flex items-end gap-1.5 h-6">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm ${i === bars.length - 1 ? c.bar : 'bg-surface-200 dark:bg-surface-700'} transition-all duration-500 group-hover:opacity-100`}
            style={{ height: `${h}%`, opacity: i === bars.length - 1 ? 1 : 0.5 + (i * 0.1) }}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsCard;
