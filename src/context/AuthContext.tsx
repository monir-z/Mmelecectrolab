import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase/config';
import { useToast } from './ToastContext';
import { isAdminEmail } from '../utils/admin';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  phone?: string;
  address?: string;
  upazila?: string;
  role?: 'admin' | 'customer';
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  updateProfileData: (data: { displayName?: string; phone?: string; address?: string; upazila?: string }) => Promise<void>;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { showToast } = useToast();

  const isAdmin = isAdminEmail(user?.email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(userDocRef);
          const isUserAdmin = isAdminEmail(currentUser.email);

          if (docSnap.exists()) {
            const existingData = docSnap.data() as UserProfile;
            const updatedProfile: UserProfile = {
              ...existingData,
              displayName: currentUser.displayName || existingData.displayName || 'সম্মানিত গ্রাহক',
              email: currentUser.email || existingData.email,
              photoURL: currentUser.photoURL || existingData.photoURL,
              role: isUserAdmin ? 'admin' : (existingData.role || 'customer'),
              lastLogin: new Date().toISOString()
            };
            await setDoc(userDocRef, updatedProfile, { merge: true });
            setUserProfile(updatedProfile);
          } else {
            // Initialize new user profile document
            const newProfile: UserProfile = {
              uid: currentUser.uid,
              displayName: currentUser.displayName || 'সম্মানিত গ্রাহক',
              email: currentUser.email || '',
              photoURL: currentUser.photoURL || '',
              phone: '',
              address: '',
              upazila: 'সুন্দরগঞ্জ',
              role: isUserAdmin ? 'admin' : 'customer',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              lastLogin: new Date().toISOString()
            };
            await setDoc(userDocRef, newProfile);
            setUserProfile(newProfile);
          }
        } catch (err) {
          console.error('Error fetching/updating user profile in Firestore:', err);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      showToast(`স্বাগতম, ${result.user.displayName || 'গ্রাহক'}!`, 'success');
    } catch (err: unknown) {
      console.error('Google Sign In Error:', err);
      const errMsg = err instanceof Error ? err.message : 'গুগল লগইনে সমস্যা হয়েছে';
      showToast(`লগইন ব্যর্থ হয়েছে: ${errMsg}`, 'error');
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      showToast('সফলভাবে লগআউট হয়েছে', 'info');
    } catch (err) {
      console.error('Sign Out Error:', err);
      showToast('লগআউট করা যায়নি', 'error');
    }
  };

  const updateProfileData = async (data: { displayName?: string; phone?: string; address?: string; upazila?: string }) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const updatedFields = {
        ...data,
        updatedAt: new Date().toISOString()
      };
      await updateDoc(userDocRef, updatedFields);
      setUserProfile((prev) => (prev ? { ...prev, ...updatedFields } : null));
      showToast('প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে', 'success');
    } catch (err) {
      console.error('Update Profile Error:', err);
      showToast('প্রোফাইল আপডেট করা যায়নি', 'error');
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isAdmin,
        loading,
        signInWithGoogle,
        signOutUser,
        updateProfileData,
        isProfileModalOpen,
        setIsProfileModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
