// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import 'firebase/database'
import {
    getFirestore,
    
  } from 'firebase/firestore'
  // TODO: Add SDKs for Fireba

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1s3Joy43OXRTWEi_yB3Jcanw9E94CSqg",
  authDomain: "firestore-database-8efc7.firebaseapp.com",
  projectId: "firestore-database-8efc7",
  storageBucket: "firestore-database-8efc7.appspot.com",
  messagingSenderId: "536575234881",
  appId: "1:536575234881:web:292eb57a41175b867787c0",
  measurementId: "G-G94N158LFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);