# Image Chat

Una aplicación web que te permite chatear con tus imágenes utilizando IA.

## Características

- Autenticación de usuarios con Supabase
- Subida de imágenes
- Chat con imágenes utilizando la API de Gemini
- Interfaz de usuario moderna con soporte para tema oscuro

## Tecnologías utilizadas

- Next.js 14 con App Router
- TypeScript
- Tailwind CSS
- Supabase (autenticación, base de datos y almacenamiento)
- Google Gemini API (modelo gemini-2.0-flash-exp)
- React Dropzone para subida de imágenes

## Requisitos previos

- Node.js 18 o superior
- Cuenta en Supabase
- Cuenta en Google Cloud (para la API de Gemini)

## Configuración

1. Clona este repositorio:
   ```bash
   git clone https://github.com/yourusername/image-chat.git
   cd image-chat
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
   NEXT_PUBLIC_GEMINI_API_KEY=tu_clave_api_de_gemini
   ```

4. Configura Supabase para la autenticación:
   - Sigue las instrucciones en el archivo `supabase/README.md` para configurar la autenticación en Supabase.
   - Ejecuta el script SQL en `supabase/setup.sql` para configurar las tablas y políticas de seguridad.

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Solución de problemas de autenticación

Si tienes problemas con la autenticación, asegúrate de:

1. Haber ejecutado el script SQL en `supabase/setup.sql` para configurar la autenticación sin confirmación de correo electrónico.
2. Haber configurado correctamente las variables de entorno en `.env.local`.
3. Verificar en la consola del navegador si hay errores relacionados con Supabase.

## Construcción para producción

Para construir la aplicación para producción:

```bash
npm run build
```

Para iniciar la aplicación en modo producción:

```bash
npm start
```

## Estructura del proyecto

```
image-chat/
├── src/
│   ├── app/                  # Páginas de Next.js
│   ├── components/           # Componentes React
│   ├── context/              # Contextos de React
│   ├── lib/                  # Utilidades y configuración
│   └── types/                # Definiciones de tipos
├── public/                   # Archivos estáticos
├── supabase/                 # Configuración de Supabase
└── ...
```

## Flujo de la aplicación

1. El usuario accede a la aplicación y se autentica
2. En el dashboard, el usuario puede:
   - Subir nuevas imágenes
   - Iniciar un nuevo chat seleccionando imágenes
   - Ver chats anteriores
3. En la interfaz de chat, el usuario puede hacer preguntas sobre las imágenes seleccionadas
4. La API de Gemini procesa las imágenes y la pregunta, y genera una respuesta

## Licencia

MIT
