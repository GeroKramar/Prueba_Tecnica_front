
# Rick and Morty Frontend

Este es el frontend de la aplicación de personajes de Rick and Morty, desarrollado en **Next.js** con **TypeScript** y **Tailwind CSS**. Aquí puedes ver la lista de personajes, crear nuevos personajes, buscar entre ellos y ver detalles individuales de cada uno.

## Tecnologías
- **Next.js**: Framework de React para el desarrollo web.
- **TypeScript**: Para tipos estáticos.
- **Tailwind CSS**: Framework de CSS para estilos rápidos.
- **SweetAlert2**: Alertas atractivas para confirmar acciones.
- **Vercel**: Despliegue de la aplicación.

## Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/GeroKramar/Prueba_Tecnica_front

2. Instalar dependencias:
    ```bash
    cd front
    npm install
3. Crear un archivo .env.local en el directorio raíz y agregar la URL de tu backend
    ```bash
    NEXT_PUBLIC_API_URL=https://tu-backend-url

4. Iniciar el servidor:
    ```bash
    npm run dev

#### La app estará disponible en http://localhost:3001.

## Scripts
- npm run dev: Ejecuta la app en modo desarrollo.
- npm run build: Construye la app para producción.
- npm start: Inicia la app en producción.
### Funcionalidades
- Ver lista de personajes.
- Crear nuevos personajes.
- Buscar personajes.
- Ver detalles de un personaje específico.
- Eliminar personajes.