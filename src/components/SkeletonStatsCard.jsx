import { memo } from 'react';

const SkeletonStatsCard = memo(() => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg border border-slate-100 dark:border-slate-700 animate-pulse">
            <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                <div className="w-12 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
            <div className="w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
            <div className="w-24 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
    );
});

SkeletonStatsCard.displayName = 'SkeletonStatsCard';

export default SkeletonStatsCard;
