import logo from "./logo.svg";
import "./App.css";
import {
  createItem,
  deleteItem,
  getFoto,
  getItems,
  updateItem,
  updateItemDate,
  updateItemMoney,
} from "./application/api";
import React, { useEffect, useState } from "react";
import StickyFooter from "./application/StickyFooter";
import * as alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import axios from "axios";
import Pagination from "./Pagination";
import Todos from "./Todo";

function App() {
  const [item, setItem] = useState([]);
  const [item2, setItem2] = useState([]);
  const [objetos, setObjetos] = useState([]);
  const [total, setTotal] = useState(0);
  const [fecha, setFecha] = useState("");
  const [buscador, setBuscador] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(4);
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = objetos
    .filter((word) =>
      word.data().obj.toLowerCase().includes(buscador.toLowerCase())
    )
    .slice(indexOfFirstTodo, indexOfLastTodo);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [loading, setLoading] = useState(false);

  const current = new Date();
  const date = `${current.getFullYear()}/${
    current.getMonth() + 1
  }/${current.getDate()}`;

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const p = await getItems();
    console.log(p.docs[0].id);
    setObjetos(p.docs);
    let valor = 0;
    for (const key of p.docs) {
      console.log(key.data().obj2);

      valor += parseFloat(key.data().obj2);
    }
    setTotal(valor);
  };

  const handleSave = async () => {
    if (item.length == 0 || item2.length == 0) {
      alertify.alert("Rellena los campos.", function () {});
      alertify.error("Rellena los campos");
    } else {
      axios
        .get(
          "https://api.giphy.com/v1/gifs/search?api_key=7gM6DDxpzNDtKV1TFv9yVaJuloTe5HDG&q=" +
            item
        )
        .then((response) => {
          console.log(response.data.data.length);
          let b = "";
          if (response.data.data.length > 0) {
            b = response.data.data[0].images.downsized.url;
          } else {
            b = "";
          }
          createItem(item, item2, date, b);
          alertify.success("Se ha creado correctamente");
          setItem("");
          setItem2("");
          obtenerDatos();
        })
        .catch((e) => console.log(e));
    }
  };
  const handleOrdenarFecha = async () => {
    const p = await getItems();

    setObjetos(
      p.docs.sort(function (c, d) {
        let a = new Date(c.data().obj3);
        let b = new Date(d.data().obj3);
        console.log(a);
        return a - b;
      })
    );
    console.log(objetos[0].data());
  };
  const handleOrdenarFechaInverso = async () => {
    const p = await getItems();

    setObjetos(
      p.docs.sort(function (c, d) {
        let a = new Date(c.data().obj3);
        let b = new Date(d.data().obj3);
        console.log(a);
        return b - a;
      })
    );
    console.log(objetos[0].data());
  };
  const handleOrdenar = async () => {
    const p = await getItems();

    setObjetos(
      p.docs.sort(function (c, d) {
        let a = parseFloat(c.data().obj2);
        let b = parseFloat(d.data().obj2);

        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        // a must be equal to b
        return 0;
      })
    );
    console.log(objetos[0].data());
  };
  const handleOrdenarReverse = async () => {
    const p = await getItems();

    setObjetos(
      p.docs.sort(function (c, d) {
        let a = parseFloat(c.data().obj2);
        let b = parseFloat(d.data().obj2);

        if (a < b) {
          return 1;
        }
        if (a > b) {
          return -1;
        }
        // a must be equal to b
        return 0;
      })
    );
    console.log(objetos[0].data());
  };

  const handleEliminar = (nombre) => {
    alertify.confirm(
      "This is a confirm dialog.",
      function () {
        deleteItem(nombre);
        alertify.success("Ok");
        obtenerDatos();
      },
      function () {
        alertify.error("Cancel");
      }
    );
  };
  const handleEditar = (id, obj) => {
    alertify.prompt(
      "Actualizar datos.",
      obj,
      function (evt, value) {
        alertify.success("Ok: " + value);

        updateItem(id, value);
        obtenerDatos();
      },
      function () {
        alertify.error("Cancel");
      }
    );
  };
  const handleEditar2 = (id, obj3) => {
    alertify.prompt(
      "Actualizar datos.",
      obj3,
      function (evt, value) {
        alertify.success("Ok: " + value);

        updateItemDate(id, value);
        obtenerDatos();
      },
      function () {
        alertify.error("Cancel");
      }
    );
  };
  const handleEditar3 = (id, obj2) => {
    console.log(obj2);
    alertify.prompt(
      "Actualizar datos.",
      obj2,
      function (evt, value) {
        alertify.success("Ok: " + value);

        updateItemMoney(id, value);
        obtenerDatos();
      },
      function () {
        alertify.error("Cancel");
      }
    );
  };
  const handleBuscarFecha = async () => {
    /* console.log(setFecha(nombre)); */
    console.log(fecha.toString());
    const p = await getItems();
    let fecha2 = new Date(fecha);
    const fecha3 = `${fecha2.getFullYear()}/${
      fecha2.getMonth() + 1
    }/${fecha2.getDate()}`;
    console.log(fecha3 + " fecha");
    setObjetos(p.docs.filter((a) => a.data().obj3 == fecha3));
    let valor = 0;
    for (const key of p.docs.filter((a) => a.data().obj3 == fecha3)) {
      console.log(key.data().obj2);

      valor += parseFloat(key.data().obj2);
    }
    setTotal(valor);
  };
  return (
    <div className="fondo uk-flex uk-flex-column  uk-flex-middle">
      <div class="grid"></div>
      <div class="lines"></div>
      <h1>
        <span>Aten</span>
        <span>Aten</span>
      </h1>
      <h2>Finanzas</h2>

      <h3 className="uk-heading uk-text-center uk-text-bold">{date}</h3>

      <div class="uk-card uk-card-small uk-card-default uk-padding uk-margin tarjeta uk-box-shadow-large">
        <input
          className="uk-input uk-margin"
          type="text"
          placeholder="Motivo"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <input
          className="uk-input uk-margin"
          placeholder="Cantidad"
          type="number"
          value={item2}
          onChange={(e) => setItem2(e.target.value)}
        />
        {/*   <button class="uk-button naranja uk-margin" onClick={handleSave}>
          Guardar
        </button> */}
        <div className="uk-flex botones uk-flex-wrap uk-flex-between uk-flex-middle uk-height-medium">
          <button onClick={handleSave} class="btn-glitch-fill">
            <span class="text">// Añadir</span>
            <span class="text-decoration">_</span>
            <span class="decoration">&rArr;</span>
          </button>
          {/* <button class="uk-button naranja uk-margin" onClick={handleOrdenar}>
          Cantidad
        </button> */}
          <button onClick={handleOrdenar} class="btn-glitch-fill">
            <span class="text">// Mas barato</span>
            <span class="text-decoration">_</span>
            <span class="decoration">&rArr;</span>
          </button>
          {/* <button
          class="uk-button naranja uk-margin"
          onClick={handleOrdenarReverse}
        >
          Cantidad
        </button> */}
          <button onClick={handleOrdenarReverse} class="btn-glitch-fill">
            <span class="text">// Mas caro</span>
            <span class="text-decoration">_</span>
            <span class="decoration">&rArr;</span>
          </button>
          {/*  <button
          class="uk-button naranja uk-margin"
          onClick={handleOrdenarFecha}
        >
          Fecha
        </button> */}
          <button onClick={handleOrdenarFecha} class="btn-glitch-fill">
            <span class="text">// Mas antiguo</span>
            <span class="text-decoration">_</span>
            <span class="decoration">&rArr;</span>
          </button>
          {/* <button
          class="uk-button naranja uk-margin"
          onClick={handleOrdenarFechaInverso}
        >
          Fecha
        </button> */}
          <button onClick={handleOrdenarFechaInverso} class="btn-glitch-fill">
            <span class="text">// Mas moderno</span>
            <span class="text-decoration">_</span>
            <span class="decoration">&rArr;</span>
          </button>
          {/*  <button class="uk-button naranja " onClick={obtenerDatos}>
          Reset
        </button> */}
          <button onClick={obtenerDatos} class="btn-glitch-fill">
            <span class="text">// Reset</span>
            <span class="text-decoration">_</span>
            <span class="decoration">&rArr;</span>
          </button>
          {/*   <button
          href="#toggle-animation"
          class="uk-button naranja uk-button-default"
          type="button"
          uk-toggle="target: #toggle-animation; animation: uk-animation-fade"
        >
          Fecha especifica
        </button> */}
          <button
            onClick={handleOrdenar}
            class="btn-glitch-fill"
            href="#toggle-animation"
            type="button"
            uk-toggle="target: #toggle-animation; animation: uk-animation-fade"
          >
            <span class="text">// Fecha Especifica</span>
            <span class="text-decoration">_</span>
            <span class="decoration">&rArr;</span>
          </button>
          <div className="uk-margin" id="toggle-animation">
            {" "}
            <input
              className="uk-input"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              type="date"
            />
            <button
              class="uk-button naranja uk-margin"
              onClick={handleBuscarFecha}
            >
              Buscar
            </button>
          </div>
          {/* <button
          href="#toggle"
          class="uk-button naranja uk-button-default"
          type="button"
          uk-toggle="target: #toggle; animation: uk-animation-fade"
        >
          Buscar por nombre
        </button> */}
          <button
            class="btn-glitch-fill"
            href="#toggle"
            type="button"
            uk-toggle="target: #toggle; animation: uk-animation-fade"
          >
            <span class="text">// Buscar por nombre</span>
            <span class="text-decoration">_</span>
            <span class="decoration">&rArr;</span>
          </button>
        </div>
        <div className="uk-margin" id="toggle">
          {" "}
          <input
            className="uk-input"
            placeholder="Buscar por nombre"
            onChange={(e) => setBuscador(e.target.value)}
            type="string"
          />
        </div>
        <div class="uk-overflow-auto">
          <Todos
            todos={currentTodos}
            loading={loading}
            handleEliminar={handleEliminar}
            handleEditar={handleEditar}
            handleEditar2={handleEditar2}
            handleEditar3={handleEditar3}
          />
        </div>
        <Pagination
          todosPerPage={todosPerPage}
          totalTodos={objetos.length}
          paginate={paginate}
        />
        <h1 class="uk-heading-divider"></h1>
        <p>Tus ingresos totales son: {total}€</p>
        <button
          type="button"
          uk-toggle="target: #offcanvas-flip"
          class="btn-glitch-fill"
        >
          <span class="text">// Contacto con el desarrollador</span>
          <span class="text-decoration">_</span>
          <span class="decoration">&rArr;</span>
        </button>

        <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
          <div class="uk-offcanvas-bar">
            <button class="uk-offcanvas-close" type="button" uk-close></button>

            <h3>Contacto</h3>

            <form
              target="_blank"
              action="https://formsubmit.co/pabloatenciano@gmail.com"
              method="POST"
            >
              <input
                type="text"
                name="name"
                class="uk-input uk-margin"
                placeholder="Nombre"
                required
              />

              <input
                type="email"
                name="email"
                class="uk-input uk-margin"
                placeholder="Email"
                required
              />
<input type="hidden" name="_captcha" value="false"></input>

<input type="hidden" name="_next" value="https://pabloaten.github.io/controldedinero/" />

              <textarea
                placeholder="Tu mensaje"
                class="uk-input uk-margin"
                name="message"
                rows="10"
                required
              ></textarea>
              <button type="submit" class="btn-glitch-fill amarillo uk-margin uk-height-1-1">
                <span class="text">// Enviar</span>
                <span class="text-decoration">_</span>
                <span class="decoration">&rArr;</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
