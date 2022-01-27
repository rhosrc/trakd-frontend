import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAsArXXuT8AlVfdxk2ivHEGElVG_rPBfX0",
    authDomain: "trackit-f2e6c.firebaseapp.com",
    projectId: "trackit-f2e6c",
    storageBucket: "trackit-f2e6c.appspot.com",
    messagingSenderId: "873286760391",
    appId: "1:873286760391:web:60fd50ea44afecdc5ccbe2"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  function login () {
    return auth.signInWithPopup(provider);
  }

  function logout() {
    return auth.signOut();
  }

  export { auth, login, logout }