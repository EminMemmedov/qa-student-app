import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Bug, Info, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icons = {
        success: <CheckCircle size={24} className="text-green-400" />,
        error: <Bug size={24} className="text-red-400" />,
        info: <Info size={24} className="text-blue-400" />,
        warning: <AlertTriangle size={24} className="text-yellow-400" />
    };

    const bgColors = {
        success: 'bg-slate-900',
        error: 'bg-slate-900',
        info: 'bg-slate-900',
        warning: 'bg-slate-900'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }} // Changed to bottom
            animate={{ opacity: 1, y: -20, x: '-50%' }} // Slightly up from bottom
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className={`fixed bottom-0 left-1/2 z-[100] flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border border-slate-800 ${bgColors[type]} min-w-[320px] max-w-[90vw]`}
        >
            <div className="shrink-0">
                {icons[type]}
            </div>
            <div>
                <p className="text-white font-bold text-sm">{message}</p>
            </div>
        </motion.div>
    );
}
