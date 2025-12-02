import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameProgress } from '../hooks/useGameProgress';
import { useAchievements } from '../hooks/useAchievements';
import { getStorageItem } from '../utils/storage';
import { BookOpen, Bug, Trophy, TrendingUp, ArrowRight, ChevronDown, Target, Zap } from 'lucide-react';
import { getBugsForModule } from '../data/bugs';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const moduleVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
        opacity: 1,
        height: 'auto',
        transition: { duration: 0.3 }
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.2 }
    }
};

// Названия модулей на азербайджанском
const MODULE_NAMES = {
    registration: 'Qeydiyyat',
    payment: 'Ödəniş',
    banking: 'Bank',
    ecommerce: 'E-ticarət'
};

function LearningProgress() {
    const { t } = useTranslation();
    const { foundBugs, xp } = useGameProgress();
    const { unlockedAchievements } = useAchievements();
    const [showDetails, setShowDetails] = useState(false);

    // Мемоизация прогресса теории
    const theoryData = useMemo(() => {
        const theoryProgress = getStorageItem('theory_progress', []);
        const theoryModules = 4;
        const theoryCompleted = theoryProgress.length;
        const theoryPercent = Math.round((theoryCompleted / theoryModules) * 100);
        return { theoryCompleted, theoryModules, theoryPercent };
    }, []);

    // Мемоизация прогресса по модулям практики
    const moduleProgress = useMemo(() => {
        const modules = ['registration', 'payment', 'banking', 'ecommerce'];
        return modules.map(moduleId => {
            const moduleBugs = getBugsForModule(moduleId);
            const foundInModule = foundBugs.filter(id => moduleBugs.some(b => b.id === id));
            return {
                id: moduleId,
                name: MODULE_NAMES[moduleId],
                found: foundInModule.length,
                total: moduleBugs.length,
                percent: Math.round((foundInModule.length / moduleBugs.length) * 100)
            };
        });
    }, [foundBugs]);

    // Мемоизация среднего прогресса практики
    const avgPracticeProgress = useMemo(() => {
        return Math.round(
            moduleProgress.reduce((sum, m) => sum + m.percent, 0) / moduleProgress.length
        );
    }, [moduleProgress]);

    // Мемоизация общего прогресса
    const overallProgress = useMemo(() => {
        return Math.round((theoryData.theoryPercent + avgPracticeProgress) / 2);
    }, [theoryData.theoryPercent, avgPracticeProgress]);

    // Мемоизация прогноза до следующего уровня
    const levelForecast = useMemo(() => {
        const currentLevel = Math.floor(xp / 500) + 1;
        const xpInCurrentLevel = xp % 500;
        const xpToNextLevel = 500 - xpInCurrentLevel;
        const progressToNextLevel = (xpInCurrentLevel / 500) * 100;

        // Прогноз: сколько багов нужно найти (в среднем 50 XP за баг)
        const bugsNeeded = Math.ceil(xpToNextLevel / 50);

        return {
            currentLevel,
            xpToNextLevel,
            progressToNextLevel,
            bugsNeeded
        };
    }, [xp]);

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl"
        >
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -ml-16 -mb-16"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-blue-500/30"
                        >
                            <TrendingUp size={24} className="text-blue-400" />
                        </motion.div>
                        <div>
                            <h3 className="text-lg font-black">Təhsil Proqresi</h3>
                            <p className="text-sm text-slate-400">Ümumi inkişafınız</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                        >
                            {overallProgress}%
                        </motion.div>
                        <div className="text-xs text-slate-400">Ümumi</div>
                    </div>
                </div>

                {/* Прогресс бары с улучшенной анимацией */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4 mb-6"
                >
                    {/* Теория */}
                    <motion.div variants={itemVariants} className="group">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium">Nəzəriyyə</span>
                            </div>
                            <span className="text-sm font-bold">{theoryData.theoryCompleted}/{theoryData.theoryModules}</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden group-hover:h-3 transition-all">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${theoryData.theoryPercent}%` }}
                                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full relative overflow-hidden"
                            >
                                {/* Shimmer effect */}
                                <motion.div
                                    animate={{
                                        x: ['-100%', '100%']
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2,
                                        ease: "linear"
                                    }}
                                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Практика с деталями */}
                    <motion.div variants={itemVariants}>
                        <div
                            className="flex items-center justify-between mb-2 cursor-pointer group"
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            <div className="flex items-center gap-2">
                                <Bug size={16} className="text-orange-400 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium">Praktika</span>
                                <motion.div
                                    animate={{ rotate: showDetails ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown size={14} className="text-slate-400" />
                                </motion.div>
                            </div>
                            <span className="text-sm font-bold">{foundBugs.length} baq</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden group-hover:h-3 transition-all mb-2">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${avgPracticeProgress}%` }}
                                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                                className="bg-gradient-to-r from-orange-500 to-pink-500 h-full rounded-full relative overflow-hidden"
                            >
                                {/* Shimmer effect */}
                                <motion.div
                                    animate={{
                                        x: ['-100%', '100%']
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2,
                                        ease: "linear",
                                        delay: 0.5
                                    }}
                                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                />
                            </motion.div>
                        </div>

                        {/* Детализация по модулям */}
                        <AnimatePresence>
                            {showDetails && (
                                <motion.div
                                    variants={moduleVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="mt-3 space-y-2 bg-slate-800/50 rounded-xl p-3 border border-slate-700/50"
                                >
                                    {moduleProgress.map((module, index) => (
                                        <motion.div
                                            key={module.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center justify-between text-xs group/module"
                                        >
                                            <div className="flex items-center gap-2 flex-1">
                                                <div className={`w-1.5 h-1.5 rounded-full ${module.percent === 100 ? 'bg-green-400' : 'bg-orange-400'}`} />
                                                <span className="text-slate-300 group-hover/module:text-white transition-colors">{module.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-400">{module.found}/{module.total}</span>
                                                <span className={`font-bold ${module.percent === 100 ? 'text-green-400' : 'text-orange-400'}`}>
                                                    {module.percent}%
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Достижения */}
                    <motion.div variants={itemVariants} className="group">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Trophy size={16} className="text-yellow-400 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium">Nailiyyətlər</span>
                            </div>
                            <span className="text-sm font-bold">{unlockedAchievements.length}/20</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden group-hover:h-3 transition-all">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((unlockedAchievements.length / 20) * 100, 100)}%` }}
                                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full relative overflow-hidden"
                            >
                                {/* Shimmer effect */}
                                <motion.div
                                    animate={{
                                        x: ['-100%', '100%']
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2,
                                        ease: "linear",
                                        delay: 1
                                    }}
                                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Прогноз до следующего уровня */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-4 mb-4 border border-indigo-500/30"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-indigo-500/30 rounded-lg flex items-center justify-center">
                            <Target size={16} className="text-indigo-300" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400">Növbəti səviyyəyə</div>
                            <div className="text-sm font-bold text-indigo-300">Level {levelForecast.currentLevel + 1}</div>
                        </div>
                    </div>

                    <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden mb-2">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${levelForecast.progressToNextLevel}%` }}
                            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                        />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-slate-400">
                            <Zap size={12} className="text-yellow-400" />
                            <span>{levelForecast.xpToNextLevel} XP qalıb</span>
                        </div>
                        <div className="text-slate-400">
                            ~{levelForecast.bugsNeeded} baq lazımdır
                        </div>
                    </div>
                </motion.div>

                {/* Быстрые действия */}
                <Link to="/practice">
                    <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 cursor-pointer group hover:bg-white/20 hover:border-white/30 transition-all shadow-lg hover:shadow-xl"
                    >
                        <span className="text-sm font-bold">Davam et öyrənməyə</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    );
}

// Мемоизируем компонент для предотвращения лишних рендеров
export default memo(LearningProgress);
