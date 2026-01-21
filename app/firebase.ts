import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7s-3JfuJxyi_7nVOUNPkyxBf9uvFZVKQ",
  authDomain: "https://project-uas-b500e-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);