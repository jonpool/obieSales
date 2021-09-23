import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom'; 
import{FiArrowLeft} from 'react-icons/fi';
import api from '../../Services/api'
import './style.css';
import logoImage from '../../assets/Logo.png';
import * as XLSX from 'xlsx'


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
    
  };
  const handleSubmission = (e) => {
    e.preventDefault();
    readExcel(selectedFile);
    alert("File Successfully upload!");
    
  };
  
  var items = [];
  
  const readExcel=(file) => {
    const promise = new Promise((resolve, reject)=>{
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload=(e)=>{
        const bufferArray = e.target.result;
        const wb = {SheetNames:[], Sheets:{}};
        const ws1 = XLSX.read(bufferArray, {type:"buffer"}).Sheets.Sheet1;
        const ws2 = XLSX.read(bufferArray, {type:"buffer"}).Sheets.Sheet2;
        
        wb.SheetNames.push("Sheet1"); wb.Sheets["Sheet1"] = ws1;
        wb.SheetNames.push("Sheet2"); wb.Sheets["Sheet2"] = ws2;
     
        const data1 = XLSX.utils.sheet_to_json(ws1);
        const data2 = XLSX.utils.sheet_to_json(ws2);
        localStorage.setItem("data1", JSON.stringify(data1));

        resolve([data1, data2]);
      };
      fileReader.onerror=(error) => {
        reject(error);
      };
    });
    promise.then((excelData) => {
      items.push(excelData);
      console.log(excelData);
    });
  };
  return(
  <div className="new-incident-container">
  <div className="content">
      <section>
      <img src={logoImage} alt="Obie Comfort Solutions"/>

      <h1>Upload Table</h1>
      <p>To Show the data on the main screen upload the XLS file on the side box!</p>
      
      <Link className="back-link" to="/profile">
        <FiArrowLeft size={16} color="#E02041"/>
          Back.
      </Link>
      </section>
      <form>
        <div>
        <h1>Upload Your XLS File</h1>
			    <input type="file" name="file" onChange={changeHandler} />
          <div>
            <button onClick={handleSubmission}className="button" type="submit">Submit</button>
          </div>
          </div>
          
      </form>
      
    </div>
  </div>
  );
}
