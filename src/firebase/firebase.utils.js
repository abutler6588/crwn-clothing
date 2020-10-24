import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyAA74QrhD9PrgW0iAUrlvfC_ZuRP9LL0oo",
        authDomain: "crwn-db-fb43d.firebaseapp.com",
        databaseURL: "https://crwn-db-fb43d.firebaseio.com",
        projectId: "crwn-db-fb43d",
        storageBucket: "crwn-db-fb43d.appspot.com",
        messagingSenderId: "283459567900",
        appId: "1:283459567900:web:65221df82468bd5edbfad9",
        measurementId: "G-D2FCPS293Z"
      };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  //if this snapShot doesnt exist
  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
//then create the data to add into DB in the specified places, create a new user using the data from our userAuth
    try {
      await userRef.set({
        displayName,
        email, 
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;