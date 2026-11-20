// Ejercicio 5 · Lista de compras (Listas y estado)
// Agregar ítems, eliminarlos, no permitir vacíos y avisar cuando la lista está vacía.
import { useState } from "react";

interface Item {
  id: number;
  texto: string;
}

export function Ej5() {
  //bajo capot
  const [items, setItems] = useState<Item[]>([]);
  const [texto, setTexto] = useState("");

  function agregar() {
    const limpio = texto.trim();
    if (limpio === "") return; // no se agregan ítems vacíos
    // Nunca push: creamos un array nuevo con lo anterior + el nuevo ítem
    setItems([...items, { id: Date.now(), texto: limpio }]);
    setTexto("");
  }

  function eliminar(id: number) {
    // filter devuelve un array nuevo sin el ítem que queremos sacar
    setItems(items.filter((i) => i.id !== id));
  }

  //carroceria
  return (
    <div>
      <input
        placeholder="¿Qué hay que comprar?"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregar()}
      />
      <button onClick={agregar}>Agregar</button>

      {items.length === 0 ? (
        <p>No hay nada para comprar</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.texto}{" "}
              <button onClick={() => eliminar(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
