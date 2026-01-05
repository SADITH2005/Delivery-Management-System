import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXtSmintv_-WbGaKoAMTxtN-xNKx5NOIU",
  authDomain: "dms-system-95104.firebaseapp.com",
  projectId: "dms-system-95104",
  storageBucket: "dms-system-95104.firebasestorage.app",
  messagingSenderId: "293500261038",
  appId: "1:293500261038:web:156d81090c5c834ac8533f",
  measurementId: "G-BQPLXYQZ35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
