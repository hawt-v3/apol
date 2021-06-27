import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";
import "firebase/storage";

const clientCredentials = {
  apiKey: "AIzaSyBw4ri3zVq9OAnyzXRTISdQPCDaipxyB7M",
  authDomain: "apol-hawt.firebaseapp.com",
  projectId: "apol-hawt",
  storageBucket: "apol-hawt.appspot.com",
  messagingSenderId: "1015471912319",
  appId: "1:1015471912319:web:9bb799a6b3125b63ed564a",
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
  // Check that `window` is in scope for the analytics module!
  if (typeof window !== "undefined") {
    // Enable analytics. https://firebase.google.com/docs/analytics/get-started
    if ("measurementId" in clientCredentials) {
      firebase.analytics();
      firebase.performance();
    }
  }
}

export default firebase;
