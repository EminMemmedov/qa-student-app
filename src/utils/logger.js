/**
 * Logger utility for development and production environments
 * Only logs in development mode to keep production console clean
 */

const isDev = import.meta.env.DEV;

export const logger = {
    /**
     * Log general information (only in development)
     */
    log: (...args) => {
        if (isDev) {
            console.log(...args);
        }
    },

    /**
     * Log warnings (only in development)
     */
    warn: (...args) => {
        if (isDev) {
            console.warn(...args);
        }
    },

    /**
     * Log errors (always logged, even in production)
     */
    error: (...args) => {
        console.error(...args);
    },

    /**
     * Log debug information (only in development)
     */
    debug: (...args) => {
        if (isDev) {
            console.debug(...args);
        }
    }
};
