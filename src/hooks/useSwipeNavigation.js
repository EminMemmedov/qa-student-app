import { useSwipeable } from 'react-swipeable';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Custom hook for swipe-based navigation
 * Swipe right to go back, swipe left for forward navigation (if applicable)
 */
export function useSwipeNavigation() {
    const navigate = useNavigate();
    const location = useLocation();

    // Define navigation routes in order
    const routes = ['/', '/theory', '/practice', '/leaderboard'];
    const currentIndex = routes.indexOf(location.pathname);

    const handlers = useSwipeable({
        onSwipedRight: () => {
            // Swipe right = go back
            if (currentIndex > 0) {
                navigate(routes[currentIndex - 1]);
            } else if (location.pathname !== '/') {
                navigate(-1); // Fallback to browser back
            }
        },
        onSwipedLeft: () => {
            // Swipe left = go forward
            if (currentIndex >= 0 && currentIndex < routes.length - 1) {
                navigate(routes[currentIndex + 1]);
            }
        },
        preventScrollOnSwipe: false,
        trackMouse: false, // Only track touch, not mouse
        delta: 50, // Minimum swipe distance
    });

    return handlers;
}

