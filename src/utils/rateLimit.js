/**
 * Client-side rate limiting utility
 * Prevents excessive Firestore requests
 */

class RateLimiter {
    constructor() {
        this.requests = new Map();
    }

    /**
     * Check if an action is allowed based on rate limit
     * @param {string} key - Unique identifier for the action
     * @param {number} maxRequests - Maximum requests allowed
     * @param {number} windowMs - Time window in milliseconds
     * @returns {boolean} - Whether the action is allowed
     */
    isAllowed(key, maxRequests = 10, windowMs = 60000) {
        const now = Date.now();
        
        if (!this.requests.has(key)) {
            this.requests.set(key, []);
        }

        const timestamps = this.requests.get(key);
        
        // Remove old timestamps outside the window
        const validTimestamps = timestamps.filter(
            (timestamp) => now - timestamp < windowMs
        );

        if (validTimestamps.length >= maxRequests) {
            console.warn(`Rate limit exceeded for: ${key}`);
            return false;
        }

        // Add current timestamp
        validTimestamps.push(now);
        this.requests.set(key, validTimestamps);
        
        return true;
    }

    /**
     * Reset rate limit for a specific key
     * @param {string} key - Unique identifier for the action
     */
    reset(key) {
        this.requests.delete(key);
    }

    /**
     * Clear all rate limits
     */
    clearAll() {
        this.requests.clear();
    }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

/**
 * Higher-order function to wrap async functions with rate limiting
 * @param {Function} fn - Async function to wrap
 * @param {string} key - Rate limit key
 * @param {number} maxRequests - Max requests allowed
 * @param {number} windowMs - Time window in ms
 */
export function withRateLimit(fn, key, maxRequests = 5, windowMs = 60000) {
    return async (...args) => {
        if (!rateLimiter.isAllowed(key, maxRequests, windowMs)) {
            throw new Error('Rate limit exceeded. Please wait before trying again.');
        }
        return await fn(...args);
    };
}

/**
 * Debounced rate limiter - combines debouncing with rate limiting
 * Useful for search inputs, form submissions, etc.
 */
export class DebouncedRateLimiter {
    constructor(maxRequests = 10, windowMs = 60000, debounceMs = 300) {
        this.rateLimiter = new RateLimiter();
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
        this.debounceMs = debounceMs;
        this.timeouts = new Map();
    }

    execute(key, fn) {
        // Clear existing timeout
        if (this.timeouts.has(key)) {
            clearTimeout(this.timeouts.get(key));
        }

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                if (this.rateLimiter.isAllowed(key, this.maxRequests, this.windowMs)) {
                    resolve(fn());
                } else {
                    reject(new Error('Rate limit exceeded'));
                }
            }, this.debounceMs);

            this.timeouts.set(key, timeout);
        });
    }
}

