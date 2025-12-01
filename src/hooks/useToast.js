import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Toast from '../components/Toast';
import { AnimatePresence } from 'framer-motion';

/**
 * Hook for showing toast notifications
 * Usage:
 *   const { showToast } = useToast();
 *   showToast('Profile saved!', 'success');
 */
export const useToast = () => {
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type, id: Date.now() });
    }, []);

    const hideToast = useCallback(() => {
        setToast(null);
    }, []);

    const ToastContainer = useCallback(() => {
        if (!toast) return null;

        return createPortal(
            <AnimatePresence>
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            </AnimatePresence>,
            document.body
        );
    }, [toast, hideToast]);

    return { showToast, ToastContainer };
};
