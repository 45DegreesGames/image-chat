-- Configuración de autenticación en Supabase para Image Chat

-- 1. Configurar la autenticación para permitir registro sin confirmación de correo electrónico
UPDATE auth.config
SET confirm_email_identity_verification = false,
    enable_signup = true;

-- 2. Crear tabla para almacenar información de usuarios
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Crear función para manejar nuevos usuarios
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Crear trigger para manejar nuevos usuarios
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Crear tabla para almacenar imágenes
CREATE TABLE IF NOT EXISTS public.images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  content_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. Crear tabla para almacenar conversaciones
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  image_id UUID REFERENCES public.images(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. Crear tabla para almacenar mensajes
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_user BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. Configurar políticas de seguridad (RLS)

-- Habilitar RLS en todas las tablas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Los usuarios pueden ver su propio perfil" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Políticas para images
CREATE POLICY "Los usuarios pueden ver sus propias imágenes" 
  ON public.images FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden insertar sus propias imágenes" 
  ON public.images FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus propias imágenes" 
  ON public.images FOR DELETE 
  USING (auth.uid() = user_id);

-- Políticas para conversations
CREATE POLICY "Los usuarios pueden ver sus propias conversaciones" 
  ON public.conversations FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden insertar sus propias conversaciones" 
  ON public.conversations FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden actualizar sus propias conversaciones" 
  ON public.conversations FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus propias conversaciones" 
  ON public.conversations FOR DELETE 
  USING (auth.uid() = user_id);

-- Políticas para messages
CREATE POLICY "Los usuarios pueden ver mensajes de sus conversaciones" 
  ON public.messages FOR SELECT 
  USING (auth.uid() IN (
    SELECT user_id FROM public.conversations WHERE id = conversation_id
  ));

CREATE POLICY "Los usuarios pueden insertar mensajes en sus conversaciones" 
  ON public.messages FOR INSERT 
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM public.conversations WHERE id = conversation_id
  ));

-- 9. Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_images_user_id ON public.images(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON public.conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_image_id ON public.conversations(image_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);

-- 10. Crear función RPC para obtener la configuración de autenticación
CREATE OR REPLACE FUNCTION public.get_auth_settings()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  settings jsonb;
BEGIN
  SELECT jsonb_build_object(
    'confirm_email_identity_verification', confirm_email_identity_verification,
    'enable_signup', enable_signup
  ) INTO settings
  FROM auth.config;
  
  RETURN settings;
END;
$$; 