import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAEhUWdsEqDv9RghSgu38FkRNBnCjXFf20",
  authDomain: "thinkpiece2.firebaseapp.com",
  databaseURL: "https://thinkpiece2.firebaseio.com",
  projectId: "thinkpiece2",
  storageBucket: "thinkpiece2.appspot.com",
  messagingSenderId: "739233581077",
  appId: "1:739233581077:web:6d29bb1fd946b59417a61c"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore()
export const auth = firebase.auth()

export const provider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => auth.signInWithPopup(provider)
export const signOut = () => auth.signOut()

window.firebase = firebase;

export const createUserProfileDocument = async (user, additionalData) => {
  if ( !user ) return;
console.log('it is ', user.uid)
  //Get a ref to the place in db where user might be
  const userRef = firestore.doc(`users/${user.uid}`)

  // Go and fetch the doc from that location
  const snapshot = await userRef.get()

console.info('does user exist? ', snapshot)

  if (!snapshot.exist) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.error('Error creating user ', error.message)
    }
  }
  return getUserDocument(user.uid)
}


export const getUserDocument = async (uid) => {
 if (!uid) return null;
 try {
   const userDocument = await firestore.collection('users').doc(uid).get()

   return { uid, ...userDocument.data() }
 } catch (error) {
   console.error('Error fetching user ', error.message)
 }
}

export default firebase;
