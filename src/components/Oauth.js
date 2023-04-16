import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase.config";


const Oauth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleAuthHandler = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate('/')
    } catch (error) {
        console.log(error);
      toast.error("Problem With Google Auth");
    }
  };

  return (
    <div>
      <h6 className="mt-2 ">Sign {location.pathname === "/signup" ? "Up" : "in"} with &nbsp;
      <button onClick={onGoogleAuthHandler}>
        <FcGoogle />
      </button>
      </h6>
    </div>
  );
};

export default Oauth;
