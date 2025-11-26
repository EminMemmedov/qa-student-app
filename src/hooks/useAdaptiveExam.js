import { useState, useCallback } from 'react';
import { examQuestions, getQuestionsByDifficulty } from '../data/examQuestions';

export function useAdaptiveExam() {
    const [currentDifficulty, setCurrentDifficulty] = useState('easy');
    const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
    const [consecutiveWrong, setConsecutiveWrong] = useState(0);
    const [usedQuestionIds, setUsedQuestionIds] = useState(new Set());
    const [studentLevel, setStudentLevel] = useState(localStorage.getItem('studentLevel') || 'Beginner');

    const getNextQuestion = useCallback((lastAnswerCorrect = null) => {
        let nextDifficulty = currentDifficulty;

        // Adjust difficulty based on performance
        if (lastAnswerCorrect === true) {
            const newConsecutiveCorrect = consecutiveCorrect + 1;
            setConsecutiveCorrect(newConsecutiveCorrect);
            setConsecutiveWrong(0);

            if (newConsecutiveCorrect >= 2 && currentDifficulty !== 'hard') {
                nextDifficulty = currentDifficulty === 'easy' ? 'medium' : 'hard';
                setCurrentDifficulty(nextDifficulty);
                setConsecutiveCorrect(0);
            }
        } else if (lastAnswerCorrect === false) {
            const newConsecutiveWrong = consecutiveWrong + 1;
            setConsecutiveWrong(newConsecutiveWrong);
            setConsecutiveCorrect(0);

            if (newConsecutiveWrong >= 2 && currentDifficulty !== 'easy') {
                nextDifficulty = currentDifficulty === 'hard' ? 'medium' : 'easy';
                setCurrentDifficulty(nextDifficulty);
                setConsecutiveWrong(0);
            }
        }

        // Get available questions for the determined difficulty
        const availableQuestions = getQuestionsByDifficulty(nextDifficulty).filter(
            q => !usedQuestionIds.has(q.id)
        );

        // If no questions left in current difficulty, try other difficulties
        let selectedQuestion = null;
        if (availableQuestions.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableQuestions.length);
            selectedQuestion = availableQuestions[randomIndex];
        } else {
            // Fallback: try any unused question
            const allUnused = examQuestions.filter(q => !usedQuestionIds.has(q.id));
            if (allUnused.length > 0) {
                const randomIndex = Math.floor(Math.random() * allUnused.length);
                selectedQuestion = allUnused[randomIndex];
            }
        }

        if (selectedQuestion) {
            setUsedQuestionIds(prev => new Set(prev).add(selectedQuestion.id));
        }

        // Update student level estimation
        updateStudentLevel(nextDifficulty);

        return {
            question: selectedQuestion,
            difficulty: nextDifficulty
        };
    }, [currentDifficulty, consecutiveCorrect, consecutiveWrong, usedQuestionIds]);

    const updateStudentLevel = (difficulty) => {
        let level = 'Beginner';
        if (difficulty === 'medium') level = 'Intermediate';
        if (difficulty === 'hard') level = 'Advanced';

        setStudentLevel(level);
        localStorage.setItem('studentLevel', level);
    };

    const resetExam = () => {
        setCurrentDifficulty('easy');
        setConsecutiveCorrect(0);
        setConsecutiveWrong(0);
        setUsedQuestionIds(new Set());
    };

    return {
        getNextQuestion,
        currentDifficulty,
        studentLevel,
        resetExam
    };
}
