// Безопасная работа с localStorage с обработкой ошибок

/**
 * Безопасно получает значение из localStorage
 * @param {string} key - Ключ
 * @param {any} defaultValue - Значение по умолчанию
 * @returns {any} - Значение или defaultValue
 */
export function getStorageItem(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        if (item === null) {
            return defaultValue;
        }
        return JSON.parse(item);
    } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
        // Очищаем поврежденные данные
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error(`Error removing corrupted key "${key}":`, e);
        }
        return defaultValue;
    }
}

/**
 * Безопасно сохраняет значение в localStorage
 * @param {string} key - Ключ
 * @param {any} value - Значение для сохранения
 * @returns {boolean} - true если успешно, false если ошибка
 */
export function setStorageItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error writing to localStorage key "${key}":`, error);
        // Если localStorage переполнен, пытаемся очистить старые данные
        if (error.name === 'QuotaExceededError') {
            console.warn('LocalStorage quota exceeded. Consider cleaning old data.');
        }
        return false;
    }
}

/**
 * Безопасно удаляет значение из localStorage
 * @param {string} key - Ключ
 * @returns {boolean} - true если успешно
 */
export function removeStorageItem(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error);
        return false;
    }
}

/**
 * Проверяет доступность localStorage
 * @returns {boolean} - true если доступен
 */
export function isStorageAvailable() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

