import { useEffect, useState } from "react";

// GET /user/{id} trae TODOS los datos de un usuario (la lista solo trae id y name)
interface UserDetailData {
  id: number;
  name: string;
  email: string;
  age: number;
  country: { id: number; name: string } | null; // puede no tener país
  roles: { id: number; name: string }[];
}

export function UserDetail({ token, id }: { token: string; id: number }) {
  //bajo capot
  const [user, setUser] = useState<UserDetailData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Cada vez que cambia el id elegido, se vuelve a pedir el detalle.
  // (UserList le pasa key={id}, así al cambiar de usuario el componente arranca de cero)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        setError(data.detail);
        return;
      }
      setUser(data);
    });
  }, [id, token]);

  //carroceria
  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>Cargando...</p>;

  return (
    <div>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Edad: {user.age}</p>
      <p>País: {user.country?.name ?? "Sin país"}</p>
      <p>Roles: {user.roles.map((rol) => rol.name).join(", ")}</p>
    </div>
  );
}
