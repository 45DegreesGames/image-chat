import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Image } from '../types';
import { FiCheck } from 'react-icons/fi';

interface ImageSelectorProps {
  onImagesSelected: (images: Image[]) => void;
}

export default function ImageSelector({ onImagesSelected }: ImageSelectorProps) {
  const { user } = useAuth();
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchImages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('images')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setImages(data || []);
      } catch (err) {
        console.error('Error al cargar imágenes:', err);
        setError('No se pudieron cargar las imágenes');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [user]);

  const toggleImageSelection = (image: Image) => {
    if (selectedImages.some((img) => img.id === image.id)) {
      setSelectedImages(selectedImages.filter((img) => img.id !== image.id));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleSubmit = () => {
    if (selectedImages.length === 0) {
      setError('Selecciona al menos una imagen');
      return;
    }
    onImagesSelected(selectedImages);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Cargando imágenes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
        {error}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4 text-lg text-gray-700">
          No tienes imágenes subidas. Sube algunas imágenes primero.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Selecciona imágenes para tu chat
      </h2>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {images.map((image) => {
          const isSelected = selectedImages.some((img) => img.id === image.id);
          return (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-lg cursor-pointer border-2 ${
                isSelected ? 'border-indigo-500' : 'border-transparent'
              }`}
              onClick={() => toggleImageSelection(image)}
            >
              <img
                src={image.url}
                alt={image.name}
                className="object-cover w-full h-32"
              />
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center bg-indigo-500 bg-opacity-30">
                  <FiCheck className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          disabled={selectedImages.length === 0}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          Continuar con {selectedImages.length} {selectedImages.length === 1 ? 'imagen' : 'imágenes'}
        </button>
      </div>
    </div>
  );
} 