import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import ThemeToggle from './ThemeToggle';

export default function Layout() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 safe-bottom transition-colors duration-300" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 5rem)' }}>
            <div className="w-full max-w-md mx-auto min-h-screen bg-white dark:bg-slate-800 md:shadow-2xl relative overflow-hidden transition-colors duration-300">
                {/* Theme Toggle Button */}
                <div className="fixed top-4 right-4 z-50">
                    <ThemeToggle />
                </div>

                <Outlet />
                <BottomNav />
            </div>
        </div>
    );
}

