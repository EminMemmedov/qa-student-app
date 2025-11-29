import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const isLowPowerMode = () => {
    // Simple check: if user prefers reduced motion or has low battery (experimental)
    if (typeof window !== 'undefined') {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // You could also check navigator.hardwareConcurrency if you want to target low-core CPUs
        return prefersReducedMotion;
    }
    return false;
};

export default function PageTransition({ children, className }) {
    const [shouldAnimate, setShouldAnimate] = useState(true);

    useEffect(() => {
        // Disable animations on low-end devices or user preference
        if (isLowPowerMode()) {
            setShouldAnimate(false);
        }
    }, []);

    if (!shouldAnimate) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Custom bezier for smooth "Apple-like" feel
            className={className}
        >
            {children}
        </motion.div>
    );
}
