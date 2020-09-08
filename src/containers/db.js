import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyCm_YxHHUGvO2wspIzdv8plaQ7PWtPS_Xw",
  authDomain: "posts-8b494.firebaseapp.com",
  databaseURL: "https://posts-8b494.firebaseio.com",
  projectId: "posts-8b494",
  storageBucket: "posts-8b494.appspot.com",
  messagingSenderId: "1040292931183",
  appId: "1:1040292931183:web:323db79b29f37113328f9a",
  measurementId: "G-4BMPC5E3EC",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire.firestore();
