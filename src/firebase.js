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

class Data {
  constructor(user, score, email) {
    this.user = user;
    this.score = score;
    this.email = email;
  }
}

const dataConverter = {
  toFirestore(data) {
    return {
      user: data.user,
      score: data.score,
      email: data.email
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Data(data.user, data.score, data.email);
  }
};

export const getScore = async () => {
  const rankingData = [];
  await db.collection('scores').withConverter(dataConverter).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      rankingData.push(data);
    });
  });
  rankingData.sort((a, b) => {
    if (a.score - b.score > 0) return -1;
    if (a.score - b.score < 0) return 1;
    return 0;
  });
  return rankingData;
};