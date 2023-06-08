import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIEikAir8s6WBtWZFgaPa-4IQS-3ygEu0",
  authDomain: "fir-recepies-6e571.firebaseapp.com",
  projectId: "fir-recepies-6e571",
  storageBucket: "fir-recepies-6e571.appspot.com",
  messagingSenderId: "648686699427",
  appId: "1:648686699427:web:11d738473528f6e8939016",
  measurementId: "G-R0M19M3CQL",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
