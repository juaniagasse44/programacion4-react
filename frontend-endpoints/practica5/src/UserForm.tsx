import { useState } from "react";
import type { SubmitEvent } from "react";

// Práctica 5: formulario de alta de usuario (POST /user)
export function UserForm({
  token,
  onCreated,
}: {
  token: string;
  onCreated: () => void; // le avisa a UserList que actualice la lista
}) {
  //bajo capot
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryId, setCountryId] = useState("1");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(evento: SubmitEvent) {
    evento.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          age: Number(age), // los inputs dan texto: la API espera números
          email,
          password,
          country_id: Number(countryId),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        // Si es un error de validación (422), detail viene como lista de errores
        setError(
          Array.isArray(data.detail)
            ? data.detail.map((d: { msg: string }) => d.msg).join(", ")
            : data.detail,
        );
        return;
      }
      setMessage(data.message ?? `Usuario ${name} creado`);
      setName("");
      setAge("");
      setEmail("");
      setPassword("");
      onCreated();
    } catch {
      setError("No se pudo conectar con el servidor");
    }
  }

  //carroceria
  return (
    <div className="caja">
      <h3>Nuevo usuario</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Edad"
          required
          min={0}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          required
          minLength={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* No hay endpoint de países: las opciones van escritas a mano */}
        <select
          value={countryId}
          onChange={(e) => setCountryId(e.target.value)}
        >
          <option value="1">Argentina</option>
          <option value="2">Brasil</option>
        </select>
        <button type="submit">Crear</button>
      </form>
      {error && <p className="error">{error}</p>}
      {message && <p className="ok">{message}</p>}
    </div>
  );
}
