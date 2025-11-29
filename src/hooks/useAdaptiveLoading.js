import { useState, useEffect } from 'react';
import { getNetworkInfo } from '../utils/nativeFeatures';

/**
 * Hook for adaptive content loading based on network speed
 * Returns quality settings based on connection type
 */
export function useAdaptiveLoading() {
    const [networkQuality, setNetworkQuality] = useState('high');
    const [saveData, setSaveData] = useState(false);

    useEffect(() => {
        const updateNetworkInfo = () => {
            const info = getNetworkInfo();
            
            // Check if user has enabled data saver
            setSaveData(info.saveData);

            // Determine quality based on effectiveType
            switch (info.effectiveType) {
                case 'slow-2g':
                case '2g':
                    setNetworkQuality('low');
                    break;
                case '3g':
                    setNetworkQuality('medium');
                    break;
                case '4g':
                case '5g':
                default:
                    setNetworkQuality('high');
                    break;
            }
        };

        updateNetworkInfo();

        // Listen for network changes
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            connection.addEventListener('change', updateNetworkInfo);
            return () => connection.removeEventListener('change', updateNetworkInfo);
        }
    }, []);

    // Calculate settings based on network quality
    const settings = {
        // Image quality
        imageQuality: saveData || networkQuality === 'low' ? 'low' : 
                     networkQuality === 'medium' ? 'medium' : 'high',
        
        // Enable/disable animations
        enableAnimations: !saveData && networkQuality !== 'low',
        
        // Enable/disable heavy blur effects
        enableBlur: !saveData && networkQuality === 'high',
        
        // Prefetch resources
        enablePrefetch: !saveData && networkQuality === 'high',
        
        // Auto-play videos
        autoPlayVideo: !saveData && networkQuality === 'high',
        
        // Limit items per page for pagination
        itemsPerPage: networkQuality === 'low' ? 10 :
                     networkQuality === 'medium' ? 20 : 50,
    };

    return {
        networkQuality,
        saveData,
        settings,
        isSlowConnection: networkQuality === 'low' || saveData,
    };
}

/**
 * Hook to conditionally load resources based on network
 */
export function useConditionalLoad(resource, priority = 'normal') {
    const { settings } = useAdaptiveLoading();
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        if (priority === 'critical') {
            setShouldLoad(true);
            return;
        }

        if (priority === 'low' && !settings.enablePrefetch) {
            setShouldLoad(false);
            return;
        }

        setShouldLoad(true);
    }, [settings, priority]);

    return shouldLoad;
}

