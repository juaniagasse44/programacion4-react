// Ejercicio 1 · Tarjetas de producto (Props)
// Un componente Producto que recibe nombre, precio y stock por props.
// Si el stock es 0, en lugar de la cantidad muestra "Sin stock".

function Producto({
  nombre,
  precio,
  stock,
}: {
  nombre: string;
  precio: number;
  stock: number;
}) {
  return (
    <div className="tarjeta">
      <h3>{nombre}</h3>
      <p>Precio: ${precio}</p>
      {/* Ternario: si no hay stock, mostramos el aviso; si no, la cantidad */}
      <p>{stock === 0 ? "Sin stock" : `Stock: ${stock}`}</p>
    </div>
  );
}

export function Ej1() {
  // Usamos el mismo componente tres veces con datos distintos
  return (
    <div className="fila">
      <Producto nombre="Teclado" precio={25000} stock={8} />
      <Producto nombre="Mouse" precio={12000} stock={0} />
      <Producto nombre="Monitor" precio={180000} stock={3} />
    </div>
  );
}
