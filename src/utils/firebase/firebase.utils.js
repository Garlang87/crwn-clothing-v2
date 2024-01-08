import {initializeApp} from 'firebase/app';
import {  getAuth, signInWithPopup, 
          signInWithEmailAndPassword,GoogleAuthProvider, 
          createUserWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch,
        query, getDocs} from 'firebase/firestore'

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
  
  export const addCollectionAndDocuments = async(collectionKey,objectsToAdd, field='title') =>{
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    
    objectsToAdd.forEach((object)=>{
      const docRef = doc(collectionRef, object[field].toLowerCase());
      batch.set(docRef, object)
    });
    await batch.commit();
  };

  export const getCategoriesAndDocumets = async()=>{
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshop)=>{
      const {title,items} = docSnapshop.data();
      acc[title.toLowerCase()] = items;
      return acc;
    },{})
    return categoryMap;
  }

  export const createUserDocumentFromAuth = async (usrAuth, additionalInformation ={}) =>{
    if(!usrAuth){
      return;
    }
    const userDocRef = doc(db,'users', usrAuth.uid)
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
      const {displayName, email} = usrAuth;
      const createdAt = new Date();
      try {
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt,
          ...additionalInformation
        })
      }
      catch (error){
        console.log('Error creating the user', error.message);
      }
    }
    return userDocRef; 
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email||!password){
      return;
    }
    return await createUserWithEmailAndPassword(auth, email, password)
    
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email||!password){
      return;
    }
    return await signInWithEmailAndPassword(auth, email, password)
    
  };

  export const signOutUser = () => signOut(auth);

  export const onAuthStateChangedListener = (callback) =>  onAuthStateChanged(auth, callback);