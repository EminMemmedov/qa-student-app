import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare, Star } from 'lucide-react';
import { createPortal } from 'react-dom';
import { trackEvent } from '../lib/firebase';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function FeedbackModal({ isOpen, onClose }) {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!feedback.trim() && rating === 0) return;

        setIsSubmitting(true);

        try {
            // Save to Firestore
            await addDoc(collection(db, 'feedback'), {
                rating,
                feedback: feedback.trim(),
                userAgent: navigator.userAgent,
                timestamp: serverTimestamp(),
                url: window.location.href,
            });

            // Track in analytics
            trackEvent('user_feedback', {
                rating,
                has_text: !!feedback.trim(),
            });

            setSubmitted(true);
            setTimeout(() => {
                onClose();
                setSubmitted(false);
                setRating(0);
                setFeedback('');
            }, 2000);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Rəy göndərilərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="bg-white dark:bg-slate-800 w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl border-t sm:border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {submitted ? (
                            <div className="p-8 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <Send size={40} className="text-green-600" />
                                </motion.div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                                    Təşəkkürlər!
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400">
                                    Rəyiniz uğurla göndərildi. Sizin fikirləriniz bizim üçün çox dəyərlidir!
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                                            <MessageSquare size={24} className="text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-black text-slate-900 dark:text-white">
                                                Rəy bildirin
                                            </h2>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                Tətbiqi necə qiymətləndirirsiniz?
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                    >
                                        <X size={24} className="text-slate-400" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                    {/* Star Rating */}
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-3">
                                            Qiymətləndirin
                                        </p>
                                        <div className="flex items-center justify-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    className="transition-transform hover:scale-110 active:scale-95"
                                                >
                                                    <Star
                                                        size={36}
                                                        className={`${
                                                            star <= rating
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-slate-300 dark:text-slate-600'
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Feedback Text */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">
                                            Əlavə rəy (istəyə görə)
                                        </label>
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            placeholder="Nəyi bəyəndiniz? Nəyi dəyişməyi istərdiniz?"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 focus:ring-0 outline-none transition-all text-slate-900 dark:text-white resize-none"
                                            rows={4}
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || (rating === 0 && !feedback.trim())}
                                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Göndərilir...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                Göndər
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}

