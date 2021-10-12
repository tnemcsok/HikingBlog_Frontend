import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBu7gbdecU_mHcydQkhWRG0ofNNORJb0Xk",
  authDomain: "hikingblog-9ba84.firebaseapp.com",
  projectId: "hikingblog-9ba84",
  storageBucket: "hikingblog-9ba84.appspot.com",
  messagingSenderId: "170969445558",
  appId: "1:170969445558:web:bcf858e6e9388ee0e72217",
  measurementId: "G-Z01M6DYHKE",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase.analytics();

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
