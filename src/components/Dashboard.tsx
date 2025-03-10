import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Chat, Image } from '../types';
import ImageUploader from './ImageUploader';
import ImageSelector from './ImageSelector';
import ChatInterface from './ChatInterface';
import { FiUpload, FiMessageSquare, FiLogOut } from 'react-icons/fi';

enum DashboardView {
  MAIN,
  UPLOAD_IMAGE,
  SELECT_IMAGES,
  CHAT,
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [view, setView] = useState<DashboardView>(DashboardView.MAIN);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchChats = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('chats')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setChats(data || []);
      } catch (err) {
        console.error('Error al cargar chats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [user]);

  const handleUploadSuccess = () => {
    setView(DashboardView.MAIN);
  };

  const handleImagesSelected = async (images: Image[]) => {
    try {
      setSelectedImages(images);
      
      // Crear un nuevo chat
      const { data, error } = await supabase
        .from('chats')
        .insert({
          user_id: user?.id,
          title: `Chat con ${images.length} ${images.length === 1 ? 'imagen' : 'imágenes'}`,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Asociar imágenes con el chat
      const chatImageRelations = images.map((image) => ({
        chat_id: data.id,
        image_id: image.id,
      }));

      const { error: relationError } = await supabase
        .from('chat_images')
        .insert(chatImageRelations);

      if (relationError) {
        throw relationError;
      }

      // Actualizar el chat actual con las imágenes
      const newChat: Chat = {
        ...data,
        images,
        messages: [],
      };

      setCurrentChat(newChat);
      setChats([newChat, ...chats]);
      setView(DashboardView.CHAT);
    } catch (err) {
      console.error('Error al crear chat:', err);
    }
  };

  const renderView = () => {
    switch (view) {
      case DashboardView.UPLOAD_IMAGE:
        return <ImageUploader onUploadSuccess={handleUploadSuccess} />;
      case DashboardView.SELECT_IMAGES:
        return <ImageSelector onImagesSelected={handleImagesSelected} />;
      case DashboardView.CHAT:
        return currentChat ? (
          <ChatInterface chatId={currentChat.id} images={selectedImages} />
        ) : null;
      case DashboardView.MAIN:
      default:
        return (
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                ¡Bienvenido a Image Chat!
              </h1>
              <p className="mt-2 text-gray-600">
                Sube imágenes y chatea con IA sobre ellas
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <button
                onClick={() => setView(DashboardView.UPLOAD_IMAGE)}
                className="flex items-center justify-center p-6 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                <FiUpload className="mr-2" />
                Subir Imagen
              </button>
              <button
                onClick={() => setView(DashboardView.SELECT_IMAGES)}
                className="flex items-center justify-center p-6 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                <FiMessageSquare className="mr-2" />
                Nuevo Chat
              </button>
            </div>

            {chats.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                  Chats recientes
                </h2>
                <div className="space-y-2">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => {
                        setCurrentChat(chat);
                        setSelectedImages(chat.images || []);
                        setView(DashboardView.CHAT);
                      }}
                      className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <div className="font-medium">{chat.title}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(chat.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 bg-white border-b">
        <div className="text-xl font-bold text-indigo-600">Image Chat</div>
        {view !== DashboardView.MAIN && (
          <button
            onClick={() => setView(DashboardView.MAIN)}
            className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
          >
            Volver al Dashboard
          </button>
        )}
        <button
          onClick={signOut}
          className="flex items-center px-3 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50"
        >
          <FiLogOut className="mr-1" />
          Cerrar sesión
        </button>
      </header>
      <main className="flex-1 overflow-auto">{renderView()}</main>
    </div>
  );
} 