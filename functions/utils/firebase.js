// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDiY1jSB3F2NplMyVfMU7jn0eE6Xe48K7U",
  authDomain: "clone-f7182.firebaseapp.com",
  databaseURL: "https://clone-f7182.firebaseio.com",
  projectId: "clone-f7182",
  storageBucket: "clone-f7182.appspot.com",
  messagingSenderId: "350110206242",
  appId: "1:350110206242:web:a21b8bec33c356dd50bd7b",
  measurementId: "G-MXHPYNYXFT",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
