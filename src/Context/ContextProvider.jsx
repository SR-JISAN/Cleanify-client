import React, { Suspense, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import Loading from '../Components/Loading/Loading';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init.js';
import { GoogleAuthProvider } from 'firebase/auth';






function ContextProvider({ children }) {

  const [user,setUser] = useState(null)
   const [loading,setLoading]=useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser =(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }
  const singOutUser =  ()=>{
    setLoading(true)
    return signOut(auth)
    
  }
  
  const googleSignIn = new GoogleAuthProvider()

  const signInWithGoogle =()=>{
    setLoading(true)
        return signInWithPopup(auth,googleSignIn)
  }

  // observer

  useEffect(()=>{
         const unSubscribe = onAuthStateChanged(auth,(crrUser)=>{
              setUser(crrUser)
              setLoading(false)
         })
         return ()=>{
          unSubscribe()
         }
         
  },[])

  const authInfo = {
    createUser,
    signInUser,
    signInWithGoogle,
    singOutUser,
    user,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>
      <Suspense fallback={<Loading></Loading>}>{children}</Suspense>
    </AuthContext.Provider>
  );
}

export default ContextProvider;