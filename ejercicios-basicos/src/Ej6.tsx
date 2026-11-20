// Ejercicio 6 · Buscador (Filtrado)
// Filtra una lista de lenguajes mientras se escribe, sin distinguir mayúsculas.
import { useState } from "react";

const LENGUAJES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C",
  "C++",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Kotlin",
  "Swift",
];

export function Ej6() {
  //bajo capot
  const [busqueda, setBusqueda] = useState("");

  // La lista filtrada se calcula en cada render, no hace falta guardarla en estado
  const resultados = LENGUAJES.filter((l) =>
    l.toLowerCase().includes(busqueda.toLowerCase())
  );

  //carroceria
  return (
    <div>
      <input
        placeholder="Buscar lenguaje..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <p>
        {resultados.length} resultado{resultados.length === 1 ? "" : "s"}
      </p>
      <ul>
        {resultados.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
}
