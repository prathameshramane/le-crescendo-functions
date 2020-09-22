// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebase = require("firebase");
const admin = require("firebase-admin");
admin.initializeApp();

const firebaseConfig = {
  apiKey: "AIzaSyD4UQ9qdY0IbnGg3R7NU8Y6_t4zw2k8zt8",
  authDomain: "la-crescendo-academy.firebaseapp.com",
  databaseURL: "https://la-crescendo-academy.firebaseio.com",
  projectId: "la-crescendo-academy",
  storageBucket: "la-crescendo-academy.appspot.com",
  messagingSenderId: "894943552671",
  appId: "1:894943552671:web:161c58ffd4624985d12eaa",
  measurementId: "G-BL38S8S541"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = admin.firestore();
const auth = firebase.auth();

module.exports = {
  db: db,
  auth: auth,
  admin: admin,
  firebaseConfig: firebaseConfig,
};
