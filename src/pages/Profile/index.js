
import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower} from 'react-icons/fi';
import './style.css';
import logoImage from '../../assets/Logo.png';


const sale = [{
  
  "id": 6,
  "name":"Obie",
  "img": "https://uploadexample.s3.us-east-2.amazonaws.com/obie.jpg",
  "Sales": 75000,
  "Average": 28923,
  "Close": 28923,
  "Set": 28923,
  "Sold": 28923
},
{
  "id": 26,
  "name":"Jeff",
  "img": "https://uploadexample.s3.us-east-2.amazonaws.com/jef.jpg",
  "Sales": 30000,
  "Average": 28923,
  "Close": 28923,
  "Set": 28923,
  "Sold": 28923
},
{
  "id": 37,
  "name":"Scott",
  "img": "https://uploadexample.s3.us-east-2.amazonaws.com/scotr.jpg",
  "Sales": 60000,
  "Average": 28923,
  "Close": 28923,
  "Set": 28923,
  "Sold": 28923
},
{

  "id": 37,
  "name":"Tony",
  "img": "https://uploadexample.s3.us-east-2.amazonaws.com/tony.jpg",
  "Sales": 70000,
  "Average": 28923,
  "Close": 28923,
  "Set": 28923,
  "Sold": 28923
}
]

export default function Profile(){

  const [incidents, setSale] = useState([]); 
  const history = useHistory();

  useEffect(()=>{
    setSale(sale);
    },/*todo vez que a id da ond mudar ele refaz o funcion acima*/ [])

  function handleLogout(){
    localStorage.clear();

    history.push('/');
  }

  return (
  <div className="profile-container">
    <header>
      <img src={logoImage} alt="Obie"/>
  <span>Welcome, To Obie Sales Chart!</span>

      <Link className="button" to="/Incident/new">Refresh</Link>
      <button onClick ={handleLogout} type="button">
        <FiPower size={18} color="#e02041"/>
      </button>
    </header>
    
    <ul>
       <li>TOP SALE #1</li>
       <li>TOP SALE #2</li>
       <li>TOP SALE #3</li>
       <li>TOP SALE #4</li>
     </ul>
    <ul>
     {incidents.sort((a, b) => (a.Sales < b.Sales) ? 1 : -1).map(incident=>(
       
     <li key={incident.id}>
     <strong>{incident.name}</strong>
     <img src={incident.img} alt=''></img>
    <table class="styled-table">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>{incident.name}</th>
              </tr>
          </thead>
          <tbody>
              <tr class="active-row">
                  <td>Sales</td>
                  <td>{incident.Sales}</td>
              </tr>
              <tr class="active-row">
                  <td>Average</td>
                  <td>{incident.Average}</td>
              </tr>
              <tr class="active-row">
                  <td>Close</td>
                  <td>{Intl.NumberFormat('en-US',{style:'currency', currency:'USD'} ).format(incident.Close)}</td>
              </tr>
              <tr class="active-row">
                  <td>Set</td>
                  <td>{incident.Set}</td>
              </tr>
              <tr class="active-row">
                  <td>Sold</td>
                  <td>{incident.Sold}</td>
              </tr>
              
          </tbody>
    </table>
     {/*<button onClick={()=>handleDeletIncident(incident.id)} type="button">
          <FiTrash2 size={20} color="#0808b3"></FiTrash2>
     </button>*/}
      </li>
      
     ))}
    </ul>
  </div>
  );
}