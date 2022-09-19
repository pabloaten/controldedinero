import logo from './logo.svg';
import './App.css';
import {createItem, getItems} from './application/api';
import React, { useEffect, useState } from 'react'
import StickyFooter from './application/StickyFooter';


function App() {
  const [item, setItem] = useState([]);
  const [item2, setItem2] = useState([]);
  const [objetos, setObjetos] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, [])

  const obtenerDatos = async () => {
    const p = await getItems();
    console.log(p.docs[0].data())
    setObjetos(p.docs);
  } 

  

  const handleSave = () =>{
    createItem(item,item2);
    obtenerDatos();
  }
  return (
    <div className="App">
      <h1>Control de dinero</h1>
      <input className="uk-input" type="text" value={item} onChange={(e) => setItem(e.target.value)}/>
      <input className="uk-input" type="number" value={item2} onChange={(e) => setItem2(e.target.value)}/>
      <button class="uk-button uk-button-primary" onClick={handleSave}>Guardar</button>
     <table>
     <thead>
        <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
         
        </tr>
    </thead>
      
      {objetos.map(o =><tr> <td>{o.data().obj}</td> <td>{o.data().obj2}</td></tr>)}
      
     </table>
    </div>
  );
}

export default App;
