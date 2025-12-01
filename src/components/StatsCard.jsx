import { motion } from 'framer-motion';
import { memo } from 'react';

const StatsCard = memo(({ icon: Icon, label, value, trend, color = 'blue', delay = 0 }) => {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600 shadow-blue-500/20',
        purple: 'from-purple-500 to-purple-600 shadow-purple-500/20',
        orange: 'from-orange-500 to-orange-600 shadow-orange-500/20',
        green: 'from-green-500 to-green-600 shadow-green-500/20',
        pink: 'from-pink-500 to-pink-600 shadow-pink-500/20'
    };

    const iconBgClasses = {
        blue: 'bg-blue-500/20 border-blue-500/30',
        purple: 'bg-purple-500/20 border-purple-500/30',
        orange: 'bg-orange-500/20 border-orange-500/30',
        green: 'bg-green-500/20 border-green-500/30',
        pink: 'bg-pink-500/20 border-pink-500/30'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all"
        >
            <div className="flex items-start justify-between mb-3">
                <div className={`p-3 rounded-xl border ${iconBgClasses[color]}`}>
                    <Icon size={24} className={`text-${color}-500 dark:text-${color}-400`} />
                </div>
                {trend && (
                    <div className="flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        {trend}
                    </div>
                )}
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                {value}
            </div>
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {label}
            </div>
        </motion.div>
    );
});

StatsCard.displayName = 'StatsCard';

export default StatsCard;
