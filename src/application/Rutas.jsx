import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Home from "./Home";
import Layout from "./Layout";

import Login2 from "./Login2";
import {Acceso} from "./firebase";


function Rutas() {
   const autorizacion = getAuth(Acceso); 
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);
  const [user, setUser] = useState("")
  const [imagen, setImagen] = useState("")
  const [loading, setLoading] = useState(true)
  onAuthStateChanged(autorizacion,(usuarioFirebase)=>{
    if(usuarioFirebase){
      //codigo en el caso que tenga ya la sesion iniciada
      setUsuarioGlobal(usuarioFirebase);
      setUser(usuarioFirebase.email);
      setImagen(usuarioFirebase.reloadUserInfo.photoUrl);
      setLoading(false);
    }else{
      //codigo en el caso que no tenga la sesion iniciada
      setUsuarioGlobal(null);
      setLoading(false);
    }
  })
  const acceso = () =>{
    let a = prompt("Introduce el codigo de acceso")
  
  }
  return (
    <>
    {loading ? (<div className="uk-flex uk-flex-center uk-flex-middle" uk-spinner="ratio: 3"></div>):(
    <>
    {usuarioGlobal ? (
      <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} imagen={imagen}/>}>
            <Route index element={<App />} />
            <Route path="blogs" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    ) : (
      <div   class="uk-flex uk-flex-column uk-flex-middle uk-flex-center">
       <Login2 user={user} setUser={setUser}/>
       
       
      
      </div>
    )}
    
    </>
    )}
    </>
  );
}

export default Rutas;
