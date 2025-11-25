import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function FAB() {
    const navigate = useNavigate();
    const handleClick = () => {
        // Quick access to Exam mode
        navigate('/practice/exam');
    };
    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className="fixed bottom-20 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors duration-200"
            aria-label="Start Exam"
        >
            <Play size={24} strokeWidth={2.5} />
        </motion.button>
    );
}
