import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../context/user.context";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sing-up-form.styles.scss'

const defaultFormFields = {
    displayName :"",
    email:"",
    password:"",
    confirmPassword:""
}

const SignUpForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;
    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = ( )=>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(password!= confirmPassword){
            alert("Passwords doesn't match")
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            //const response  = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user,{displayName})
            setCurrentUser(user)
            resetFormFields();

        }
        catch(error){
            console.log('User creation enconuntered an error', error);
        }

    }
    const handleChange = (event)=>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value})
    }

    return(
        <div className="sign-up-container">
        <h2>Don't have and account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' required type='text' onChange={handleChange} name = 'displayName' value ={displayName}/>
                <FormInput label='Email' required type='email' onChange={handleChange} name = 'email' value ={email}/>
                <FormInput label='Password' required type='password' onChange={handleChange} name = 'password' value ={password}/>
                <FormInput label='Confirm Password' required type='password' onChange={handleChange} name = 'confirmPassword' value ={confirmPassword}/>
                <Button type="subtmit" >Sign Up</Button>
                
            </form>
        </div>
    )
}
export default SignUpForm;