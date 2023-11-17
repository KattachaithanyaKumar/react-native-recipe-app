import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqnv8hKR1H7TVFt6dIDk1VekpX3gp6xoM",
  authDomain: "recipe-app-c638c.firebaseapp.com",
  projectId: "recipe-app-c638c",
  storageBucket: "recipe-app-c638c.appspot.com",
  messagingSenderId: "505566978263",
  appId: "1:505566978263:web:8b07955996e577f45c5092",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = initializeFirestore(app, { experimentalForceLongPolling: true });

// Get Firebase Storage reference
const storage = getStorage(app);

export { db, auth, storage };
