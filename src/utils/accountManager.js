import { getStorageItem, setStorageItem } from './storage';

const ACCOUNTS_KEY = 'qa_saved_accounts';
const MAX_ACCOUNTS = 5;

/**
 * Get all saved accounts from localStorage
 */
export function getSavedAccounts() {
    const accounts = getStorageItem(ACCOUNTS_KEY, []);
    return Array.isArray(accounts) ? accounts : [];
}

/**
 * Get current account data from localStorage
 */
export function getCurrentAccountData() {
    return {
        uid: getStorageItem('qa_user_profile', {})?.uid || null,
        name: getStorageItem('qa_user_profile', {})?.name || '',
        xp: getStorageItem('qa_game_xp', 0),
        foundBugs: getStorageItem('qa_game_progress', []),
        achievements: getStorageItem('qa_achievements', []),
        theoryProgress: getStorageItem('theory_progress', []),
        completedLevels: {
            sql: getStorageItem('qa_db_completed_levels', []),
            automation: getStorageItem('qa_automation_completed_levels', []),
            api: getStorageItem('qa_api_completed_levels', []),
            mobile: getStorageItem('qa_mobile_completed_levels', [])
        },
        lastUsed: Date.now()
    };
}

/**
 * Save or update an account
 */
export function saveAccount(accountData) {
    const accounts = getSavedAccounts();
    const existingIndex = accounts.findIndex(acc => acc.uid === accountData.uid);

    const accountToSave = {
        ...accountData,
        lastUsed: Date.now()
    };

    if (existingIndex >= 0) {
        // Update existing account
        accounts[existingIndex] = accountToSave;
    } else {
        // Add new account
        if (accounts.length >= MAX_ACCOUNTS) {
            throw new Error(`Maksimum ${MAX_ACCOUNTS} hesab saxlaya bilərsiniz`);
        }
        accounts.push(accountToSave);
    }

    setStorageItem(ACCOUNTS_KEY, accounts);
    return accountToSave;
}

/**
 * Save current account before switching
 */
export function saveCurrentAccount() {
    const currentData = getCurrentAccountData();

    if (!currentData.uid) {
        console.warn('No current account to save');
        return null;
    }

    return saveAccount(currentData);
}

/**
 * Load account data into localStorage
 */
export function loadAccountData(accountData) {
    setStorageItem('qa_user_profile', { uid: accountData.uid, name: accountData.name });
    setStorageItem('qa_game_xp', accountData.xp || 0);
    setStorageItem('qa_game_progress', accountData.foundBugs || []);
    setStorageItem('qa_achievements', accountData.achievements || []);
    setStorageItem('theory_progress', accountData.theoryProgress || []);

    if (accountData.completedLevels) {
        setStorageItem('qa_db_completed_levels', accountData.completedLevels.sql || []);
        setStorageItem('qa_automation_completed_levels', accountData.completedLevels.automation || []);
        setStorageItem('qa_api_completed_levels', accountData.completedLevels.api || []);
        setStorageItem('qa_mobile_completed_levels', accountData.completedLevels.mobile || []);
    }
}

/**
 * Switch to a different account
 */
export function switchAccount(uid) {
    // Save current account first
    saveCurrentAccount();

    // Find target account
    const accounts = getSavedAccounts();
    const targetAccount = accounts.find(acc => acc.uid === uid);

    if (!targetAccount) {
        throw new Error('Hesab tapılmadı');
    }

    // Load target account data
    loadAccountData(targetAccount);

    // Update lastUsed
    saveAccount({ ...targetAccount, lastUsed: Date.now() });

    return targetAccount;
}

/**
 * Remove an account
 */
export function removeAccount(uid) {
    const accounts = getSavedAccounts();
    const currentUid = getStorageItem('qa_user_profile', {})?.uid;

    // Prevent removing current account
    if (uid === currentUid) {
        throw new Error('Aktiv hesabı silə bilməzsiniz');
    }

    const filteredAccounts = accounts.filter(acc => acc.uid !== uid);
    setStorageItem(ACCOUNTS_KEY, filteredAccounts);

    return filteredAccounts;
}

/**
 * Migrate existing user to saved accounts system
 */
export function migrateExistingUser() {
    const accounts = getSavedAccounts();
    const currentProfile = getStorageItem('qa_user_profile', null);

    // If user has profile but no saved accounts, migrate them
    if (currentProfile?.uid && accounts.length === 0) {
        const currentData = getCurrentAccountData();
        saveAccount({
            ...currentData,
            createdAt: Date.now()
        });
        console.log('Migrated existing user to saved accounts');
    }
}
