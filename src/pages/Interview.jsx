import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, ChevronRight, Award, AlertCircle, CheckCircle } from 'lucide-react';
import { interviewQuestions } from '../data/interviewQuestions';
import PageTransition from '../components/PageTransition';

import { useTranslation } from 'react-i18next';

export default function Interview() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [interviewStarted, setInterviewStarted] = useState(false);
    const [selectedType, setSelectedType] = useState('mixed'); // technical, situational, behavioral, mixed
    const allAnswersRef = useRef([]);

    const filteredQuestions = selectedType === 'mixed'
        ? interviewQuestions
        : interviewQuestions.filter(q => q.type === selectedType);

    // Shuffle questions on start
    const [questions, setQuestions] = useState([]);

    const startInterview = () => {
        const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5).slice(0, 5); // Take 5 random questions
        setQuestions(shuffled);
        setInterviewStarted(true);
        setAnswers([]);
        allAnswersRef.current = [];
    };

    const handleSubmit = () => {
        if (!userAnswer.trim()) return;

        const currentQ = questions[currentQuestionIndex];
        const keywords = currentQ.keywords;
        const foundKeywords = keywords.filter(k => userAnswer.toLowerCase().includes(k.toLowerCase()));
        const score = Math.round((foundKeywords.length / keywords.length) * 100);

        const result = {
            questionId: currentQ.id,
            question: currentQ.question,
            userAnswer,
            score: Math.min(score + 20, 100), // Add base score for effort
            foundKeywords,
            missingKeywords: keywords.filter(k => !foundKeywords.includes(k)),
            tips: currentQ.tips
        };

        setFeedback(result);
        const newAnswers = [...answers, result];
        setAnswers(newAnswers);
        allAnswersRef.current = newAnswers;
    };

    const handleNext = () => {
        setFeedback(null);
        setUserAnswer('');

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // Navigate to results with all collected answers
            navigate('/practice/interview-results', { state: { results: allAnswersRef.current } });
        }
    };

    if (!interviewStarted) {
        return (
            <PageTransition className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 pt-20 pb-24">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                <MessageSquare size={40} className="text-white" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-4">
                            {t('interview.title')}
                        </h1>
                        <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
                            {t('interview.subtitle')}
                        </p>

                        <div className="space-y-4 mb-8">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                {t('interview.selectType')}
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {['mixed', 'technical', 'situational', 'behavioral'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`p-4 rounded-xl border-2 transition-all capitalize ${selectedType === type
                                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-purple-300'
                                            }`}
                                    >
                                        {t(`interview.types.${type}`)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={startInterview}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg"
                        >
                            {t('interview.start')}
                            <ChevronRight size={24} />
                        </button>
                    </motion.div>
                </div>
            </PageTransition>
        );
    }

    const currentQ = questions[currentQuestionIndex];

    return (
        <PageTransition className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 pt-12 pb-24">
            <div className="max-w-2xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                        <span>{t('interview.question')} {currentQuestionIndex + 1} / {questions.length}</span>
                        <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-full"
                        />
                    </div>
                </div>

                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 mb-6"
                >
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        {currentQ.question}
                    </h2>

                    {!feedback ? (
                        <div className="space-y-4">
                            <textarea
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder={t('interview.answerPlaceholder')}
                                className="w-full h-40 p-4 rounded-xl bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 focus:border-purple-500 focus:outline-none resize-none text-slate-900 dark:text-white"
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={!userAnswer.trim()}
                                className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                            >
                                {t('interview.submit')}
                                <Send size={20} />
                            </button>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600">
                                <p className="text-slate-600 dark:text-slate-300 italic">"{userAnswer}"</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className={`flex-1 p-4 rounded-xl border-l-4 ${feedback.score >= 70 ? 'bg-green-50 border-green-500' :
                                    feedback.score >= 40 ? 'bg-yellow-50 border-yellow-500' :
                                        'bg-red-50 border-red-500'
                                    }`}>
                                    <div className="text-sm text-slate-500 mb-1">{t('interview.feedback.match')}</div>
                                    <div className="text-2xl font-black text-slate-900">{feedback.score}%</div>
                                </div>
                                <div className="flex-1 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                                    <div className="text-sm text-slate-500 mb-1">{t('interview.feedback.keywords')}</div>
                                    <div className="text-2xl font-black text-slate-900">
                                        {feedback.foundKeywords.length} / {feedback.foundKeywords.length + feedback.missingKeywords.length}
                                    </div>
                                </div>
                            </div>

                            {feedback.missingKeywords.length > 0 && (
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                        <AlertCircle size={18} className="text-orange-500" />
                                        {t('interview.feedback.missing')}:
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {feedback.missingKeywords.map(k => (
                                            <span key={k} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                                                {k}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                                <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2 flex items-center gap-2">
                                    <Award size={18} />
                                    {t('interview.feedback.tip')}:
                                </h4>
                                <p className="text-indigo-800 dark:text-indigo-200 text-sm">
                                    {feedback.tips}
                                </p>
                            </div>

                            <button
                                onClick={handleNext}
                                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                            >
                                {currentQuestionIndex + 1 === questions.length ? t('interview.results') : t('interview.next')}
                                <ChevronRight size={20} />
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </PageTransition>
    );
}
