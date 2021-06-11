import firebase from 'firebase'

import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyCdh8gfEM4s-s1U7aX-VGoXNwQM3VthgPY",
    authDomain: "facebook-clone-21a9a.firebaseapp.com",
    projectId: "facebook-clone-21a9a",
    storageBucket: "facebook-clone-21a9a.appspot.com",
    messagingSenderId: "532764274335",
    appId: "1:532764274335:web:5f40ccc9592b0454c67caa"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore();

const storage = firebase.storage();

export { db, storage};