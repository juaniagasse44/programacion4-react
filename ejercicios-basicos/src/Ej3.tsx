// Ejercicio 3 · Mostrar y ocultar (Condicionales)
// La respuesta arranca oculta; un botón la alterna y cambia su propio texto.
import { useState } from "react";

export function Ej3() {
  //bajo capot
  const [visible, setVisible] = useState(false);

  //carroceria
  return (
    <div className="tarjeta">
      <p>
        <strong>¿Qué hook se usa para guardar estado en un componente?</strong>
      </p>
      {/* && : si visible es true se dibuja el párrafo, si es false no se dibuja nada */}
      {visible && <p>useState</p>}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Ocultar respuesta" : "Mostrar respuesta"}
      </button>
    </div>
  );
}
