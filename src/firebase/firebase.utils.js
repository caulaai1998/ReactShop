import firebase from 'firebase/app';

import 'firebase/firestore';

import 'firebase/auth';

const config= {
    apiKey: "AIzaSyC_T-bJEHbdCkVUXsgDYYhk6xMVCFmSKkU",
    authDomain: "learn-react-1e191.firebaseapp.com",
    databaseURL: "https://learn-react-1e191.firebaseio.com",
    projectId: "learn-react-1e191",
    storageBucket: "learn-react-1e191.appspot.com",
    messagingSenderId: "912639029396",
    appId: "1:912639029396:web:232b46a7c4150ee8f1c481",
    measurementId: "G-SCK2CR60F7"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error){
      console.log('error creating user', error.message);
      }
    }
    return userRef;
  };


  

  export const auth = firebase.auth();
  export const firestore=firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({promt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
