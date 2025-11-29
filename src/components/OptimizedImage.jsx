import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Optimized Image Component with lazy loading and blur placeholder
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text
 * @param {string} className - Additional CSS classes
 * @param {string} blurDataURL - Optional blur placeholder
 */
export default function OptimizedImage({ 
    src, 
    alt = '', 
    className = '', 
    blurDataURL,
    ...props 
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '100px', // Start loading 100px before visible
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div 
            ref={imgRef} 
            className={`relative overflow-hidden ${className}`}
            style={{ minHeight: '100px' }}
        >
            {/* Blur Placeholder */}
            {!isLoaded && (
                <div 
                    className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse"
                    style={blurDataURL ? {
                        backgroundImage: `url(${blurDataURL})`,
                        backgroundSize: 'cover',
                        filter: 'blur(10px)',
                    } : {}}
                />
            )}

            {/* Actual Image */}
            {isInView && (
                <motion.img
                    src={src}
                    alt={alt}
                    onLoad={() => setIsLoaded(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    loading="lazy"
                    decoding="async"
                    className={className}
                    {...props}
                />
            )}
        </div>
    );
}

