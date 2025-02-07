// auth-service.js
import { auth } from "../firebase-config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  browserLocalPersistence,
  setPersistence
} from "firebase/auth";

// Initialize auth persistence to local
try {
  await setPersistence(auth, browserLocalPersistence);
} catch (e) {
  console.warn('Failed to set auth persistence:', e);
}

// Create provider instance
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

// Fallback memory storage when browser storage is unavailable
const memoryStorage = new Map();

// Enhanced storage service with memory fallback
export const authStateService = {
  setAuthState: (state) => {
    try {
      // Try IndexedDB first (Firebase's preferred storage)
      const stateString = JSON.stringify(state);
      localStorage.setItem('authState', stateString);
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('authState', stateString);
      }
    } catch (e) {
      console.warn('Browser storage failed, using memory storage:', e);
      memoryStorage.set('authState', state);
    }
  },

  getAuthState: () => {
    try {
      // Try to get state from any available storage
      const localState = localStorage.getItem('authState');
      const sessionState = typeof sessionStorage !== 'undefined' 
        ? sessionStorage.getItem('authState') 
        : null;
      const state = localState || sessionState;
      
      return state ? JSON.parse(state) : memoryStorage.get('authState') || null;
    } catch (e) {
      console.warn('Failed to get auth state from browser storage:', e);
      return memoryStorage.get('authState') || null;
    }
  },

  clearAuthState: () => {
    try {
      localStorage.removeItem('authState');
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem('authState');
      }
      memoryStorage.delete('authState');
    } catch (e) {
      console.warn('Failed to clear auth state from browser storage:', e);
      memoryStorage.delete('authState');
    }
  }
};

// Helper to check if storage is available
const isStorageAvailable = () => {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Enhanced sign in with Google
 * Handles both popup and redirect flows with storage checks
 */
export const signInWithGoogle = async () => {
  try {
    // Always try popup first as it's more reliable
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (popupError) {
    console.log("Popup sign-in failed:", popupError);

    // Only attempt redirect if we can store state
    if (isStorageAvailable()) {
      try {
        // Save state before redirect
        authStateService.setAuthState({
          pendingSignIn: true,
          timestamp: Date.now(),
          returnPath: window.location.pathname
        });

        // Attempt redirect sign-in
        await signInWithRedirect(auth, provider);
      } catch (redirectError) {
        console.error("Redirect sign-in failed:", redirectError);
        authStateService.clearAuthState();
        throw redirectError;
      }
    } else {
      // If storage is unavailable, throw a more helpful error
      throw new Error(
        "Browser storage is not accessible. Please check your privacy settings or try a different browser."
      );
    }
  }
};

/**
 * Enhanced redirect result handler
 */
export const handleRedirectResult = async () => {
  try {
    // Check if we have a pending sign-in state first
    const state = authStateService.getAuthState();
    if (!state?.pendingSignIn) {
      return null;
    }

    // Verify the timestamp isn't too old (e.g., 5 minutes)
    if (state.timestamp && Date.now() - state.timestamp > 300000) {
      authStateService.clearAuthState();
      return null;
    }

    const result = await getRedirectResult(auth);
    if (result?.user) {
      authStateService.clearAuthState();
      return result.user;
    }

    return null;
  } catch (error) {
    console.error("Error handling redirect result:", error);
    authStateService.clearAuthState();
    throw error;
  }
};

/**
 * Check for pending sign-in with timestamp validation
 */
export const hasPendingSignIn = () => {
  const state = authStateService.getAuthState();
  if (!state?.pendingSignIn) return false;

  // Check if the pending sign-in is still valid (not too old)
  if (state.timestamp && Date.now() - state.timestamp > 300000) {
    authStateService.clearAuthState();
    return false;
  }

  return true;
};

/**
 * Get return path with fallback
 */
export const getReturnPath = () => {
  const state = authStateService.getAuthState();
  return state?.returnPath || '/';
};