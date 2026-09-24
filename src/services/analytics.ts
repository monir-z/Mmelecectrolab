import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

/**
 * Tracks unique site visitors in Firestore under `site_analytics/traffic`.
 * Increments `site_visits` by 1 using Firestore `increment(1)` field value.
 * Uses sessionStorage to count unique visitor per browser session.
 */
export const trackVisitorTraffic = async (): Promise<void> => {
  try {
    const sessionKey = 'mm_session_visitor_tracked_v2';
    if (typeof window !== 'undefined' && sessionStorage.getItem(sessionKey)) {
      return;
    }
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(sessionKey, 'true');
    }

    const trafficRef = doc(db, 'site_analytics', 'traffic');
    const snap = await getDoc(trafficRef);

    if (snap.exists()) {
      await updateDoc(trafficRef, {
        site_visits: increment(1),
        lastVisited: new Date().toISOString()
      });
    } else {
      await setDoc(trafficRef, {
        site_visits: 1,
        createdAt: new Date().toISOString(),
        lastVisited: new Date().toISOString()
      });
    }
  } catch (err) {
    console.warn('Traffic count increment failed:', err);
  }
};

/**
 * Reads real-time visitor count from `site_analytics/traffic`.
 * No static or fake counts.
 */
export const getTrafficCount = async (): Promise<number> => {
  try {
    const trafficRef = doc(db, 'site_analytics', 'traffic');
    const snap = await getDoc(trafficRef);
    if (snap.exists()) {
      const data = snap.data();
      return Number(data.site_visits) || 0;
    }
  } catch (err) {
    console.warn('Could not read site_analytics count:', err);
  }
  return 0;
};

/**
 * Subscribes to realtime updates of `site_analytics/traffic`.
 */
export const subscribeToTrafficCount = (callback: (count: number) => void): (() => void) => {
  try {
    const trafficRef = doc(db, 'site_analytics', 'traffic');
    return onSnapshot(
      trafficRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          callback(Number(data.site_visits) || 0);
        } else {
          callback(0);
        }
      },
      (err) => {
        console.warn('Realtime traffic listener warning:', err);
      }
    );
  } catch {
    return () => {};
  }
};
