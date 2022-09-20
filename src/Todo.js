import React from "react";
const Todos = ({ todos, loading, handleEliminar,handleEditar,handleEditar2,handleEditar3 }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <table className="uk-table ">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Fecha</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>

      {todos.map((o) => (
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
          <td>
            <button
              class="uk-button uk-button-primary rojo"
              onClick={() => handleEliminar(o.id)}
            >
              <span uk-icon="trash"></span>
            </button>
            <button
              class="uk-button uk-button-secondary"
              onClick={() => handleEditar(o.id,o.data().obj)}
            ><span uk-icon="pencil"></span></button>
            <br></br>
                 <button
              class="uk-button uk-button-secondary azul"
              onClick={() => handleEditar2(o.id,o.data().obj3)}
            ><span uk-icon="calendar"></span>
                </button>
                 <button
              class="uk-button uk-button-secondary verde"
              onClick={() => handleEditar3(o.id,o.data().obj2)}
            ><span uk-icon="credit-card"></span></button>
           
              
            
          </td>
        </tr>
      ))}
    </table>
  );
};
export default Todos;
