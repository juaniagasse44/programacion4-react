import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import { UserDetail } from "./UserDetail";

interface User {
  id: number;
  name: string;
}

// Paso 6: el usuario logueado
type Me = User;

export function UserList({ token }: { token: string }) {
  //bajo capot
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [me, setMe] = useState<Me | null>(null);
  // Práctica 2: true mientras esperamos la respuesta de la API
  const [loading, setLoading] = useState(true);
  // Práctica 1: el id del usuario elegido. null = no hay ninguno elegido
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // Práctica 3: lo que se escribe en el buscador
  const [search, setSearch] = useState("");

  // Práctica 3: la ruta que estamos mostrando (/user o /user/search/...).
  // Cada vez que cambia, el useEffect vuelve a pedir la lista.
  const [path, setPath] = useState("/user");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          setError(data.detail); // 401, 403, 404…: viene un objeto { detail }
          return;
        }
        setUsers(data); // 200: recién acá es una lista
      })
      .catch(() => setError("No se pudo conectar con el servidor"))
      .finally(() => setLoading(false)); // haya salido bien o mal, ya no está cargando
  }, [token, path]);

  // Cambia la ruta a pedir y deja todo listo para mostrar "Cargando..."
  function changePath(newPath: string) {
    if (newPath === path) return;
    setLoading(true);
    setError(null);
    setPath(newPath);
  }

  function handleSearch(evento: SubmitEvent) {
    evento.preventDefault();
    if (search.trim() === "") return;
    // encodeURIComponent: un "#" o un "/" en el nombre romperían la URL si no lo usamos
    changePath(`/user/search/${encodeURIComponent(search.trim())}`);
  }

  function handleClear() {
    setSearch("");
    changePath("/user");
  }

  // Paso 6: el token no trae el nombre. GET /user/me/id devuelve mi id,
  // y con ese id pedimos mis datos a GET /user/{id}.
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    const api = import.meta.env.VITE_API_URL;
    fetch(`${api}/user/me/id`, { headers })
      .then(async (response) => {
        if (!response.ok) return;
        const { id } = await response.json();
        const response2 = await fetch(`${api}/user/${id}`, { headers });
        if (response2.ok) setMe(await response2.json());
      })
      .catch(() => {}); // si la API no responde, el saludo queda sin nombre
  }, [token]);

  const greeting = me ? `Hola, ${me.name}` : "Hola";

  //carroceria
  return (
    <>
      <h2>{greeting}</h2>
      <div className="columnas">
        <div className="caja">
          <h3>Usuarios</h3>

          <form onSubmit={handleSearch}>
            <input
              placeholder="Buscar por nombre"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Buscar</button>
            <button type="button" onClick={handleClear}>
              Limpiar
            </button>
          </form>

          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : users.length === 0 ? (
            <p>No se encontraron usuarios.</p>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <button
                    className="link"
                    onClick={() => setSelectedId(user.id)}
                  >
                    {user.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="caja">
          {selectedId === null ? (
            <p>Hacé clic en un usuario para ver su detalle.</p>
          ) : (
            <UserDetail key={selectedId} token={token} id={selectedId} />
          )}
        </div>
      </div>
    </>
  );
}
