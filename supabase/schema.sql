-- Crear tabla para almacenar imágenes
CREATE TABLE IF NOT EXISTS public.images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla para almacenar chats
CREATE TABLE IF NOT EXISTS public.chats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla para almacenar mensajes
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_id UUID NOT NULL REFERENCES public.chats(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla para relación muchos a muchos entre chats e imágenes
CREATE TABLE IF NOT EXISTS public.chat_images (
  chat_id UUID NOT NULL REFERENCES public.chats(id) ON DELETE CASCADE,
  image_id UUID NOT NULL REFERENCES public.images(id) ON DELETE CASCADE,
  PRIMARY KEY (chat_id, image_id)
);

-- Crear políticas de seguridad para imágenes
CREATE POLICY "Usuarios pueden ver sus propias imágenes" ON public.images
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden insertar sus propias imágenes" ON public.images
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden actualizar sus propias imágenes" ON public.images
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden eliminar sus propias imágenes" ON public.images
  FOR DELETE USING (auth.uid() = user_id);

-- Crear políticas de seguridad para chats
CREATE POLICY "Usuarios pueden ver sus propios chats" ON public.chats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden insertar sus propios chats" ON public.chats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden actualizar sus propios chats" ON public.chats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden eliminar sus propios chats" ON public.chats
  FOR DELETE USING (auth.uid() = user_id);

-- Crear políticas de seguridad para mensajes
CREATE POLICY "Usuarios pueden ver mensajes de sus propios chats" ON public.messages
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM public.chats WHERE id = chat_id
    )
  );

CREATE POLICY "Usuarios pueden insertar mensajes en sus propios chats" ON public.messages
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM public.chats WHERE id = chat_id
    )
  );

-- Crear políticas de seguridad para relaciones chat_images
CREATE POLICY "Usuarios pueden ver relaciones de sus propios chats" ON public.chat_images
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM public.chats WHERE id = chat_id
    )
  );

CREATE POLICY "Usuarios pueden insertar relaciones en sus propios chats" ON public.chat_images
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM public.chats WHERE id = chat_id
    )
  );

-- Habilitar RLS en todas las tablas
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_images ENABLE ROW LEVEL SECURITY;

-- Crear bucket para almacenar imágenes
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Crear políticas de seguridad para el bucket de imágenes
CREATE POLICY "Acceso público a imágenes" ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

CREATE POLICY "Usuarios pueden subir sus propias imágenes" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'images' AND
    auth.uid() = (storage.foldername(name))[1]::uuid
  );

CREATE POLICY "Usuarios pueden actualizar sus propias imágenes" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'images' AND
    auth.uid() = (storage.foldername(name))[1]::uuid
  );

CREATE POLICY "Usuarios pueden eliminar sus propias imágenes" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'images' AND
    auth.uid() = (storage.foldername(name))[1]::uuid
  ); 