import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';

// Mock bug data for exam (could be imported from a shared data file)
const examBugs = [
    { id: 1, description: 'Incorrect button label', solution: 'Change label to "Submit"' },
    { id: 2, description: 'Missing required field validation', solution: 'Add required attribute' },
    { id: 3, description: 'Broken image link', solution: 'Update src to correct URL' },
    // Add more as needed
];

export default function Exam() {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [currentBugIndex, setCurrentBugIndex] = useState(0);
    const [found, setFound] = useState(false);

    // Timer countdown
    useEffect(() => {
        if (timeLeft <= 0) {
            // Time's up -> navigate to results page
            navigate('/practice/exam-results', { state: { foundCount: currentBugIndex } });
            return;
        }
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, navigate, currentBugIndex]);

    const handleFindBug = () => {
        setFound(true);
        setTimeout(() => {
            setFound(false);
            if (currentBugIndex + 1 < examBugs.length) {
                setCurrentBugIndex(currentBugIndex + 1);
            } else {
                // All bugs found -> finish exam
                navigate('/practice/exam-results', { state: { foundCount: examBugs.length } });
            }
        }, 1200);
    };

    const bug = examBugs[currentBugIndex];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
            <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Экзамен по поиску багов</h2>
                    <div className="text-lg font-mono text-gray-600 dark:text-gray-400">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
                </div>
                <p className="mb-4 text-gray-700 dark:text-gray-300">{bug.description}</p>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFindBug}
                    disabled={found}
                    className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 
            ${found ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                    {found ? <CheckCircle className="inline-block mr-2" /> : <XCircle className="inline-block mr-2" />}
                    {found ? 'Баг найден!' : 'Найти баг'}
                </motion.button>
            </div>
        </div>
    );
}
