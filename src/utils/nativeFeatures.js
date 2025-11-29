/**
 * Native Mobile Features Utility
 * Provides access to native device APIs (Share, Notifications, Haptics, etc.)
 */

/**
 * Web Share API - Share content natively
 */
export async function shareContent(data) {
    const { title, text, url } = data;

    if (!navigator.share) {
        console.warn('Web Share API not supported');
        // Fallback: copy to clipboard
        if (navigator.clipboard && url) {
            await navigator.clipboard.writeText(url);
            return { success: true, method: 'clipboard' };
        }
        return { success: false, error: 'Share not supported' };
    }

    try {
        await navigator.share({ title, text, url });
        return { success: true, method: 'native' };
    } catch (error) {
        if (error.name === 'AbortError') {
            return { success: false, error: 'Share cancelled' };
        }
        console.error('Share error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Haptic Feedback (Vibration API)
 */
export function hapticFeedback(type = 'light') {
    if (!navigator.vibrate) {
        console.warn('Vibration API not supported');
        return false;
    }

    const patterns = {
        light: [10],
        medium: [20],
        heavy: [30],
        success: [10, 50, 10],
        error: [20, 100, 20],
        warning: [15, 75, 15],
        click: [5],
        double: [10, 50, 10],
    };

    const pattern = patterns[type] || patterns.light;
    navigator.vibrate(pattern);
    return true;
}

/**
 * Request Push Notification Permission
 */
export async function requestNotificationPermission() {
    if (!('Notification' in window)) {
        console.warn('Notifications not supported');
        return { success: false, error: 'Not supported' };
    }

    if (Notification.permission === 'granted') {
        return { success: true, permission: 'granted' };
    }

    if (Notification.permission === 'denied') {
        return { success: false, permission: 'denied' };
    }

    try {
        const permission = await Notification.requestPermission();
        return { success: permission === 'granted', permission };
    } catch (error) {
        console.error('Notification permission error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Show Local Notification
 */
export function showNotification(title, options = {}) {
    if (!('Notification' in window)) {
        console.warn('Notifications not supported');
        return null;
    }

    if (Notification.permission !== 'granted') {
        console.warn('Notification permission not granted');
        return null;
    }

    const defaultOptions = {
        icon: '/vite.svg',
        badge: '/vite.svg',
        vibrate: [200, 100, 200],
        requireInteraction: false,
        ...options,
    };

    return new Notification(title, defaultOptions);
}

/**
 * Check if device is mobile
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
}

/**
 * Check if device is iOS
 */
export function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

/**
 * Check if device is Android
 */
export function isAndroid() {
    return /Android/.test(navigator.userAgent);
}

/**
 * Check if app is installed (PWA)
 */
export function isStandalone() {
    return (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true
    );
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
    if (!navigator.clipboard) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return { success: true };
        } catch (error) {
            document.body.removeChild(textArea);
            return { success: false, error: error.message };
        }
    }

    try {
        await navigator.clipboard.writeText(text);
        return { success: true };
    } catch (error) {
        console.error('Clipboard error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Wake Lock API - Prevent screen from sleeping
 */
export async function requestWakeLock() {
    if (!('wakeLock' in navigator)) {
        console.warn('Wake Lock API not supported');
        return null;
    }

    try {
        const wakeLock = await navigator.wakeLock.request('screen');
        return wakeLock;
    } catch (error) {
        console.error('Wake Lock error:', error);
        return null;
    }
}

/**
 * Get device battery status
 */
export async function getBatteryStatus() {
    if (!('getBattery' in navigator)) {
        console.warn('Battery API not supported');
        return null;
    }

    try {
        const battery = await navigator.getBattery();
        return {
            level: battery.level,
            charging: battery.charging,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime,
        };
    } catch (error) {
        console.error('Battery API error:', error);
        return null;
    }
}

/**
 * Get network information
 */
export function getNetworkInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (!connection) {
        return {
            type: 'unknown',
            effectiveType: 'unknown',
            downlink: null,
            rtt: null,
        };
    }

    return {
        type: connection.type || 'unknown',
        effectiveType: connection.effectiveType || 'unknown',
        downlink: connection.downlink || null,
        rtt: connection.rtt || null,
        saveData: connection.saveData || false,
    };
}

