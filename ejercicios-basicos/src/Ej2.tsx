// Ejercicio 2 · Contador con límites (useState)
// Va de 0 a 10. Nunca se sale del rango y los botones se deshabilitan en los límites.
import { useState } from "react";

const MIN = 0;
const MAX = 10;

export function Ej2() {
  //bajo capot
  const [valor, setValor] = useState(MIN);

  function restar() {
    if (valor > MIN) setValor(valor - 1);
  }

  function sumar() {
    if (valor < MAX) setValor(valor + 1);
  }

  function reiniciar() {
    setValor(MIN);
  }

  //carroceria
  return (
    <div>
      <p className="numero">{valor}</p>
      <button onClick={restar} disabled={valor === MIN}>
        −
      </button>
      <button onClick={sumar} disabled={valor === MAX}>
        +
      </button>
      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  );
}
