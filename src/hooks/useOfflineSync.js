import { useState, useEffect } from 'react';

/**
 * Enhanced Offline Sync Hook
 * Manages offline/online state and queues pending actions
 */
export function useOfflineSync() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [pendingActions, setPendingActions] = useState([]);

    useEffect(() => {
        // Load pending actions from localStorage
        const saved = localStorage.getItem('pending_actions');
        if (saved) {
            try {
                setPendingActions(JSON.parse(saved));
            } catch (error) {
                console.error('Error loading pending actions:', error);
            }
        }

        const handleOnline = async () => {
            setIsOnline(true);
            
            // Process pending actions when back online
            const saved = localStorage.getItem('pending_actions');
            if (saved) {
                try {
                    const actions = JSON.parse(saved);
                    // Trigger custom event for components to handle
                    window.dispatchEvent(new CustomEvent('online-sync', { 
                        detail: { actions } 
                    }));
                    localStorage.removeItem('pending_actions');
                    setPendingActions([]);
                } catch (error) {
                    console.error('Error processing pending actions:', error);
                }
            }
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    /**
     * Queue an action to be executed when back online
     */
    const queueAction = (action) => {
        const newActions = [...pendingActions, {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...action
        }];
        setPendingActions(newActions);
        localStorage.setItem('pending_actions', JSON.stringify(newActions));
    };

    /**
     * Check if there are pending actions
     */
    const hasPendingActions = pendingActions.length > 0;

    return { 
        isOnline, 
        pendingActions, 
        queueAction, 
        hasPendingActions 
    };
}
