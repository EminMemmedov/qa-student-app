// Luhn Algorithm for credit card validation
export function validateLuhn(cardNumber) {
    // Remove spaces and non-digits
    const digits = cardNumber.replace(/\D/g, '');

    // Card must be at least 13 digits
    if (digits.length < 13) return false;

    let sum = 0;
    let isEven = false;

    // Loop through values starting from the rightmost digit
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i]);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}

// Validate postal code (Azerbaijan format: AZ1234)
export function validatePostalCode(code) {
    const azPattern = /^AZ\d{4}$/i;
    return azPattern.test(code);
}

// Validate city name (no numbers, min 2 chars)
export function validateCity(city) {
    if (!city || city.length < 2) return false;
    return !/\d/.test(city);
}

// Check for XSS patterns
export function containsXSS(text) {
    const xssPatterns = [
        /<script/i,
        /<\/script/i,
        /javascript:/i,
        /onerror=/i,
        /onclick=/i,
        /<iframe/i
    ];

    return xssPatterns.some(pattern => pattern.test(text));
}

// Validate address fields
export function validateAddress(address) {
    const errors = {};

    if (!address.street || address.street.trim().length < 5) {
        errors.street = 'Küçə ünvanı ən azı 5 simvol olmalıdır';
    }

    if (containsXSS(address.street)) {
        errors.street = 'Ünvanda icazəsiz simvollar var';
    }

    if (!validateCity(address.city)) {
        errors.city = 'Şəhər adı düzgün deyil';
    }

    if (!validatePostalCode(address.postalCode)) {
        errors.postalCode = 'Poçt kodu formatı: AZ1234';
    }

    if (!address.country || address.country.trim().length === 0) {
        errors.country = 'Ölkə seçilməlidir';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// Validate user name (for leaderboard)
export function validateName(name) {
    if (!name || typeof name !== 'string') {
        return { isValid: false, error: 'Ad daxil edilməlidir' };
    }

    const trimmed = name.trim();
    
    if (trimmed.length < 2) {
        return { isValid: false, error: 'Ad ən azı 2 simvol olmalıdır' };
    }

    if (trimmed.length > 50) {
        return { isValid: false, error: 'Ad maksimum 50 simvol ola bilər' };
    }

    if (containsXSS(trimmed)) {
        return { isValid: false, error: 'Adda icazəsiz simvollar var' };
    }

    // Only letters, spaces, and common name characters
    if (!/^[a-zA-ZəƏıİüÜöÖğĞşŞçÇ\s\-\']+$/.test(trimmed)) {
        return { isValid: false, error: 'Adda yalnız hərf və boşluq ola bilər' };
    }

    return { isValid: true, value: trimmed };
}

// Validate feedback text
export function validateFeedback(text, maxLength = 1000) {
    if (!text || typeof text !== 'string') {
        return { isValid: false, error: 'Rəy daxil edilməlidir' };
    }

    const trimmed = text.trim();

    if (trimmed.length === 0) {
        return { isValid: false, error: 'Rəy boş ola bilməz' };
    }

    if (trimmed.length > maxLength) {
        return { isValid: false, error: `Rəy maksimum ${maxLength} simvol ola bilər` };
    }

    if (containsXSS(trimmed)) {
        return { isValid: false, error: 'Rəydə icazəsiz simvollar var' };
    }

    return { isValid: true, value: trimmed };
}

// Sanitize user input
export function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
        .trim()
        .replace(/<script.*?>.*?<\/script>/gi, '')
        .replace(/<.*?>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '');
}
