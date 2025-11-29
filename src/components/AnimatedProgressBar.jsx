import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * Animated Progress Bar Component
 * @param {number} current - Current value
 * @param {number} max - Maximum value
 * @param {string} label - Label text
 * @param {string} color - Tailwind color class (e.g., 'indigo', 'green')
 */
export default function AnimatedProgressBar({ 
    current = 0, 
    max = 100, 
    label = '', 
    color = 'indigo',
    showPercentage = true,
    className = ''
}) {
    const [displayValue, setDisplayValue] = useState(0);
    const percentage = Math.min((current / max) * 100, 100);

    useEffect(() => {
        // Animate the number counting up
        let start = 0;
        const duration = 1000; // 1 second animation
        const increment = current / (duration / 16); // 60fps
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= current) {
                setDisplayValue(current);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [current]);

    const colorClasses = {
        indigo: 'from-indigo-500 to-purple-500',
        green: 'from-green-500 to-emerald-500',
        blue: 'from-blue-500 to-cyan-500',
        orange: 'from-orange-500 to-amber-500',
        red: 'from-red-500 to-rose-500',
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {/* Label and Value */}
            <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-slate-600 dark:text-slate-300">{label}</span>
                {showPercentage && (
                    <motion.span 
                        className={`text-${color}-600 dark:text-${color}-400`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {displayValue} / {max}
                    </motion.span>
                )}
            </div>

            {/* Progress Bar */}
            <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                <motion.div
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${colorClasses[color] || colorClasses.indigo} rounded-full shadow-lg`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ 
                        duration: 1, 
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 50
                    }}
                >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-white/20 rounded-full" />
                    
                    {/* Animated pulse */}
                    <motion.div
                        className="absolute inset-0 bg-white/30 rounded-full"
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            </div>

            {/* Percentage Text */}
            {showPercentage && (
                <motion.div 
                    className="text-right text-xs font-bold text-slate-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {Math.floor(percentage)}%
                </motion.div>
            )}
        </div>
    );
}

