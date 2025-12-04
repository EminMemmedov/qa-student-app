import { motion } from 'framer-motion';
import { Bug, ArrowLeft, Trophy, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useGameProgress } from '../hooks/useGameProgress';
import { moduleBugs } from '../data/bugs';
import { useState } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function FoundBugs() {
    const { foundBugs, resetProgress, xp, getBugPoints, getBugDifficulty } = useGameProgress();
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    // Group found bugs by module
    const bugsByModule = {};
    let totalPoints = 0;

    Object.keys(moduleBugs).forEach(moduleName => {
        const moduleBugList = moduleBugs[moduleName];
        const foundInModule = moduleBugList.filter(bug => foundBugs.includes(bug.id));

        if (foundInModule.length > 0) {
            bugsByModule[moduleName] = foundInModule;

            // Calculate points for this module
            foundInModule.forEach(bug => {
                const difficulty = getBugDifficulty(bug.id);
                const points = getBugPoints(difficulty);
                totalPoints += points;
            });
        }
    });

    const moduleNames = {
        registration: 'Qeydiyyat',
        payment: 'Ödəniş',
        banking: 'Bank Köçürməsi',
        ecommerce: 'E-Ticarət'
    };

    const moduleColors = {
        registration: 'from-blue-500 to-cyan-500',
        payment: 'from-purple-500 to-pink-500',
        banking: 'from-green-500 to-emerald-500',
        ecommerce: 'from-orange-500 to-red-500'
    };

    const difficultyColors = {
        easy: 'bg-green-100 text-green-700 border-green-300',
        medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        hard: 'bg-red-100 text-red-700 border-red-300'
    };

    const severityColors = {
        Minor: 'bg-slate-100 text-slate-700',
        Major: 'bg-orange-100 text-orange-700',
        Critical: 'bg-red-100 text-red-700'
    };

    const handleReset = () => {
        resetProgress();
        setShowResetConfirm(false);
    };

    return (
        <PageTransition className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 pt-12 pb-24">
            {/* Reset Confirmation Modal */}
            {showResetConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl"
                    >
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 size={32} className="text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                                Proqresi Sıfırla?
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Bütün tapılmış baqlar və XP silinəcək. Bu əməliyyat geri qaytarıla bilməz.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowResetConfirm(false)}
                                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                Ləğv et
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex-1 py-3 px-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
                            >
                                Sıfırla
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 sm:mb-8"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center text-slate-500 dark:text-slate-400 mb-3 sm:mb-4 hover:text-slate-800 dark:hover:text-slate-200 transition-colors text-sm sm:text-base"
                    >
                        <ArrowLeft size={18} className="sm:w-5 sm:h-5 mr-1" />
                        Ana Səhifə
                    </Link>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-1 sm:mb-2">
                                Tapılan Baqlar
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-lg">
                                Praktika modullarında tapdığınız bütün baqlar
                            </p>
                        </div>
                    </div>
                </motion.header>

                {/* Stats Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl sm:rounded-3xl p-4 sm:p-8 mb-6 sm:mb-8 text-white shadow-xl"
                >
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 text-center">
                            <div className="text-xs sm:text-base font-medium opacity-90 mb-1">Ümumi Tapılmış Baqlar</div>
                            <div className="text-4xl sm:text-6xl font-black">{foundBugs.length}</div>
                        </div>
                        <div className="flex-1 text-center">
                            <div className="text-xs sm:text-base font-medium opacity-90 mb-1">Qazanılan XP</div>
                            <div className="text-4xl sm:text-5xl font-black">{totalPoints}</div>
                        </div>
                        <div className="hidden sm:block p-6 bg-white/20 rounded-2xl">
                            <Bug size={48} />
                        </div>
                    </div>
                </motion.div>

                {/* Bugs by Module */}
                {foundBugs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Bug size={48} className="text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            Hələ baq tapılmayıb
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6">
                            Praktika modullarına keçid edib baq axtarmağa başlayın
                        </p>
                        <Link
                            to="/practice"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors"
                        >
                            <Bug size={20} />
                            Praktikaya Keç
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        {Object.keys(bugsByModule).map(moduleName => (
                            <motion.div
                                key={moduleName}
                                variants={itemVariants}
                                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden"
                            >
                                {/* Module Header */}
                                <div className={`bg-gradient-to-r ${moduleColors[moduleName]} p-4 sm:p-5 text-white`}>
                                    <div className="flex items-center justify-between gap-3">
                                        <h3 className="text-lg sm:text-xl font-black truncate">{moduleNames[moduleName]}</h3>
                                        <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full flex-shrink-0">
                                            <CheckCircle size={16} />
                                            <span className="font-bold text-sm">{bugsByModule[moduleName].length} baq</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bugs List */}
                                <div className="p-3 sm:p-4 space-y-3">
                                    {bugsByModule[moduleName].map(bug => {
                                        const difficulty = getBugDifficulty(bug.id);
                                        const points = getBugPoints(difficulty);

                                        return (
                                            <div
                                                key={bug.id}
                                                className="flex items-start gap-3 p-3 sm:p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-600"
                                            >
                                                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                                                    <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px] text-green-600 dark:text-green-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm sm:text-base text-slate-900 dark:text-white font-medium mb-2 leading-snug">
                                                        {bug.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${difficultyColors[difficulty]}`}>
                                                            {difficulty.toUpperCase()} • +{points} XP
                                                        </span>
                                                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${severityColors[bug.severity]}`}>
                                                            {bug.severity}
                                                        </span>
                                                        {bug.isDevTool && (
                                                            <span className="text-xs px-2 py-1 rounded-full font-bold bg-indigo-100 text-indigo-700">
                                                                DevTools
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))}

                        {/* Reset Button */}
                        <motion.button
                            variants={itemVariants}
                            onClick={() => setShowResetConfirm(true)}
                            className="w-full py-4 px-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center gap-2 border-2 border-red-200 dark:border-red-800"
                        >
                            <Trash2 size={20} />
                            Proqresi Sıfırla
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </PageTransition>
    );
}
