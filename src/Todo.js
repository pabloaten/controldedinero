import React from "react";
const Todos = ({ todos, loading, handleEliminar,handleEditar }) => {
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
              class="uk-button uk-button-primary rojo"
              onClick={() => handleEditar(o.id)}
            >
              <span uk-icon="heart"></span>
            </button>
          </td>
        </tr>
      ))}
    </table>
  );
};
export default Todos;
