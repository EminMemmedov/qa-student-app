import { useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import i18n from '../i18n/i18n';

// Типы ежедневных челленджей
export const CHALLENGE_TYPES = {
    FIND_BUGS: 'find_bugs',
    COMPLETE_THEORY: 'complete_theory',
    PASS_QUIZ: 'pass_quiz',
    FIND_HARD_BUGS: 'find_hard_bugs',
    USE_DEVTOOLS: 'use_devtools',
    COMPLETE_MODULE: 'complete_module'
};

// Генерация случайного челленджа
function generateDailyChallenge() {
    const t = (key) => i18n.t(key);
    
    const challenges = [
        {
            type: CHALLENGE_TYPES.FIND_BUGS,
            titleKey: 'dailyChallenge.challenges.find_bugs.title',
            descriptionKey: 'dailyChallenge.challenges.find_bugs.description',
            target: 5,
            reward: 50,
            icon: '🐛'
        },
        {
            type: CHALLENGE_TYPES.COMPLETE_THEORY,
            titleKey: 'dailyChallenge.challenges.complete_theory.title',
            descriptionKey: 'dailyChallenge.challenges.complete_theory.description',
            target: 1,
            reward: 30,
            icon: '📚'
        },
        {
            type: CHALLENGE_TYPES.FIND_HARD_BUGS,
            titleKey: 'dailyChallenge.challenges.find_hard_bugs.title',
            descriptionKey: 'dailyChallenge.challenges.find_hard_bugs.description',
            target: 2,
            reward: 75,
            icon: '🔥'
        },
        {
            type: CHALLENGE_TYPES.USE_DEVTOOLS,
            titleKey: 'dailyChallenge.challenges.use_devtools.title',
            descriptionKey: 'dailyChallenge.challenges.use_devtools.description',
            target: 1,
            reward: 40,
            icon: '🔧'
        }
    ];

    // Выбираем случайный челлендж
    const randomIndex = Math.floor(Math.random() * challenges.length);
    return challenges[randomIndex];
}

export function useDailyChallenge() {
    const [challenge, setChallenge] = useState(null);
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [lastDate, setLastDate] = useState(null);

    // Инициализация или обновление челленджа
    useEffect(() => {
        const today = new Date().toDateString();
        const saved = getStorageItem('daily_challenge', null);
        const savedDate = getStorageItem('daily_challenge_date', null);

        if (savedDate !== today || !saved) {
            // Новый день - новый челлендж
            const newChallenge = generateDailyChallenge();
            setChallenge(newChallenge);
            setProgress(0);
            setCompleted(false);
            setLastDate(today);
            setStorageItem('daily_challenge', newChallenge);
            setStorageItem('daily_challenge_date', today);
            setStorageItem('daily_challenge_progress', 0);
        } else {
            // Загружаем существующий челлендж
            // Если старый формат (с title/description), конвертируем в новый
            if (saved.title && !saved.titleKey) {
                // Старый формат - генерируем новый
                const newChallenge = generateDailyChallenge();
                setChallenge(newChallenge);
                setProgress(0);
                setCompleted(false);
                setLastDate(today);
                setStorageItem('daily_challenge', newChallenge);
                setStorageItem('daily_challenge_date', today);
                setStorageItem('daily_challenge_progress', 0);
            } else {
                setChallenge(saved);
                setLastDate(savedDate);
                const savedProgress = getStorageItem('daily_challenge_progress', 0);
                setProgress(savedProgress);
                setCompleted(savedProgress >= (saved.target || 0));
            }
        }
    }, []);

    // Обновление прогресса
    const updateProgress = (type, amount = 1) => {
        if (!challenge || completed || challenge.type !== type) return false;

        const newProgress = Math.min(progress + amount, challenge.target);
        setProgress(newProgress);
        setStorageItem('daily_challenge_progress', newProgress);

        if (newProgress >= challenge.target && !completed) {
            setCompleted(true);
            return true; // Челлендж выполнен!
        }

        return false;
    };

    // Получение прогресса в процентах
    const getProgressPercent = () => {
        if (!challenge) return 0;
        return Math.min((progress / challenge.target) * 100, 100);
    };

    return {
        challenge,
        progress,
        completed,
        updateProgress,
        getProgressPercent,
        lastDate
    };
}

