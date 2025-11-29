import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyAFAoHsh7rQ32qvIUqdyRaIZkGRjKI2t8M",
  authDomain: "qa-student-app-12f98.firebaseapp.com",
  projectId: "qa-student-app-12f98",
  storageBucket: "qa-student-app-12f98.firebasestorage.app",
  messagingSenderId: "1054149573722",
  appId: "1:1054149573722:web:1603918839bc3ce34bac63",
  measurementId: "G-DXPHJRLDTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in browser and if supported)
let analytics = null;
let performance = null;

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      performance = getPerformance(app);
    }
  });
}

// Analytics Helper Functions
export const trackEvent = (eventName, params = {}) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
};

export const trackPageView = (pageName) => {
  trackEvent('page_view', { page_name: pageName });
};

export const trackUserAction = (action, category, label, value) => {
  trackEvent('user_action', {
    action,
    category,
    label,
    value
  });
};

export { analytics, performance };
