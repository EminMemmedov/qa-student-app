import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Sun size={20} className="text-yellow-400" />
        ) : (
          <Moon size={20} className="text-slate-600" />
        )}
      </motion.div>
    </motion.button>
  );
}
