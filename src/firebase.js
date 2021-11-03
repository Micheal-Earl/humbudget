import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA4Hik6UPP1QSrlty33pYFhLEBT3TLihjM",
  authDomain: "humbudget.firebaseapp.com",
  projectId: "humbudget",
  storageBucket: "humbudget.appspot.com",
  messagingSenderId: "325490290430",
  appId: "1:325490290430:web:7a878bd66f4298d15e7faf",
};

// Initialize Firebase
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Database
export const db = getFirestore();
