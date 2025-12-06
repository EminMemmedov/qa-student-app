import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';

const VersionChecker = () => {
    const { t } = useTranslation();
    const [showUpdate, setShowUpdate] = useState(false);

    useEffect(() => {
        const checkVersion = async () => {
            try {
                const response = await fetch(`/version.json?t=${Date.now()}`);
                if (!response.ok) return;

                const data = await response.json();
                const serverVersion = data.version;
                const localVersion = localStorage.getItem('appVersion');

                if (localVersion && serverVersion !== localVersion) {
                    console.log('New version detected:', serverVersion);
                    // New version found
                    setShowUpdate(true);

                    // Clear caches
                    if ('caches' in window) {
                        const cacheNames = await caches.keys();
                        await Promise.all(cacheNames.map(name => caches.delete(name)));
                    }

                    // Clear service worker registrations
                    if ('serviceWorker' in navigator) {
                        const registrations = await navigator.serviceWorker.getRegistrations();
                        await Promise.all(registrations.map(r => r.unregister()));
                    }

                    // Update local storage
                    localStorage.setItem('appVersion', serverVersion);

                    // Reload page after a brief delay to show the user what's happening
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 1500);
                } else if (!localVersion) {
                    // First visit or storage cleared, just set the version
                    localStorage.setItem('appVersion', serverVersion);
                }
            } catch (error) {
                console.error('Failed to check version:', error);
            }
        };

        // Check version on mount and when window gains focus
        checkVersion();
        window.addEventListener('focus', checkVersion);

        // Check every 5 minutes
        const interval = setInterval(checkVersion, 5 * 60 * 1000);

        return () => {
            window.removeEventListener('focus', checkVersion);
            clearInterval(interval);
        };
    }, []);

    if (!showUpdate) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4 animate-in fade-in zoom-in duration-300">
                <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-20 animate-ping"></div>
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-full relative">
                        <RefreshCw className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
                    </div>
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {t('common.updating', 'Updating Application...')}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {t('common.updatingDesc', 'New version detected. Cleaning cache and reloading...')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VersionChecker;
