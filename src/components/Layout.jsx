import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function Layout() {
    return (
        <div className="min-h-screen bg-slate-50 safe-bottom" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 5rem)' }}>
            <div className="w-full max-w-md mx-auto min-h-screen bg-white md:shadow-2xl relative overflow-hidden">
                <Outlet />
                <BottomNav />
            </div>
        </div>
    );
}
