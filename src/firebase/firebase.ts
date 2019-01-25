import * as fb from 'firebase';

const config = {
    apiKey: "AIzaSyBGkHTfIn_X0ynelaAbdMg-MPd0claIIY8",
    authDomain: "franz-4db90.firebaseapp.com",
    databaseURL: "https://franz-4db90.firebaseio.com",
    projectId: "franz-4db90",
    storageBucket: "franz-4db90.appspot.com",
    messagingSenderId: "183981864804"
  };
 const firebase = fb.initializeApp(config);

 export const db = firebase.firestore();
 export const auth = firebase.auth();

