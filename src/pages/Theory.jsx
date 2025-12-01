import { theoryModules } from '../data/theory';
import { BookOpen, ChevronRight, ArrowLeft, Sparkles, Target, Bug, FileCheck, CheckCircle, AlertTriangle, Info, Lightbulb, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import confetti from 'canvas-confetti';
import { getStorageItem, setStorageItem } from '../utils/storage';

const moduleIcons = {
    'qa-basics': Bug,
    'test-types': FileCheck,
    'bug-reporting': Target,
    'test-planning': Sparkles
};

const moduleImages = {
    'qa-basics': '/theory-qa-basics.png',
    'test-types': '/theory-test-types.png',
    'bug-reporting': '/theory-bug-reporting.png',
    'test-planning': '/theory-test-planning.png'
};

import { memo, useMemo } from 'react';

const SimpleMarkdown = memo(({ content }) => {
    // Memoize the split operation to avoid recalculating on every render
    const blocks = useMemo(() => content.split(/(?=^### )/gm), [content]);

    return (
        <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
            {blocks.map((block, blockIndex) => {
                if (!block.trim()) return null;

                const lines = block.split('\n');
                return (
                    <div key={blockIndex} className="content-visibility-auto contain-strict mb-8">
                        {lines.map((line, i) => {
                            // Headers
                            if (line.trim().startsWith('###')) {
                                return (
                                    <h3 key={i} className="text-2xl font-black mt-4 mb-6 text-slate-800 dark:text-white flex items-center gap-3 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm py-4 -mx-4 px-4 z-10 border-b border-slate-100 dark:border-slate-800/50 transition-colors">
                                        <span className="w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full flex-shrink-0"></span>
                                        {line.replace('###', '').trim()}
                                    </h3>
                                );
                            }

                            // Bold text blocks (Alerts)
                            if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
                                return (
                                    <div key={i} className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-5 rounded-r-2xl my-6 shadow-sm">
                                        <strong className="text-indigo-900 dark:text-indigo-200 font-bold flex items-start gap-3 leading-relaxed">
                                            <Info className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                                            <span>{line.replace(/\*\*/g, '')}</span>
                                        </strong>
                                    </div>
                                );
                            }

                            // List items
                            if (line.trim().startsWith('-')) {
                                return (
                                    <li key={i} className="ml-4 list-none pl-0 mb-4 relative flex items-start gap-3 group">
                                        <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                                        <span className="text-slate-700 dark:text-slate-300 leading-loose text-lg">{line.replace('-', '').trim()}</span>
                                    </li>
                                );
                            }

                            // Code blocks (simplified)
                            if (line.trim().startsWith('```')) {
                                return null;
                            }

                            // Empty lines
                            if (line.trim() === '') {
                                return null;
                            }

                            // Regular paragraphs
                            return (
                                <p key={i} className="text-slate-600 dark:text-slate-300 leading-loose mb-6 text-lg">
                                    {line}
                                </p>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
});

const QuizComponent = ({ quiz, onComplete }) => {
    const { t } = useTranslation();
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const handleSubmit = () => {
        const score = quiz.reduce((acc, q, index) => {
            return acc + (answers[index] === q.correct ? 1 : 0);
        }, 0);
        setShowResults(true);
        if (score === quiz.length) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            onComplete();
        }
    };

    const allAnswered = quiz.every((_, index) => answers[index] !== undefined);

    return (
        <div className="mt-12 bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Sparkles className="text-yellow-500" />
                {t('theory.quiz.title')}
            </h3>

            <div className="space-y-6">
                {quiz.map((q, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
                    >
                        <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">
                            {index + 1}. {q.question}
                        </h4>
                        <div className="space-y-3">
                            {q.options.map((option, optIndex) => {
                                const isSelected = answers[index] === optIndex;
                                const isCorrect = q.correct === optIndex;
                                const showCorrect = showResults && isCorrect;
                                const showWrong = showResults && isSelected && !isCorrect;

                                return (
                                    <button
                                        key={optIndex}
                                        onClick={() => !showResults && setAnswers({ ...answers, [index]: optIndex })}
                                        disabled={showResults}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${showCorrect
                                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                            : showWrong
                                                ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                                : isSelected
                                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                                    : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${showCorrect
                                                    ? 'border-green-500 bg-green-500'
                                                    : showWrong
                                                        ? 'border-red-500 bg-red-500'
                                                        : isSelected
                                                            ? 'border-indigo-500 bg-indigo-500'
                                                            : 'border-slate-300 dark:border-slate-600'
                                                }`}>
                                                {(showCorrect || (isSelected && !showResults)) && (
                                                    <CheckCircle size={12} className="text-white" />
                                                )}
                                                {showWrong && (
                                                    <XCircle size={12} className="text-white" />
                                                )}
                                            </div>
                                            <span className={`font-medium ${showCorrect || showWrong ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                                                }`}>
                                                {option}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Show explanation after answering */}
                        {showResults && q.explanation && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl"
                            >
                                <div className="flex items-start gap-2">
                                    <Lightbulb size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-blue-900 dark:text-blue-200 text-sm mb-1">İzah:</p>
                                        <p className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">
                                            {q.explanation}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>

            {!showResults && (
                <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className={`mt-8 w-full py-4 rounded-xl font-bold text-lg transition-all ${allAnswered
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transform hover:-translate-y-1'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                        }`}
                >
                    {t('theory.quiz.checkResults')}
                </button>
            )}

            {showResults && (
                <div className="mt-8 p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center">
                    <p className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {t('theory.quiz.correctAnswers', {
                            correct: quiz.filter((q, i) => answers[i] === q.correct).length,
                            total: quiz.length
                        })}
                    </p>
                    {quiz.every((q, i) => answers[i] === q.correct) ? (
                        <p className="text-green-600 dark:text-green-400 font-medium">{t('theory.quiz.excellent')}</p>
                    ) : (
                        <p className="text-orange-500 dark:text-orange-400 font-medium">{t('theory.quiz.tryAgain')}</p>
                    )}
                </div>
            )}
        </div>
    );
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Theory() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { moduleId } = useParams();
    const selectedModule = theoryModules.find(m => m.id === moduleId);

    // Progress state
    const [completedModules, setCompletedModules] = useState(() => {
        const saved = getStorageItem('theory_progress', []);
        return Array.isArray(saved) ? saved : [];
    });

    const handleModuleComplete = (moduleId) => {
        if (!completedModules.includes(moduleId)) {
            const newCompleted = [...completedModules, moduleId];
            setCompletedModules(newCompleted);
            setStorageItem('theory_progress', newCompleted);
        }
    };

    const handleModuleClick = (module) => {
        navigate(`/theory/${module.id}`);
    };

    const handleBackClick = () => {
        navigate('/theory');
    };

    const handleNextModule = () => {
        const currentIndex = theoryModules.findIndex(m => m.id === selectedModule.id);
        if (currentIndex < theoryModules.length - 1) {
            navigate(`/theory/${theoryModules[currentIndex + 1].id}`);
            window.scrollTo(0, 0);
        } else {
            navigate('/theory');
        }
    };

    return (
        <PageTransition className="p-6 pt-12 pb-24 min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
            <AnimatePresence mode="wait">
                {!selectedModule ? (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <header className="mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 mb-4"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30">
                                    <BookOpen size={24} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{t('theory.title')}</h1>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">{t('theory.subtitle')}</p>
                                </div>
                            </motion.div>
                        </header>

                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="space-y-4"
                        >
                            {theoryModules.map((module) => {
                                const Icon = moduleIcons[module.id] || BookOpen;
                                const titleKey = module.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                                const isCompleted = completedModules.includes(module.id);

                                return (
                                    <motion.div
                                        key={module.id}
                                        variants={item}
                                        whileHover={{ scale: 1.02, y: -4 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleModuleClick(module)}
                                        className="group bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border-2 border-slate-100 dark:border-slate-700 flex items-center gap-5 cursor-pointer hover:shadow-2xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/20 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 via-indigo-50/50 to-purple-50/0 dark:via-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        <div className={`relative w-16 h-16 rounded-2xl ${module.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                            <Icon size={28} strokeWidth={2.5} />
                                            {isCompleted && (
                                                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 border-2 border-white dark:border-slate-800 shadow-sm">
                                                    <CheckCircle size={12} fill="currentColor" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 relative z-10">
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                                                {t(`theory.${titleKey}`, module.title)}
                                                {isCompleted && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-bold">Tamamlandı</span>}
                                            </h3>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-snug">
                                                {module.description}
                                            </p>
                                        </div>

                                        <ChevronRight
                                            size={24}
                                            className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-300 relative z-10"
                                        />
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 flex flex-col"
                    >
                        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center gap-4 bg-white dark:bg-slate-900 sticky top-0 shadow-sm z-50">
                            <button
                                onClick={handleBackClick}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors group"
                            >
                                <ArrowLeft size={18} className="text-slate-600 dark:text-slate-400 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium text-slate-700 dark:text-slate-300">{t('common.back')}</span>
                            </button>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">{selectedModule.title}</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{selectedModule.description}</p>
                            </div>
                            <div className="w-12"></div> {/* Spacer for balance */}
                        </div>

                        <div className="flex-1 overflow-y-auto overscroll-contain transform-gpu will-change-scroll">
                            <div className="max-w-3xl mx-auto p-6 pb-32">
                                <div className="mb-8 p-8 bg-indigo-600 sm:bg-gradient-to-br sm:from-indigo-500 sm:to-purple-600 rounded-3xl shadow-sm sm:shadow-xl relative overflow-hidden">
                                    <div className="hidden sm:block absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                                    <div className="hidden sm:block absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                                    <div className="relative z-10">
                                        {moduleImages[selectedModule.id] && (
                                            <div className="mb-6 flex justify-center">
                                                <img
                                                    src={moduleImages[selectedModule.id]}
                                                    alt={selectedModule.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    width="192"
                                                    height="192"
                                                    className="w-48 h-48 object-contain rounded-2xl bg-white/10 p-4 pointer-events-none select-none transform-gpu"
                                                />
                                            </div>
                                        )}
                                        <div className={`inline-flex items-center justify-center w-16 h-16 ${selectedModule.color} bg-white/20 rounded-2xl mb-4`}>
                                            {(() => {
                                                const Icon = moduleIcons[selectedModule.id] || BookOpen;
                                                return <Icon size={32} className="text-white" strokeWidth={2.5} />;
                                            })()}
                                        </div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-2xl font-black text-white">{selectedModule.title}</h3>
                                            {selectedModule.readingTime && (
                                                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-sm font-bold text-white">{selectedModule.readingTime} dəq</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-indigo-100 text-base sm:text-lg">{selectedModule.description}</p>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm sm:shadow-lg border border-slate-100 dark:border-slate-700 mb-8">
                                    <SimpleMarkdown content={selectedModule.content} />
                                </div>

                                {selectedModule.quiz && (
                                    <QuizComponent
                                        quiz={selectedModule.quiz}
                                        onComplete={() => handleModuleComplete(selectedModule.id)}
                                    />
                                )}

                                <div className="mt-12 flex justify-end">
                                    <button
                                        onClick={handleNextModule}
                                        className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                    >
                                        {t('theory.quiz.nextModule')} <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageTransition>
    );
}
