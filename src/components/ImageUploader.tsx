import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { FiUpload } from 'react-icons/fi';

interface ImageUploaderProps {
  onUploadSuccess: () => void;
}

export default function ImageUploader({ onUploadSuccess }: ImageUploaderProps) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!user) {
        setError('Debes iniciar sesión para subir imágenes');
        return;
      }

      // Validar archivos
      const invalidFiles = acceptedFiles.filter(
        (file) => !file.type.startsWith('image/')
      );

      if (invalidFiles.length > 0) {
        setError('Solo se permiten archivos de imagen');
        return;
      }

      setUploading(true);
      setError(null);

      try {
        // Subir cada imagen a Supabase Storage
        for (const file of acceptedFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          const filePath = `${user.id}/${fileName}`;

          // Subir archivo a Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, file);

          if (uploadError) {
            throw uploadError;
          }

          // Obtener URL pública
          const { data: urlData } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

          // Guardar metadatos en la base de datos
          const { error: dbError } = await supabase.from('images').insert({
            user_id: user.id,
            url: urlData.publicUrl,
            name: file.name,
          });

          if (dbError) {
            throw dbError;
          }
        }

        onUploadSuccess();
      } catch (err) {
        console.error('Error al subir imagen:', err);
        setError('Error al subir la imagen. Inténtalo de nuevo.');
      } finally {
        setUploading(false);
      }
    },
    [user, onUploadSuccess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    disabled: uploading,
  });

  return (
    <div className="w-full max-w-md p-6 mx-auto">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg cursor-pointer ${
          isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
          <FiUpload className="w-12 h-12 mb-4 text-gray-400" />
          <p className="mb-2 text-lg font-medium text-gray-700">
            {isDragActive
              ? 'Suelta la imagen aquí'
              : 'Arrastra y suelta una imagen, o haz clic para seleccionar'}
          </p>
          <p className="text-sm text-gray-500">
            Formatos soportados: JPG, PNG, GIF
          </p>
          {uploading && <p className="mt-2 text-indigo-600">Subiendo...</p>}
        </div>
      </div>

      {error && (
        <div className="p-4 mt-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
} 