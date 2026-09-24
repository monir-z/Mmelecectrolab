import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

const firestoreSettings = {
  experimentalAutoDetectLongPolling: true,
};

export const db = firebaseConfig.firestoreDatabaseId
  ? initializeFirestore(app, firestoreSettings, firebaseConfig.firestoreDatabaseId)
  : initializeFirestore(app, firestoreSettings);

// Connectivity validation - offline-resilient with graceful fallback
async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, '_connection_test_', 'init'));
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (
      err?.code === 'unavailable' ||
      err?.message?.includes('the client is offline') ||
      err?.message?.includes('Could not reach Cloud Firestore')
    ) {
      // Gracefully operates in offline cache mode until backend connection is established
      console.info('Firestore is operating in offline-resilient cache mode.');
    } else {
      console.warn('Firestore connection check:', error);
    }
  }
}

// Defer connectivity check so initial network handshakes complete first
if (typeof window !== 'undefined') {
  setTimeout(() => {
    testFirestoreConnection();
  }, 1200);
}

export default app;
