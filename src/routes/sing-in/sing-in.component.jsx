import  { singInWithGooglePopup } from '../../utils/firebase/firebase.utils'
import   SignUpForm from '../../components/sign-up-form/sign-up-form.component'
const SingIn = () =>{
    const logGoogleUser = async() =>{
        const response = await singInWithGooglePopup();
        console.log(response);
    }
    return(
        <div>
            <h1>Sing in Page</h1>
           <button onClick={logGoogleUser}>Sing in with google Popup</button>
           <SignUpForm/>
        </div>
    )
}
export default SingIn;