# Image Chat

Una aplicación SAAS que permite a los usuarios subir imágenes y chatear con IA sobre ellas utilizando la API de Gemini.

## Características

- Autenticación de usuarios con Supabase
- Subida de imágenes a Supabase Storage
- Chat con IA sobre imágenes utilizando Gemini API
- Interfaz de usuario moderna y responsive

## Tecnologías utilizadas

- Next.js 14 con App Router
- TypeScript
- Tailwind CSS
- Supabase (autenticación, base de datos y almacenamiento)
- Google Gemini API (modelo gemini-2.0-flash-exp)
- React Dropzone para subida de imágenes

## Requisitos previos

- Node.js 18 o superior
- Cuenta de Supabase
- Clave de API de Google Gemini

## Configuración

1. Clona este repositorio:

```bash
git clone https://github.com/tu-usuario/image-chat.git
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

4. Configura la base de datos de Supabase ejecutando el script SQL en `supabase/schema.sql` en el editor SQL de Supabase.

5. Inicia el servidor de desarrollo:

```bash
npm run dev
```

6. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

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
