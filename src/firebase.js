import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDXgUrmdJSWtGs4ihXUA9kb8YmewOzUQwA",
    authDomain: "nm-chat.firebaseapp.com",
    databaseURL: "https://nm-chat.firebaseio.com",
    projectId: "nm-chat",
    storageBucket: "nm-chat.appspot.com",
    messagingSenderId: "718360447369",
    appId: "1:718360447369:web:6f895ec48995686ad03958"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore()
export const auth = firebase.auth()

export const provider = new firebase.auth.GoogleAuthProvider()

export default firebase
