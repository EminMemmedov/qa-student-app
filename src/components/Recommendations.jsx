import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useGameProgress } from '../hooks/useGameProgress';
import { useAchievements } from '../hooks/useAchievements';
import { ArrowRight, BookOpen, Bug, Trophy, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Recommendations() {
    const { t } = useTranslation();
    const { foundBugs, xp } = useGameProgress();
    const { unlockedAchievements } = useAchievements();

    // Генерация рекомендаций на основе прогресса
    const getRecommendations = () => {
        const recommendations = [];

        // Если мало багов найдено
        if (foundBugs.length < 5) {
            recommendations.push({
                title: 'Başla praktika modulları ilə',
                description: 'İlk baqları tapmaq üçün Registration moduluna bax',
                icon: Bug,
                color: 'bg-blue-500',
                link: '/practice/registration',
                priority: 'high'
            });
        }

        // Если теория не пройдена
        const theoryProgress = JSON.parse(localStorage.getItem('theory_progress') || '[]');
        if (theoryProgress.length === 0) {
            recommendations.push({
                title: 'Nəzəriyyəni öyrən',
                description: 'QA əsaslarını öyrənmək üçün nəzəriyyə moduluna bax',
                icon: BookOpen,
                color: 'bg-purple-500',
                link: '/theory',
                priority: 'high'
            });
        }

        // Если мало достижений
        if (unlockedAchievements.length < 3) {
            recommendations.push({
                title: 'Nailiyyətlərə çat',
                description: 'Daha çox nailiyyət qazanmaq üçün aktiv ol',
                icon: Trophy,
                color: 'bg-yellow-500',
                link: '/achievements',
                priority: 'medium'
            });
        }

        // Если низкий уровень
        if (xp < 200) {
            recommendations.push({
                title: 'XP topla',
                description: 'Daha çox XP qazanmaq üçün baqları tap',
                icon: Target,
                color: 'bg-green-500',
                link: '/practice',
                priority: 'medium'
            });
        }

        return recommendations.slice(0, 2); // Максимум 2 рекомендации
    };

    const recommendations = getRecommendations();

    if (recommendations.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
        >
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Target size={20} className="text-indigo-600" />
                {t('recommendations.title')}
            </h3>
            {recommendations.map((rec, index) => (
                <Link key={index} to={rec.link}>
                    <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`${rec.color} rounded-2xl p-5 text-white shadow-lg cursor-pointer group`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                                    <rec.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-lg mb-1">{rec.title}</h4>
                                    <p className="text-sm text-white/90">{rec.description}</p>
                                </div>
                            </div>
                            <ArrowRight 
                                size={20} 
                                className="text-white/60 group-hover:translate-x-1 transition-transform" 
                            />
                        </div>
                    </motion.div>
                </Link>
            ))}
        </motion.div>
    );
}

