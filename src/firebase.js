// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABRjcHJTsI2e8_UymB4LDbedTQrqzviMY",
  authDomain: "auth-5e135.firebaseapp.com",
  projectId: "auth-5e135",
  storageBucket: "auth-5e135.appspot.com",
  messagingSenderId: "71437543473",
  appId: "1:71437543473:web:52005a6bd52f1dbd784d10",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
