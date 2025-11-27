import { useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

export function useStreak() {
    const [currentStreak, setCurrentStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);
    const [lastActiveDate, setLastActiveDate] = useState(null);

    useEffect(() => {
        const today = new Date().toDateString();
        const savedStreak = getStorageItem('streak_current', 0);
        const savedLongest = getStorageItem('streak_longest', 0);
        const savedDate = getStorageItem('streak_last_date', null);

        setCurrentStreak(savedStreak);
        setLongestStreak(savedLongest);
        setLastActiveDate(savedDate);

        // Проверяем нужно ли обновить streak
        if (savedDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();

            if (savedDate === yesterdayStr) {
                // Продолжаем streak
                const newStreak = savedStreak + 1;
                setCurrentStreak(newStreak);
                setStorageItem('streak_current', newStreak);
                setStorageItem('streak_longest', Math.max(savedLongest, newStreak));
                setStorageItem('streak_last_date', today);
            } else if (savedDate !== today) {
                // Streak прерван
                setCurrentStreak(1);
                setStorageItem('streak_current', 1);
                setStorageItem('streak_last_date', today);
            }
        }
    }, []);

    // Отметить активность сегодня
    const markActivity = () => {
        const today = new Date().toDateString();
        
        if (lastActiveDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();

            let newStreak = 1;
            if (lastActiveDate === yesterdayStr) {
                // Продолжаем streak
                newStreak = currentStreak + 1;
            }

            setCurrentStreak(newStreak);
            setLongestStreak(prev => Math.max(prev, newStreak));
            setLastActiveDate(today);
            
            setStorageItem('streak_current', newStreak);
            setStorageItem('streak_longest', Math.max(longestStreak, newStreak));
            setStorageItem('streak_last_date', today);
        }
    };

    // Получить бонус XP за streak
    const getStreakBonus = () => {
        if (currentStreak >= 7) return 1.5; // 50% бонус за неделю
        if (currentStreak >= 3) return 1.2; // 20% бонус за 3 дня
        return 1.0; // Нет бонуса
    };

    return {
        currentStreak,
        longestStreak,
        markActivity,
        getStreakBonus
    };
}

