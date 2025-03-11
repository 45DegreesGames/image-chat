# Configuración de Supabase para Image Chat

Este directorio contiene los scripts SQL necesarios para configurar la base de datos de Supabase para la aplicación Image Chat.

## Configuración de autenticación

El archivo `setup.sql` contiene el script SQL necesario para configurar la autenticación en Supabase sin requerir verificación de correo electrónico, así como las tablas y políticas de seguridad necesarias para la aplicación.

## Cómo ejecutar el script SQL en Supabase

1. Inicia sesión en tu cuenta de Supabase: https://app.supabase.io/
2. Selecciona tu proyecto
3. Ve a la sección "SQL Editor" en el menú lateral
4. Crea un nuevo script SQL
5. Copia y pega el contenido del archivo `setup.sql` en el editor
6. Haz clic en "Run" para ejecutar el script

## Configuración adicional en Supabase

### Configuración de autenticación

1. Ve a la sección "Authentication" en el menú lateral
2. Haz clic en "Settings"
3. En la pestaña "Email", asegúrate de que:
   - "Enable Email Signup" esté activado
   - "Confirm Email" esté desactivado (esto evitará que se requiera confirmación por correo electrónico)

### Configuración de almacenamiento

1. Ve a la sección "Storage" en el menú lateral
2. Crea un nuevo bucket llamado "images"
3. En la configuración del bucket, asegúrate de que:
   - "Public" esté desactivado (para que las imágenes sean privadas)
   - "RLS" esté activado (para aplicar políticas de seguridad)

4. Crea las siguientes políticas de seguridad para el bucket "images":
   - Política para SELECT: `auth.uid() = owner`
   - Política para INSERT: `auth.uid() = owner`
   - Política para UPDATE: `auth.uid() = owner`
   - Política para DELETE: `auth.uid() = owner`

## Verificación

Después de ejecutar el script y configurar Supabase, deberías poder:

1. Registrarte en la aplicación sin necesidad de confirmar tu correo electrónico
2. Iniciar sesión con tu correo electrónico y contraseña
3. Subir imágenes y chatear con ellas

Si sigues teniendo problemas, verifica los logs de Supabase para identificar posibles errores. 