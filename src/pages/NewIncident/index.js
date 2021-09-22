import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom'; 
import{FiArrowLeft} from 'react-icons/fi';
import api from '../../Services/api'
import './style.css';
import logoImage from '../../assets/Logo.png';

export default function NewIncident()
 {
  const[title, setTitle] = useState('');
  const[description, setDescription] = useState('');
  const[value, setValue ] = useState('');

  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();
  async function handleNewIncident(e)
  {
      e.preventDefault();
      const data ={
        title,
        description,
        value,
      };
    try{
        await api.post('incidents',data,{
            headers:{
              Authorization: ongId,
            }
          })
        history.push('/profile');
      }catch{
        alert('Erro ao cadastrar caso, tente novamente')
      }
  } 

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    console.log(Event.target.files)
  };
  const handleSubmission = () => {
  };




  return(
  <div className="new-incident-container">
  <div className="content">
      <section>
      <img src={logoImage} alt="Obie Comfort Solutions" />

      <h1>Register a new Case</h1>
      <p>Sign up, get in to the plarform and help people to find someone in need of something</p>

      <Link className="back-link" to="/profile">
        <FiArrowLeft size={16} color="#E02041"/>
          Back.
      </Link>
      </section>
        <form>
        <div>
			      <input type="file" name="file" onChange={changeHandler} />
            <div>
                <button onClick={handleSubmission}className="button" type="submit">Submit</button>
            </div>
        </div>
          <input 
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
          />
          <textarea 
              placeholder="Description" 
              value={description}
              onChange={e => setDescription(e.target.value)}
          
          />
          
          <input 
              placeholder="Amount $"
              value={value}
              onChange={e => setValue(e.target.value)}
          />
          

          <button onClick ={handleNewIncident} className="button" type="submit">Register</button>
        </form>
      
    </div>
  </div>
  );
}
