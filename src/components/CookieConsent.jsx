import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function CookieConsent() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Show after 2 seconds delay
            const timer = setTimeout(() => setShow(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        localStorage.setItem('cookie_consent_date', new Date().toISOString());
        setShow(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'declined');
        localStorage.setItem('cookie_consent_date', new Date().toISOString());
        setShow(false);
        // Disable analytics if declined
        window['ga-disable-G-DXPHJRLDTV'] = true;
    };

    if (!show) return null;

    return createPortal(
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-[300]"
                >
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center shrink-0">
                                <Cookie size={24} className="text-indigo-600 dark:text-indigo-400" />
                            </div>
                            
                            <div className="flex-1">
                                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                                    Cookie İstifadəsi
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                    Təcrübənizi yaxşılaşdırmaq və statistika üçün cookie-lər istifadə edirik. 
                                    Davam etməklə siz cookie siyasətimizi qəbul edirsiniz.
                                </p>

                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAccept}
                                        className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all active:scale-95"
                                    >
                                        Qəbul et
                                    </button>
                                    <button
                                        onClick={handleDecline}
                                        className="py-2 px-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-sm transition-all active:scale-95"
                                    >
                                        İmtina
                                    </button>
                                </div>

                                <a
                                    href="#/privacy"
                                    className="block text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-2"
                                >
                                    Məxfilik Siyasəti
                                </a>
                            </div>

                            <button
                                onClick={handleDecline}
                                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0"
                            >
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}

