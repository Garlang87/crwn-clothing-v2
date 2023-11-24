import {initializeApp} from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyrSrR1Zs8g9BXHcbB-N3OcgaJdSEQjhM",
    authDomain: "crwn-clothing-db-cb39b.firebaseapp.com",
    projectId: "crwn-clothing-db-cb39b",
    storageBucket: "crwn-clothing-db-cb39b.appspot.com",
    messagingSenderId: "638880020675",
    appId: "1:638880020675:web:9caa831a30f01aa6584a76"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  })

  

  export const auth = getAuth();
  
  export const singInWithGooglePopup =()=> signInWithPopup(auth, provider);
  
  export const db = getFirestore();
  
  export const createUserDocumentFromAuth = async (usrAuth) =>{
    const userDocRef = doc(db,'users', usrAuth.uid)
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
      const {displayName, email} = usrAuth;
      const createdAt = new Date();
      try {
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt
        })
      }
      catch (error){
        console.log('Error creating the user', error.message);
      }
    }
    return userDocRef; 
  }