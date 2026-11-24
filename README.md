# ClimaApp

Aplicación web para consultar el clima actual de una ciudad. Está desarrollada con **Next.js (App Router)**, **React**, **TypeScript** y **Axios**, y obtiene los datos de [OpenWeatherMap](https://openweathermap.org).

La búsqueda muestra la ciudad, el país, la temperatura en grados Celsius, la humedad y la descripción del clima. Las consultas se realizan en español y las temperaturas se muestran redondeadas.

## Requisitos

- Node.js **20.9.0 o superior** (requerido por Next.js 16).
- npm.
- Una API key de OpenWeatherMap.

## Instalación y ejecución

Desde la raíz del proyecto:

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Crea el archivo local de variables de entorno a partir de la plantilla:

   ```bash
   cp .env.example .env.local
   ```

3. Abre `.env.local` y reemplaza el valor de ejemplo por tu API key:

   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=tu_api_key
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Abre [http://localhost:3000](http://localhost:3000).

No compartas ni subas `.env.local` al repositorio. **Importante:** por el prefijo `NEXT_PUBLIC_`, Next.js expone esta variable en el bundle del navegador; no se debe tratar como una credencial secreta. Usa una API key dedicada y aplica las restricciones disponibles en OpenWeatherMap.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la compilación de producción. |
| `npm start` | Sirve la compilación de producción (ejecutar después de `npm run build`). |
| `npm run lint` | Ejecuta ESLint. |
| `npm test` | Ejecuta las pruebas con Jest. |
| `npm run test:coverage` | Ejecuta las pruebas y genera el reporte de cobertura. |

Las pruebas usan **Jest** y **React Testing Library**. La configuración de cobertura establece un mínimo global del 80 % para ramas, funciones, líneas y sentencias dentro de los archivos incluidos en la configuración de Jest.

## Estructura principal

- `src/app/`: rutas y página principal de Next.js.
- `src/components/clima/`: interfaz de búsqueda y presentación del clima.
- `src/services/`: cliente HTTP y consulta a OpenWeatherMap.
- `src/types/`: tipos de datos de la aplicación.
- `__tests__/`: pruebas de componentes y servicios.
