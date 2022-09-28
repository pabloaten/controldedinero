import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const Login2 = ({user,setUser}) => {
    
const provider = new GoogleAuthProvider();
const logearse = () =>{
    const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    setUser(user.email)
    // ...
  }).catch((error) => {
    console.log(error);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

}

  return (
    <div> 
        <button onClick={logearse} class="btn-glitch-fill ">
    <span class="text">// Acceder</span>
    <span class="text-decoration">_</span>
    <span class="decoration">&rArr;</span>
  </button></div>
  )
}

export default Login2