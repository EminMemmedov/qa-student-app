import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Mobile() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Mobile Testing Module</h2>
            <p className="text-gray-700 dark:text-gray-300">Здесь будет реализовано тестирование мобильных приложений.</p>
        </div>
    );
}
