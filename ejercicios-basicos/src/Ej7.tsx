// Ejercicio 7 · Tipar con TypeScript
// El Producto del ejercicio 1, ahora con una interface y una prop opcional "oferta".

interface ProductoProps {
  nombre: string;
  precio: number;
  stock: number;
  oferta?: boolean; // el "?" la hace opcional: si no se pasa, vale undefined
}

function Producto({ nombre, precio, stock, oferta }: ProductoProps) {
  return (
    <div className="tarjeta">
      <h3>{nombre}</h3>
      {oferta && <p className="aviso">¡Oferta!</p>}
      <p>Precio: ${precio}</p>
      <p>{stock === 0 ? "Sin stock" : `Stock: ${stock}`}</p>
    </div>
  );
}

export function Ej7() {
  return (
    <div className="fila">
      <Producto nombre="Teclado" precio={25000} stock={8} oferta />
      <Producto nombre="Mouse" precio={12000} stock={0} />
      <Producto nombre="Monitor" precio={180000} stock={3} oferta={false} />
    </div>
  );
}
