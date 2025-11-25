import { useEffect } from 'react';

export const useScrollToActiveInput = () => {
    useEffect(() => {
        const handleResize = () => {
            if (document.activeElement &&
                (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
                document.activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
};
