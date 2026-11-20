// App muestra los siete ejercicios, cada uno con un título que lo identifica.
import { Ej1 } from "./Ej1";
import { Ej2 } from "./Ej2";
import { Ej3 } from "./Ej3";
import { Ej4 } from "./Ej4";
import { Ej5 } from "./Ej5";
import { Ej6 } from "./Ej6";
import { Ej7 } from "./Ej7";

export default function App() {
  return (
    <main>
      <h1>React desde cero · Ejercicios</h1>

      <section>
        <h2>Ejercicio 1 · Tarjetas de producto</h2>
        <Ej1 />
      </section>

      <section>
        <h2>Ejercicio 2 · Contador con límites</h2>
        <Ej2 />
      </section>

      <section>
        <h2>Ejercicio 3 · Mostrar y ocultar</h2>
        <Ej3 />
      </section>

      <section>
        <h2>Ejercicio 4 · Conversor de temperatura</h2>
        <Ej4 />
      </section>

      <section>
        <h2>Ejercicio 5 · Lista de compras</h2>
        <Ej5 />
      </section>

      <section>
        <h2>Ejercicio 6 · Buscador</h2>
        <Ej6 />
      </section>

      <section>
        <h2>Ejercicio 7 · Tipar con TypeScript</h2>
        <Ej7 />
      </section>
    </main>
  );
}
