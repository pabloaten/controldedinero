import { React, useCallback, useState } from "react";
import Calendar from "react-calendar";
import { getItemsFecha } from "./api";
import Video from "./Phone-notification-(iOS)-[remix].mp4";
import debounce from "lodash/debounce";
import Busqueda from "./busqueda.png";
const Home = ({ id }) => {
  const [date, setDate] = useState(new Date());
  const [datos, setDatos] = useState([]);
 

 
/*   const consulta = async(e)=>{
    setDate(e);
    console.log(date);
    let b = await getItemsFecha(id, date2);
    setDatos(b.docs);
    console.log(b.docs);
  } */
  const consulta = debounce(async (e) => {
    
    const date2 = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`;
    const response = await getItemsFecha(id, date2);
    console.log(response.docs);
    setDatos(response.docs)
  }, 0);
 /*  const consulta = debounce(async (e) => {
    setDate(e);
    console.log(date);
    let b = await getItemsFecha(id, date2);
    setDatos(b.docs);
    console.log(b.docs);
  }, 500); */
  

  return (
    <div className="uk-flex uk-flex-center uk-flex-middle uk-flex-column">
      <Calendar
        className="react-calendar"
        onChange={setDate}
        value={date}
      />
      <button onClick={consulta}>Consulta</button> 
      <table className="uk-table uk-width-1-2 white">
      
      {datos.length == 0 ? (<div className="uk-flex uk-flex-column uk-flex-middle"><h3 >Sin resultados</h3><img style={{width: '50%'}} src ={Busqueda } /></div>):<thead>
        <tr>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Fecha</th>
          <th>Imagen</th>
          
        </tr>
      </thead>}
      {datos.map((o) => (
        <tr>
          {" "}
          <td>{o.data().obj}</td>{" "}
          {o.data().obj2 >= 0 ? (
            <td className="uk-text-success">{o.data().obj2}€</td>
          ) : (
            <td className="uk-text-danger">{o.data().obj2}€</td>
          )}{" "}
          <td>{o.data().obj3}</td>
          <td>
            <img className="imagen uk-border-rounded" src={o.data().imagen} />
          </td>{" "}
          
        </tr>
      ))}
    </table>
      <video
        src={Video}
        width="20%"
        height="auto"
        loop
        muted
        playsinline
        uk-video="autoplay: inview"
      ></video>
    </div>
  );
};

export default Home;
