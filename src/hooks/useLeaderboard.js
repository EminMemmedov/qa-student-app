import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, doc, setDoc, where, getDocs } from 'firebase/firestore';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { useGameProgress } from './useGameProgress';
import { useAchievements } from './useAchievements';

export function useLeaderboard() {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(() => getStorageItem('qa_user_profile', null));
    
    const { xp } = useGameProgress();
    const { unlockedAchievements } = useAchievements();

    // Calculate level manually since it's not returned by useGameProgress
    const currentLevel = Math.floor(xp / 500) + 1;

    // Determine collection name based on environment (dev or prod)
    const COLLECTION_NAME = import.meta.env.DEV ? 'users_test' : 'users';

    // 1. Listen to leaderboard changes in real-time
    useEffect(() => {
        const q = query(
            collection(db, COLLECTION_NAME),
            orderBy('xp', 'desc'),
            limit(50) // Top 50
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });
            setLeaders(users);
            setLoading(false);
        }, (error) => {
            console.error("Error getting leaderboard:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // 2. Sync current user data to Firestore
    useEffect(() => {
        const syncUser = async () => {
            if (!userProfile?.uid) return;

            try {
                await setDoc(doc(db, COLLECTION_NAME, userProfile.uid), {
                    name: userProfile.name,
                    name_lower: userProfile.name.toLowerCase().trim(), // For case-insensitive search
                    xp: xp,
                    level: currentLevel,
                    badges: unlockedAchievements,
                    lastActive: new Date().toISOString()
                }, { merge: true });
            } catch (error) {
                console.error("Error syncing user data:", error);
            }
        };

        const timeoutId = setTimeout(syncUser, 2000); // Debounce sync to avoid too many writes
        return () => clearTimeout(timeoutId);
    }, [xp, currentLevel, unlockedAchievements, userProfile]);

    // 3. Create or Restore User Profile
    const saveProfile = async (name) => {
        const cleanName = name.trim();
        const nameLower = cleanName.toLowerCase();

        try {
            // Check if user with this name already exists (Login Logic)
            // Try searching by lowercase name first (preferred)
            let q = query(collection(db, COLLECTION_NAME), where("name_lower", "==", nameLower));
            let querySnapshot = await getDocs(q);

            // Fallback: Try searching by exact name (for legacy records without name_lower)
            if (querySnapshot.empty) {
                q = query(collection(db, COLLECTION_NAME), where("name", "==", cleanName));
                querySnapshot = await getDocs(q);
            }

            let uid;
            let isNewUser = true;
            let remoteData = null;

            if (!querySnapshot.empty) {
                // User exists! Restore account
                // Prefer the user with the highest XP if duplicates exist
                const docs = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                const bestMatch = docs.sort((a, b) => (b.xp || 0) - (a.xp || 0))[0];
                
                uid = bestMatch.id; 
                isNewUser = false;
                remoteData = bestMatch;
                console.log("User restored:", cleanName, uid);
            } else {
                // New User
                uid = userProfile?.uid || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            }
            
            const profile = { uid, name: cleanName };
            setStorageItem('qa_user_profile', profile);
            
            // Logic to determine what data to use
            let finalXP = xp;
            let finalLevel = currentLevel;
            let finalBadges = unlockedAchievements;
            let shouldReload = false;

            if (!isNewUser && remoteData) {
                const remoteXP = remoteData.xp || 0;
                const currentXP = xp || 0;

                // If remote is ahead of local (which is 0 on fresh login), use remote
                if (remoteXP > currentXP) {
                    console.log("Syncing from DB to LocalStorage...");
                    finalXP = remoteXP;
                    finalLevel = remoteData.level || 1;
                    finalBadges = remoteData.badges || [];
                    shouldReload = true;
                    
                    // Update LocalStorage immediately
                    const gameProgress = getStorageItem('qa_game_progress', { 
                        xp: 0, 
                        level: 1, 
                        foundBugs: [],
                        completedLevels: { sql: [], automation: [], api: [], mobile: [] } 
                    });
                    gameProgress.xp = remoteXP;
                    gameProgress.level = remoteData.level || 1;
                    setStorageItem('qa_game_progress', gameProgress);

                    if (remoteData.badges && remoteData.badges.length > 0) {
                        setStorageItem('qa_achievements', remoteData.badges);
                    }
                }
            }

            // Sync to DB FIRST to ensure remote state is preserved/updated correctly
            const userData = {
                name: cleanName,
                name_lower: nameLower,
                xp: finalXP, 
                level: finalLevel,
                badges: finalBadges,
                lastActive: new Date().toISOString()
            };

            if (isNewUser) {
                userData.createdAt = new Date().toISOString();
            }

            await setDoc(doc(db, COLLECTION_NAME, uid), userData, { merge: true });

            // Only set user profile state if we are NOT going to reload immediately
            // This prevents the 'syncUser' effect from firing with stale state before reload
            if (shouldReload) {
                window.location.reload();
            } else {
                setUserProfile(profile);
            }

            return true;
        } catch (error) {
            console.error("Error saving/restoring profile:", error);
            return false;
        }
    };

    return {
        leaders,
        loading,
        userProfile,
        saveProfile
    };
}
