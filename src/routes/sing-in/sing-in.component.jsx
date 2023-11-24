import  { singInWithGooglePopup } from '../../utils/firebase/firebase.utils'

const SingIn = () =>{
    const logGoogleUser = async() =>{
        const response = await singInWithGooglePopup();
        console.log(response);
    }
    return(
        <div>
            <h1>Sing in Page</h1>
           <button onClick={logGoogleUser}>Sing in with google Popup</button>
        </div>
    )
}
export default SingIn;