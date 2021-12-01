import React, { useState } from "react";
import { auth, db } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "@firebase/firestore";

function Authentication({ setSuperUser }) {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, function (currentUser) {
    setUser(currentUser);

    // move the user object to the parent component
    setSuperUser(currentUser);
  });

  async function register() {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      ).then(function (userCredential) {
        // Place the new user into the database as a new user document
        setDoc(doc(db, "users", userCredential.user.uid), {
          email: registerEmail,
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async function login() {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function logout() {
    await signOut(auth);
  }

  // Only display register/login if user is not already logged in
  if (user != null) {
    return (
      <div className="Auth mb-5 max-w-7xl rounded shadow-lg bg-white p-8 mt-3">
        <h4 className="h4">Currently logged in as: {user?.email}</h4>
        <button className="buttonRed" onClick={logout}>
          Sign out
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-xs">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                type="email"
                placeholder="Email..."
                onChange={function (event) {
                  setLoginEmail(event.target.value);
                }}
              />
        
            
              <label className="block text-grey-darker text-sm font-bold mt-4 mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="***************"
                onChange={function (event) {
                  setLoginPassword(event.target.value);
                }}
              />
          
            <div className="flex items-center justify-between mt-4">
              <button className="auth-btn" onClick={login}>
                Sign In
              </button>
            </div>
          </div>
          
          <hr></hr>
      
         <div className="flex justify-center mb-4 mt-2 font-bold">Register new user</div>
          <div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2">
                Email
              </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  placeholder="Email..."
                  onChange={function (event) {
                    setRegisterEmail(event.target.value);
                  }}
                />
              </div>
              <label className="block text-grey-darker text-sm font-bold mt-4 mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="***************"
                onChange={function (event) {
                  setRegisterPassword(event.target.value);
                }}
              />
              <div className="flex items-center justify-between mt-4">
                <button className="auth-btn" onClick={register}>
                  Create User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Authentication;
