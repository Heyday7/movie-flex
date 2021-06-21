import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDEGDQeGZ_MNfvtT_Vco-prfDx68_Dbwrs',
  authDomain: 'movie-flex-78e03.firebaseapp.com',
  projectId: 'movie-flex-78e03',
  storageBucket: 'movie-flex-78e03.appspot.com',
  messagingSenderId: '909729866616',
  appId: '1:909729866616:web:0ab3dd87837e13ab4a5e8d'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((res) => { console.log(res); });
};

export const logout = () => {
  firebase.auth().signOut();
};

export const recordScore = (score) => {
  db.collection('scores').add({
    user: firebase.auth().currentUser.displayName,
    email: firebase.auth().currentUser.email,
    score
  });
};

export const getScore = () => {
  db.collection('scores').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  });
};
