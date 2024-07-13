"use client"
import Image from 'next/image';
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link';
import { signInWithPopup, GoogleAuthProvider, getAuth, AuthError } from 'firebase/auth';
import { useState, MouseEvent } from 'react';
import {auth} from "@/services/firebaseConfig"

// import googleLogo from '../assets/images/googleLogo.webp';

const GoogleSignUp = () => {
  const [error, setError] = useState(false);
  const [googleErrorMessage, setGoogleErrorMessage] = useState<string | undefined>(undefined);

  // Instantiate the auth service SDK
//   const auth = getAuth();

  // Handle user sign up with google
  const handleGoogleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Instantiate a GoogleAuthProvider object
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with a pop-up window
      const result = await signInWithPopup(auth, provider);

      // Pull signed-in user credential.
      const user = result.user;
    } catch (err: any) {
      // Handle errors here.
      if (err) {
        const errorMessage = err.message;
        const errorCode = err.code;

        setError(true);

        switch (errorCode) {
          case 'auth/operation-not-allowed':
            setGoogleErrorMessage('Email/password accounts are not enabled.');
            break;
          case 'auth/operation-not-supported-in-this-environment':
            setGoogleErrorMessage('HTTP protocol is not supported. Please use HTTPS.');
            break;
          case 'auth/popup-blocked':
            setGoogleErrorMessage('Popup has been blocked by the browser. Please allow popups for this website.');
            break;
          case 'auth/popup-closed-by-user':
            setGoogleErrorMessage('Popup has been closed by the user before finalizing the operation. Please try again.');
            break;
          default:
            setGoogleErrorMessage(errorMessage);
            break;
        }
      }
    }
  };

  return (
    <div className='signupContainer'>
      <div className='signupContainer__box__google'>
        <button onClick={handleGoogleSignUp}>
          <span>
            {/* <Image src={googleLogo} alt='Google Logo' width={20} height={20} /> */}
            <FaGoogle />
          </span>
          Sign up with Google
        </button>
        {error && <p>{googleErrorMessage}</p>}
      </div>

      <div className='signupContainer__box__login'>
        <p>
          Already have an account? <Link href='/signin'>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default GoogleSignUp;
