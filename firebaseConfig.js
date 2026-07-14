import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEfIQJZvkh3G1PvyISyUanMCHIinj17rM",
  authDomain: "tropihair-a27ce.firebaseapp.com",
  projectId: "tropihair-a27ce",
  storageBucket: "tropihair-a27ce.firebasestorage.app",
  messagingSenderId: "131974490721",
  appId: "1:131974490721:web:2f558e9f54367cdd4b5820",
};

const app = initializeApp(firebaseConfig);

// Auth with persistence - login stays after app restart
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export default app;
