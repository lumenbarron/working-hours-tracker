import React, { useCallback } from 'react';
import { withRouter  } from 'react-router';
import firebaseConfig from '../firebase';


export default function SignUp({history}) {
    const handleSignUp = useCallback( async (event) =>{
        event.preventDefault();
        const { email , password } = event.target.elements;
        try {
            await firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);
            history.push('/')
        } catch (error) {
            alert(error)
        }
    })
    return (
        <div>
            
        </div>
    )
}
