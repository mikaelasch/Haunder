import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue } from'firebase/database';
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDX3NzJN2xWUUekFTlWe3Uk2z_ZHP6BXHs",
    authDomain: "haunder-a479c.firebaseapp.com",
    databaseURL: "https://haunder-a479c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "haunder-a479c",
    storageBucket: "haunder-a479c.appspot.com",
    messagingSenderId: "7090599564",
    appId: "1:7090599564:web:7f9192bbc37722b35dada9"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const fs = getFirestore(app)

  export {db,fs}