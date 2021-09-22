
import React,{ useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './style.css';
import herosImage from '../../assets/cover.png';
import logoImage from '../../assets/Logo.png';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";




export default function Logon(){
  
  const [email, setEmail] = useState('');
  const[password, setPassword]=useState('');
  const history = useHistory();

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: "obieauth",
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: "1:241730256408:web:cec929c6beb04e64a9cd6d",
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };
  
  //Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  console.log(analytics);
  
  async function handleLogin(e){
  e.preventDefault();
  
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    history.push('profile');
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    alert (errorCode);
  });
  

  }


  return(
    
    <div className="logon-container">
      <section className="form">
        <img src={logoImage} alt="Obie Comfort Solutions"/>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <input placeholder="Email" 
              value ={email}
              onChange={e => setEmail(e.target.value)}
          />
          <input placeholder="Password" type="password" name="password"
              value ={password}
              onChange={e => setPassword(e.target.value)}
          />
          <button className="button" type="submit" >Login</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#ed1c24"/>
              Create an Account
          </Link>
          
        </form>
      </section>
         <img src={herosImage} alt="heros"/>
    </div>
      
  );
  
}
