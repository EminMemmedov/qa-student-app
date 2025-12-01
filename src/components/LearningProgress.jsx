import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameProgress } from '../hooks/useGameProgress';
import { useAchievements } from '../hooks/useAchievements';
import { getStorageItem } from '../utils/storage';
import { BookOpen, Bug, Trophy, TrendingUp, ArrowRight } from 'lucide-react';
import { getBugsForModule } from '../data/bugs';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function LearningProgress() {
    const { t } = useTranslation();
    const { foundBugs, xp } = useGameProgress();
    const { unlockedAchievements } = useAchievements();

    // Получаем прогресс по модулям
    const theoryProgress = getStorageItem('theory_progress', []);
    const theoryModules = 4; // Всего модулей теории
    const theoryCompleted = theoryProgress.length;
    const theoryPercent = Math.round((theoryCompleted / theoryModules) * 100);

    // Прогресс по практическим модулям
    const modules = ['registration', 'payment', 'banking', 'ecommerce'];
    const moduleProgress = modules.map(moduleId => {
        const moduleBugs = getBugsForModule(moduleId);
        const foundInModule = foundBugs.filter(id => moduleBugs.some(b => b.id === id));
        return {
            id: moduleId,
            found: foundInModule.length,
            total: moduleBugs.length,
            percent: Math.round((foundInModule.length / moduleBugs.length) * 100)
        };
    });

    const avgPracticeProgress = Math.round(
        moduleProgress.reduce((sum, m) => sum + m.percent, 0) / moduleProgress.length
    );

    // Общий прогресс
    const overallProgress = Math.round((theoryPercent + avgPracticeProgress) / 2);

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
                        <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-blue-500/30">
                            <TrendingUp size={24} className="text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black">Təhsil Proqresi</h3>
                            <p className="text-sm text-slate-400">Ümumi inkişafınız</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            {overallProgress}%
                        </div>
                        <div className="text-xs text-slate-400">Ümumi</div>
                    </div>
                </div>

                {/* Прогресс бары */}
                <div className="space-y-4 mb-6">
                    {/* Теория */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} className="text-blue-400" />
                                <span className="text-sm font-medium">Nəzəriyyə</span>
                            </div>
                            <span className="text-sm font-bold">{theoryCompleted}/{theoryModules}</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${theoryPercent}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full"
                            />
                        </div>
                    </div>

                    {/* Практика */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Bug size={16} className="text-orange-400" />
                                <span className="text-sm font-medium">Praktika</span>
                            </div>
                            <span className="text-sm font-bold">{foundBugs.length} baq</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${avgPracticeProgress}%` }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="bg-gradient-to-r from-orange-500 to-pink-500 h-full rounded-full"
                            />
                        </div>
                    </div>

                    {/* Достижения */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Trophy size={16} className="text-yellow-400" />
                                <span className="text-sm font-medium">Nailiyyətlər</span>
                            </div>
                            <span className="text-sm font-bold">{unlockedAchievements.length}</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((unlockedAchievements.length / 20) * 100, 100)}%` }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Быстрые действия */}
                <Link to="/practice">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 cursor-pointer group hover:bg-white/20 transition-all"
                    >
                        <span className="text-sm font-bold">Davam et öyrənməyə</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    );
}

