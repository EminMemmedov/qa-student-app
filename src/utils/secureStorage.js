/**
 * Secure Storage Utility with basic encryption
 * Uses Web Crypto API for encryption (AES-GCM)
 */

class SecureStorage {
    constructor() {
        this.storageKey = 'qa_app_';
        this.keyMaterial = null;
    }

    /**
     * Initialize encryption key from user's device
     * Uses a combination of user agent and a fixed salt
     */
    async getKey() {
        if (this.keyMaterial) return this.keyMaterial;

        const encoder = new TextEncoder();
        const keyData = encoder.encode(
            navigator.userAgent + 'qa-student-app-salt-2024'
        );

        const hashBuffer = await crypto.subtle.digest('SHA-256', keyData);
        
        this.keyMaterial = await crypto.subtle.importKey(
            'raw',
            hashBuffer,
            { name: 'AES-GCM' },
            false,
            ['encrypt', 'decrypt']
        );

        return this.keyMaterial;
    }

    /**
     * Encrypt data
     */
    async encrypt(data) {
        try {
            const key = await this.getKey();
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(JSON.stringify(data));
            
            // Generate a random IV
            const iv = crypto.getRandomValues(new Uint8Array(12));
            
            const encryptedBuffer = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv },
                key,
                dataBuffer
            );

            // Combine IV and encrypted data
            const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
            combined.set(iv, 0);
            combined.set(new Uint8Array(encryptedBuffer), iv.length);

            // Convert to base64 for storage
            return btoa(String.fromCharCode(...combined));
        } catch (error) {
            console.error('Encryption error:', error);
            // Fallback to unencrypted if crypto fails
            return JSON.stringify(data);
        }
    }

    /**
     * Decrypt data
     */
    async decrypt(encryptedData) {
        try {
            const key = await this.getKey();
            
            // Decode from base64
            const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
            
            // Extract IV and encrypted data
            const iv = combined.slice(0, 12);
            const data = combined.slice(12);

            const decryptedBuffer = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv },
                key,
                data
            );

            const decoder = new TextDecoder();
            const decryptedText = decoder.decode(decryptedBuffer);
            
            return JSON.parse(decryptedText);
        } catch (error) {
            console.error('Decryption error:', error);
            // Try parsing as unencrypted JSON (fallback)
            try {
                return JSON.parse(encryptedData);
            } catch {
                return null;
            }
        }
    }

    /**
     * Store data securely
     */
    async setItem(key, value) {
        const encrypted = await this.encrypt(value);
        localStorage.setItem(this.storageKey + key, encrypted);
    }

    /**
     * Retrieve and decrypt data
     */
    async getItem(key) {
        const encrypted = localStorage.getItem(this.storageKey + key);
        if (!encrypted) return null;
        return await this.decrypt(encrypted);
    }

    /**
     * Remove item
     */
    removeItem(key) {
        localStorage.removeItem(this.storageKey + key);
    }

    /**
     * Clear all secure storage items
     */
    clear() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(this.storageKey)) {
                localStorage.removeItem(key);
            }
        });
    }

    /**
     * Check if key exists
     */
    hasItem(key) {
        return localStorage.getItem(this.storageKey + key) !== null;
    }
}

// Singleton instance
export const secureStorage = new SecureStorage();

// Convenience methods
export const setSecureItem = (key, value) => secureStorage.setItem(key, value);
export const getSecureItem = (key) => secureStorage.getItem(key);
export const removeSecureItem = (key) => secureStorage.removeItem(key);
export const clearSecureStorage = () => secureStorage.clear();

