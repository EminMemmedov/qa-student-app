import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';

const languages = [
    { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
];

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const changeLanguage = (langCode) => {
        i18n.changeLanguage(langCode);
        localStorage.setItem('language', langCode);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700"
            >
                <Globe size={18} className="text-slate-600 dark:text-slate-400" />
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:inline">
                    {currentLanguage.name}
                </span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
                        >
                            {languages.map((lang) => (
                                <motion.button
                                    key={lang.code}
                                    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                                    onClick={() => changeLanguage(lang.code)}
                                    className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{lang.flag}</span>
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {lang.name}
                                        </span>
                                    </div>
                                    {i18n.language === lang.code && (
                                        <Check size={16} className="text-blue-600 dark:text-blue-400" />
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
