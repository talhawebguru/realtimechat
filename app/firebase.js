// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIOS5hSmb8MkYTcetUY5VHJZ2xHzshoTk",
  authDomain: "realtimechatsa.firebaseapp.com",
  projectId: "realtimechatsa",
  storageBucket: "realtimechatsa.firebasestorage.app",
  messagingSenderId: "880533310509",
  appId: "1:880533310509:web:1d71b7fc4eb3a8a8e1fca4",
  measurementId: "G-KTT1ZZHES5"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
const db = getFirestore(app);

// Initialize Authentication (if needed)
const auth = getAuth(app);

export { db, auth , app };