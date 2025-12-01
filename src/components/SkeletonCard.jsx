import { motion } from 'framer-motion';

/**
 * Skeleton loader component for cards
 * Provides a smooth loading animation while content is being fetched
 */
export const SkeletonCard = ({ className = '' }) => {
    return (
        <div className={`animate-pulse ${className}`}>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
        </div>
    );
};

/**
 * Skeleton loader for leaderboard items
 */
export const SkeletonLeaderboardItem = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700"
        >
            {/* Rank */}
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>

            {/* User info */}
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32 animate-pulse"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20 animate-pulse"></div>
            </div>

            {/* XP */}
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16 animate-pulse"></div>
        </motion.div>
    );
};

/**
 * Skeleton loader for practice module cards
 */
export const SkeletonModuleCard = () => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 animate-pulse">
            <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
            </div>
        </div>
    );
};

/**
 * Skeleton loader for achievement cards
 */
export const SkeletonAchievement = () => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 animate-pulse">
            <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
            </div>
        </div>
    );
};

/**
 * Generic skeleton loader with customizable lines
 */
export const SkeletonLoader = ({ lines = 3, className = '' }) => {
    return (
        <div className={`space-y-3 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"
                    style={{ width: `${100 - (i * 10)}%` }}
                ></div>
            ))}
        </div>
    );
};

export default SkeletonCard;
