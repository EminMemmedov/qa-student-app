import { motion } from 'framer-motion';

export const SkeletonLine = ({ className = '', width = 'w-full' }) => (
    <div className={`h-4 ${width} bg-slate-200 dark:bg-slate-700 rounded animate-pulse ${className}`} />
);

export const SkeletonCircle = ({ size = 'w-12 h-12', className = '' }) => (
    <div className={`${size} bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse ${className}`} />
);

export const SkeletonCard = ({ className = '' }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-white dark:bg-slate-800 rounded-2xl p-6 space-y-4 shadow-sm ${className}`}
    >
        <div className="flex items-center gap-4">
            <SkeletonCircle />
            <div className="flex-1 space-y-2">
                <SkeletonLine width="w-3/4" />
                <SkeletonLine width="w-1/2" />
            </div>
        </div>
        <SkeletonLine />
        <SkeletonLine width="w-5/6" />
    </motion.div>
);

export const SkeletonLeaderboard = () => (
    <div className="space-y-4">
        {/* Podium Skeleton */}
        <div className="flex items-end justify-center gap-4 mb-8">
            <div className="flex flex-col items-center gap-2">
                <SkeletonCircle size="w-14 h-14" />
                <div className="w-20 h-28 bg-slate-200 dark:bg-slate-700 rounded-t-2xl animate-pulse" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <SkeletonCircle size="w-20 h-20" />
                <div className="w-20 h-40 bg-slate-200 dark:bg-slate-700 rounded-t-2xl animate-pulse" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <SkeletonCircle size="w-14 h-14" />
                <div className="w-20 h-24 bg-slate-200 dark:bg-slate-700 rounded-t-2xl animate-pulse" />
            </div>
        </div>

        {/* List Items Skeleton */}
        {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 flex items-center gap-4">
                <SkeletonLine width="w-6" className="h-6" />
                <SkeletonCircle size="w-10 h-10" />
                <div className="flex-1 space-y-2">
                    <SkeletonLine width="w-32" />
                    <SkeletonLine width="w-20" className="h-3" />
                </div>
                <SkeletonLine width="w-16" />
            </div>
        ))}
    </div>
);

export const SkeletonTheory = () => (
    <div className="space-y-6">
        <SkeletonLine width="w-3/4" className="h-8" />
        <SkeletonLine width="w-full" />
        <SkeletonLine width="w-full" />
        <SkeletonLine width="w-5/6" />
        <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
        <SkeletonLine width="w-full" />
        <SkeletonLine width="w-4/5" />
    </div>
);

export const SkeletonPractice = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <SkeletonCircle size="w-12 h-12" />
                    <div className="flex-1 space-y-2">
                        <SkeletonLine width="w-2/3" />
                        <SkeletonLine width="w-1/2" className="h-3" />
                    </div>
                </div>
                <SkeletonLine width="w-full" />
            </div>
        ))}
    </div>
);

export const SkeletonHome = () => (
    <div className="space-y-8">
        {/* Profile Section */}
        <div className="flex items-center gap-4">
            <SkeletonCircle size="w-20 h-20" />
            <div className="flex-1 space-y-3">
                <SkeletonLine width="w-48" className="h-6" />
                <SkeletonLine width="w-32" />
            </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-4 space-y-3">
                    <SkeletonLine width="w-16" className="h-3" />
                    <SkeletonLine width="w-20" className="h-8" />
                </div>
            ))}
        </div>

        {/* Daily Challenge */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 space-y-4">
            <SkeletonLine width="w-48" className="bg-white/20" />
            <SkeletonLine width="w-full" className="bg-white/20" />
            <SkeletonLine width="w-3/4" className="bg-white/20" />
        </div>
    </div>
);

