import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import  { auth ,singInWithGooglePopup, signInWithGoogleRedirect,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

const SingIn = () =>{

   useEffect( async()=>{
        const response = await getRedirectResult(auth);
        if(response){
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
   },[])
    const logGoogleUser = async() =>{
        const {user} = await singInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        
    }
    
    return(
        <div>
            <h1>Sing in Page</h1>
           <button onClick={logGoogleUser}>Sing in with google Popup</button>
           <button onClick={signInWithGoogleRedirect}>Sing in with google redirect</button>
        </div>
    )
}
export default SingIn;