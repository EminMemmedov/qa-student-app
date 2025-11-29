import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, MessageSquare } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

export default function FAB() {
    const navigate = useNavigate();
    const [showFeedback, setShowFeedback] = useState(false);

    return (
        <>
            {/* Feedback Button */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowFeedback(true)}
                className="fixed bottom-[140px] right-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all z-40"
                aria-label="Rəy bildirin"
            >
                <MessageSquare size={24} strokeWidth={2.5} />
            </motion.button>

            {/* Quick Exam Button */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/practice/exam')}
                className="fixed bottom-[80px] right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors duration-200 z-40"
                aria-label="Start Exam"
            >
                <Play size={24} strokeWidth={2.5} />
            </motion.button>

            {/* Feedback Modal */}
            <FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} />
        </>
    );
}
