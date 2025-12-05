import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, LibraryBig, Filter, Sparkles, ChevronLeft, ChevronDown, Lightbulb, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { glossaryTerms, categories } from '../data/glossary';
import { useDebounce } from '../hooks/useDebounce';
import { getStorageItem, setStorageItem } from '../utils/storage';

export default function Glossary() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language || 'az';
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedTerm, setExpandedTerm] = useState(null);
    const [favorites, setFavorites] = useState(() => getStorageItem('glossary_favorites', []));
    const termRefs = useRef({});

    // Term of the Day (Random based on date)
    const termOfDay = useMemo(() => {
        const today = new Date().getDate();
        return glossaryTerms[today % glossaryTerms.length];
    }, []);

    const toggleFavorite = (termId) => {
        const newFavorites = favorites.includes(termId)
            ? favorites.filter(id => id !== termId)
            : [...favorites, termId];
        setFavorites(newFavorites);
        setStorageItem('glossary_favorites', newFavorites);
    };

    const scrollToLetter = (letter) => {
        const term = filteredTerms.find(t => t.term.toUpperCase().startsWith(letter));
        if (term && termRefs.current[term.id]) {
            termRefs.current[term.id].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const filteredTerms = useMemo(() => {
        let terms = glossaryTerms.filter(item => {
            const matchesSearch = item.term.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                item.definition[lang]?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                item.definition['en'].toLowerCase().includes(debouncedSearch.toLowerCase());

            // If favorites filter is selected, only show favorited items
            if (selectedCategory === 'favorites') {
                return matchesSearch && favorites.includes(item.id);
            }

            // Otherwise, filter by category
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        return terms.sort((a, b) => a.term.localeCompare(b.term));
    }, [debouncedSearch, selectedCategory, lang, favorites]);

    const categoryColors = {
        basics: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        documentation: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
        types: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
        techniques: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
        process: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
        bug_management: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    };

    return (
        <PageTransition className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 pt-20 sm:pt-24 pb-24 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <Link to="/" className="p-2 sm:p-3 bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all text-slate-600 dark:text-slate-300">
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Link>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2 sm:gap-3">
                            <LibraryBig className="text-blue-600 dark:text-blue-400 w-6 h-6 sm:w-8 sm:h-8" />
                            QA Lüğəti
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                            Terminlər və onların izahı
                        </p>
                    </div>
                </div>

                {/* Term of the Day */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-xl shadow-indigo-500/20 mb-6 sm:mb-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3 sm:mb-4 text-indigo-100 font-bold text-xs sm:text-sm uppercase tracking-wider">
                            <Sparkles className="w-4 h-4" />
                            Günün Termini
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3">{termOfDay.term}</h2>
                        <p className="text-indigo-50 text-sm sm:text-lg leading-relaxed mb-3 sm:mb-4">
                            {termOfDay.definition[lang] || termOfDay.definition['en']}
                        </p>
                        {termOfDay.example && (
                            <div className="bg-white/10 rounded-xl p-3 sm:p-4 border border-white/10">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase text-indigo-200 mb-1">
                                    <Lightbulb size={12} /> Nümunə
                                </div>
                                <p className="text-xs sm:text-sm font-medium">{termOfDay.example[lang] || termOfDay.example['en']}</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Search & Filter */}
                <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 sticky top-16 sm:top-20 z-30 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-xl py-3 sm:py-4 -mx-4 px-4 sm:mx-0 sm:px-0 transition-colors duration-300">
                    <div className="relative w-full">
                        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-4 h-4 sm:w-5 sm:h-5" />
                        <input
                            type="text"
                            placeholder={t('common.search', 'Axtar...')}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm focus:shadow-md outline-none focus:border-blue-500 dark:focus:border-blue-400 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
                        <button
                            onClick={() => setSelectedCategory('favorites')}
                            className={`px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-2 ${selectedCategory === 'favorites'
                                ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/30'
                                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                                }`}
                        >
                            <Star size={16} className={selectedCategory === 'favorites' ? 'fill-current' : ''} />
                            Sevimlilər ({favorites.length})
                        </button>
                        {Object.entries(categories).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setSelectedCategory(key)}
                                className={`px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${selectedCategory === key
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {label[lang] || label['en']}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content with Alphabet Nav */}
                <div className="flex gap-6">
                    {/* Alphabet Navigation - Desktop Only */}
                    <div className="hidden lg:block sticky top-32 h-fit">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="flex flex-col gap-1">
                                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
                                    const hasTerms = filteredTerms.some(t => t.term.toUpperCase().startsWith(letter));
                                    return (
                                        <button
                                            key={letter}
                                            onClick={() => scrollToLetter(letter)}
                                            disabled={!hasTerms}
                                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${hasTerms
                                                ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                                                : 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                                }`}
                                        >
                                            {letter}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Terms Grid */}
                    <div className="flex-1 grid gap-4">
                        <AnimatePresence>
                            {filteredTerms.length > 0 ? (
                                filteredTerms.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        ref={el => termRefs.current[item.id] = el}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all group relative"
                                    >
                                        {/* Favorite Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite(item.id);
                                            }}
                                            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                        >
                                            <Star
                                                className={`w-4 h-4 sm:w-5 sm:h-5 transition-all ${favorites.includes(item.id)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-slate-300 dark:text-slate-600 hover:text-yellow-400'
                                                    }`}
                                            />
                                        </button>

                                        <div
                                            onClick={() => setExpandedTerm(expandedTerm === item.id ? null : item.id)}
                                            className="cursor-pointer"
                                        >
                                            <div className="flex justify-between items-start mb-2 sm:mb-3 pr-8 sm:pr-10">
                                                <div>
                                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {item.term}
                                                    </h3>
                                                    <span className={`inline-block mt-1.5 sm:mt-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${categoryColors[item.category] || 'bg-slate-100 text-slate-500'}`}>
                                                        {categories[item.category]?.[lang] || item.category}
                                                    </span>
                                                </div>
                                                {item.example && (
                                                    <ChevronDown
                                                        className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 transition-transform duration-300 ${expandedTerm === item.id ? 'rotate-180' : ''}`}
                                                    />
                                                )}
                                            </div>

                                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                                                {item.definition[lang] || item.definition['en']}
                                            </p>

                                            <AnimatePresence>
                                                {expandedTerm === item.id && item.example && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                                                            <div className="flex items-center gap-2 text-xs font-bold uppercase text-blue-500 mb-1">
                                                                <Lightbulb size={12} /> Nümunə
                                                            </div>
                                                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                                                {item.example[lang] || item.example['en']}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-12 text-slate-400"
                                >
                                    <Filter size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>Heç nə tapılmadı</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
