// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  // createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  // collection,
  // writeBatch,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvSobfukdyeVUzn206tKGQyWdGDsKHfJM",
  authDomain: "linkedin-clone-e6a63.firebaseapp.com",
  projectId: "linkedin-clone-e6a63",
  storageBucket: "linkedin-clone-e6a63.appspot.com",
  messagingSenderId: "662743908397",
  appId: "1:662743908397:web:b1b6d514cee7edeb8938a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error Creating the User", error.message);
    }
  }

  return userDocRef;
};

export const createArticleFromPayload = async (payload) => {
  if (!payload) return;
  const articleDocRef = doc(db, "articles", payload.id);
  try {
    await setDoc(articleDocRef, {
      id:payload.id,
      actor: {
        id:payload.user.uid,
        description: payload.user.email,
        title: payload.user.displayName,
        date: payload.timestamp,
        image: payload.user.photoURL,
      },
      video: payload.video,
      sharedImg: payload.downloadURL ? payload.downloadURL : "",
      comments: 0,
      description: payload.description,
    });
    console.log("Article Uploaded Successfully");
    return { uploaded: true };
  } catch (error) {
    console.log("Error Creating the Article", error.message);
    return { error: error };
  }
};

export const fetchArticlesFromFirebase = async() => {
  const collectionRef = collection(db, "articles");
  const q = query(collectionRef, orderBy("actor.date","desc"))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data())
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
