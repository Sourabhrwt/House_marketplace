import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { BsFillEyeFill } from "react-icons/bs";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import '../styles/signup.css'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import Oauth from "../components/Oauth";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitHndler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
      alert("Signup SUccess");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title="signup - house marketplace">
      <div className="row signup-container">
        <div className="col-md-6 signup-container-col-1">
          <img src="./assets/signup.svg" alt="welcome" />
        </div>
        <div className="col-md-6 signup-container-col-2">
          <form onSubmit={onSubmitHndler}>
            <h3 className=" mt-2 text-center ">Sign Up </h3>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                className="form-control"
                id="name"
                onChange={onChange}
                aria-describedby="nameHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={onChange}
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={onChange}
                className="form-control"
                id="password"
              />
            </div>
            <div className="mb-3">
              show password
              <BsFillEyeFill
                className="text-danger ms-2  "
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowPassword((prevState) => !prevState);
                }}
              />
            </div>
            <button type="submit" className="btn signup-button">
              Sign up
            </button>
            <span className="ms-4">Already User</span>{" "}
            <Link to="/signin">Login</Link>
            <div className="mt-3">
              <Oauth />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
