
import { Home, BookOpen, Bug } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export default function BottomNav() {
    const navItems = [
        { icon: Home, label: 'Ana Səhifə', path: '/' },
        { icon: BookOpen, label: 'Nəzəriyyə', path: '/theory' },
        { icon: Bug, label: 'Təcrübə', path: '/practice' },
    ];

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200 z-50"
            style={{
                paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)',
                paddingTop: '0.5rem'
            }}
        >
            <div className="flex justify-around items-center max-w-md mx-auto px-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            clsx(
                                "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 min-w-[60px] min-h-[60px] justify-center touch-manipulation",
                                isActive ? "text-blue-600 scale-105 bg-blue-50" : "text-slate-400 hover:text-slate-600 active:scale-95"
                            )
                        }
                    >
                        <item.icon size={24} strokeWidth={2.5} />
                        <span className="text-[10px] font-bold tracking-wide whitespace-nowrap">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}

