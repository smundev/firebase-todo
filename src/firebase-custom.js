import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBynaykA9csOj-2Nt0XCKvS-kfFVnh2pcg",
  authDomain: "fir-test-c940c.firebaseapp.com",
  projectId: "fir-test-c940c",
  storageBucket: "fir-test-c940c.appspot.com",
  messagingSenderId: "673253296329",
  appId: "1:673253296329:web:e7540bf408a73ae23d6518",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export the Firestore instance
export const db = firebase.firestore();
