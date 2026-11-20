# Programación IV · TP-final Frontend

- `ejercicios-basicos/`: los 7 ejercicios de "React desde cero" (Vite + TypeScript), de `src/Ej1.tsx` a `src/Ej7.tsx`.
- `frontend-endpoints/practica1` … `practica8`: la práctica de endpoints. Cada carpeta es un proyecto completo con todo lo resuelto hasta esa práctica inclusive.

## Cómo correr las prácticas de endpoints

1. Levantar la API de la materia (`clase-1-sqlmodel`) en `http://localhost:8000`.
2. En la práctica que se quiera probar:

```bash
cp .env.example .env
npm install
npm run dev
```

3. Abrir <http://localhost:5174> (ese puerto tiene que coincidir con `allow_origins` de la API).

Usuarios de prueba, con contraseña `123`: `mgomez@email.com` (ADMIN) y `sfer@email.com` (REGULAR).

## Cómo correr los ejercicios básicos

```bash
cd ejercicios-basicos
npm install
npm run dev
```
