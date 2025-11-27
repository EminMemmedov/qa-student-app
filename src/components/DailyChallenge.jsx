import { motion } from 'framer-motion';
import { useDailyChallenge } from '../hooks/useDailyChallenge';
import { useTranslation } from 'react-i18next';
import { Target, CheckCircle, Zap } from 'lucide-react';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function DailyChallenge() {
    const { t } = useTranslation();
    const { challenge, progress, completed, getProgressPercent } = useDailyChallenge();

    if (!challenge) return null;

    const progressPercent = getProgressPercent();
    const title = challenge.titleKey ? t(challenge.titleKey) : challenge.title;
    const description = challenge.descriptionKey ? t(challenge.descriptionKey) : challenge.description;

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl p-6 text-white shadow-xl"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <span className="text-2xl">{challenge.icon}</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-black">{t('dailyChallenge.title')}</h3>
                            <p className="text-sm text-white/80">{title}</p>
                        </div>
                    </div>
                    {completed && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
                        >
                            <CheckCircle size={20} />
                        </motion.div>
                    )}
                </div>

                <p className="text-sm text-white/90 mb-4">{description}</p>

                <div className="mb-3">
                    <div className="flex justify-between text-xs font-bold mb-2">
                        <span>{t('dailyChallenge.progress')}</span>
                        <span>{progress} / {challenge.target}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 0.5 }}
                            className="bg-white h-full rounded-full shadow-lg"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold">
                    <Zap size={16} />
                    <span>{t('dailyChallenge.reward')}: +{challenge.reward} XP</span>
                </div>
            </div>
        </motion.div>
    );
}

