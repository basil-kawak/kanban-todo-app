import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBC3HtzB2SS4BOiDNHQrvVW6maIy3TtOQU",
  authDomain: "todo-3b08d.firebaseapp.com",
  databaseURL: "https://todo-3b08d.firebaseio.com",
  projectId: "todo-3b08d",
  storageBucket: "todo-3b08d.appspot.com",
  messagingSenderId: "148626405188",
  appId: "1:148626405188:web:6622b8b8f755570920c911",
  measurementId: "G-HGB26VWCDG"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire.firestore();
