// Ejercicio 4 · Conversor de temperatura (Inputs controlados)
// Se escribe en Celsius y debajo se ve Fahrenheit mientras se escribe.
import { useState } from "react";

export function Ej4() {
  //bajo capot
  // El valor de un input siempre es texto, por eso el estado es string
  const [celsius, setCelsius] = useState("");

  // Fahrenheit NO necesita estado propio: se calcula a partir de celsius en cada render
  const c = Number(celsius);
  const fahrenheit = (c * 9) / 5 + 32;

  //carroceria
  return (
    <div>
      <input
        type="number"
        placeholder="Grados Celsius"
        value={celsius}
        onChange={(e) => setCelsius(e.target.value)}
      />
      {celsius !== "" && (
        <>
          <p>
            {c} °C = {fahrenheit.toFixed(1)} °F
          </p>
          {c > 30 && <p className="aviso">Hace calor</p>}
        </>
      )}
    </div>
  );
}
