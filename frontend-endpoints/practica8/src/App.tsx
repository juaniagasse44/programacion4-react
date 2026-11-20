import { useCallback, useState } from "react";
import type { SubmitEvent } from "react";
import { UserList } from "./UserList";

export default function App() {
  //bajo capot
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  // El token arranca con lo que haya en localStorage: así la sesión sobrevive a un F5
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  // Práctica 8: si cualquier pedido responde 401, se cierra la sesión con un aviso.
  // useCallback hace que la función sea siempre la misma entre renders, así
  // los useEffect de los hijos que dependen de ella no se vuelven a ejecutar de más.
  const handleUnauthorized = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setError("Tu sesión venció");
  }, []);

  async function handleSubmit(evento: SubmitEvent) {
    evento.preventDefault();
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.detail);
        return;
      }
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } catch {
      setError("No se pudo conectar con el servidor");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  //carroceria
  if (token) {
    return (
      <main>
        <div className="salir">
          <button onClick={logout}>Salir</button>
        </div>
        <UserList token={token} onUnauthorized={handleUnauthorized} />
      </main>
    );
  }

  return (
    <main>
      <div className="caja">
        <h2>Ingresar</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Ingresar</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </main>
  );
}
