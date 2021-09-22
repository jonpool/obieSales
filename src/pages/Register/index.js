import React,{ useState} from 'react';
import {Link} from 'react-router-dom'; 

import{FiArrowLeft} from 'react-icons/fi';
import './style.css';

import logoImage from '../../assets/Logo.png';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


require('dotenv').config();


export default function Register(){

  //coloca as variaves do formulario dentro de um state
  
  const [email, setEmail] = useState('');
  const[password, setPassword]=useState('');
  
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: "obieauth",
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: "1:241730256408:web:cec929c6beb04e64a9cd6d",
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  console.log(analytics);

  async function handleRegister(e){
      //evita o reload da page quando vc clica no botao
      e.preventDefault();
        
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert('successfully registered!');
            console.log(user);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage,errorCode);
            // ..
          });
        

  }


  return (
    <div className="register-container">
      <div className="content">
          <section>
          <img src={logoImage} alt="Obie Sales Chart"/>

          <h1>Sign Up</h1>
          <p>Sign up, get in to the platform and access sales chart from Obie Comfort Solutions</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
              I`m Already Registered.
          </Link>
          </section>
            <form onSubmit={handleRegister}>
              
              <input type="email" placeholder="E-mail"
                       value={email}
                       onChange={e => setEmail(e.target.value)}
              />
              <input placeholder="Password" type="password" name="password"
                       value={password}
                       onChange={e => setPassword(e.target.value)}
              />
              <button className="button" type="submit">Register</button>
            </form>
          
      </div>
    </div>
  );
}