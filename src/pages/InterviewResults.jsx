import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle, AlertTriangle, RefreshCw, Home, ChevronRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useGameProgress } from '../hooks/useGameProgress';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function InterviewResults() {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { results } = location.state || { results: [] };
    const { addXP } = useGameProgress();

    const totalScore = Math.round(results.reduce((acc, curr) => acc + curr.score, 0) / results.length);
    const passed = totalScore >= 60;

    useEffect(() => {
        if (results.length > 0) {
            const xpEarned = Math.round(totalScore * 2); // 2 XP per point
            addXP(xpEarned);
        }
    }, []);

    if (!results || results.length === 0) {
        return <div className="p-8 text-center">{t('interview.resultsPage.noResults')}</div>;
    }

    return (
        <PageTransition className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 pt-12 pb-24">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 mb-8 text-center"
                >
                    <div className="flex justify-center mb-6">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center ${passed ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                            }`}>
                            <Award size={48} />
                        </div>
                    </div>

                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                        {passed ? t('interview.resultsPage.congratulations') : t('interview.resultsPage.goodTry')}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        {passed
                            ? t('interview.resultsPage.passedMessage')
                            : t('interview.resultsPage.failedMessage')}
                    </p>

                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8">
                        {totalScore}%
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button
                            onClick={() => navigate('/interview')}
                            className="py-3 px-6 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                            <RefreshCw size={20} />
                            {t('interview.resultsPage.retry')}
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="py-3 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-colors"
                        >
                            <Home size={20} />
                            {t('interview.resultsPage.home')}
                        </button>
                    </div>
                </motion.div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 px-2">
                    {t('interview.resultsPage.detailedAnalysis')}
                </h2>

                <div className="space-y-4">
                    {results.map((result, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-slate-900 dark:text-white flex-1 mr-4">
                                    {result.question}
                                </h3>
                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${result.score >= 70 ? 'bg-green-100 text-green-700' :
                                    result.score >= 40 ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                    {result.score}%
                                </div>
                            </div>

                            <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl text-sm text-slate-600 dark:text-slate-300">
                                {result.userAnswer}
                            </div>

                            {result.missingKeywords.length > 0 && (
                                <div className="flex items-start gap-2 text-sm text-orange-600 dark:text-orange-400">
                                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                                    <span>
                                        {t('interview.resultsPage.missingKeywords')}: {result.missingKeywords.join(', ')}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
}
