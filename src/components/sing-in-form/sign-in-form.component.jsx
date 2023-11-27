import { useState } from "react";
import  { singInWithGooglePopup } from '../../utils/firebase/firebase.utils'
import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sing-in-form.styles.scss'

const defaultFormFields = {
    email:"",
    password:""
}

const SignInForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;
    
    const resetFormFields = ( )=>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            
            resetFormFields();

        }
        catch(error){
            switch(error.cade){
                case  'auth/wrong-password': alert('Incorrect password for email');
                break;
                case 'auth/user-not-found' :alert('User not found');
                break;
                default: console.log('User creation enconuntered an error', error);
                break;

            }
        }
    }
    const handleChange = (event)=>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value})
    }
    const signInWithGoogle = async() =>{
        const {user} = await singInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    return(
        <div className="sign-in-container">
            <h2>Already have an account</h2>
            <span>Sing in with your email and passsword</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' required type='email' onChange={handleChange} name = 'email' value ={email}/>
                <FormInput label='Password' required type='password' onChange={handleChange} name = 'password' value ={password}/>
                <div className="buttons-container">
                    <Button type="subtmit" >Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>

            </form>
        </div>
    )
}
export default SignInForm;