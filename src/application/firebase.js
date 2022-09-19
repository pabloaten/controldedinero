// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiowBnxJFPrdLtg8CbgfFugl46J-qWPLk",
  authDomain: "aten-bc755.firebaseapp.com",
  projectId: "aten-bc755",
  storageBucket: "aten-bc755.appspot.com",
  messagingSenderId: "684115530230",
  appId: "1:684115530230:web:1c9702a37782a9b3c437d7",
  measurementId: "G-DX88WNS46X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();