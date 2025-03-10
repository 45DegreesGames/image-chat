import { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { generateChatResponse } from '../lib/gemini';
import { Image, ChatMessage } from '../types';
import { FiSend, FiImage } from 'react-icons/fi';

interface ChatInterfaceProps {
  chatId: string;
  images: Image[];
}

export default function ChatInterface({ chatId, images }: ChatInterfaceProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cargar mensajes existentes
  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('chat_id', chatId)
          .order('created_at', { ascending: true });

        if (error) {
          throw error;
        }

        setMessages(data || []);
      } catch (err) {
        console.error('Error al cargar mensajes:', err);
      }
    };

    fetchMessages();
  }, [chatId]);

  // Desplazarse al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user || loading) return;

    const userMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      chat_id: chatId,
      role: 'user',
      content: input,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Guardar mensaje del usuario en la base de datos
      const { data: savedMessage, error: saveError } = await supabase
        .from('messages')
        .insert({
          chat_id: chatId,
          role: 'user',
          content: input,
        })
        .select()
        .single();

      if (saveError) {
        throw saveError;
      }

      // Obtener URLs de las imágenes
      const imageUrls = images.map((img) => img.url);

      // Generar respuesta con Gemini
      const response = await generateChatResponse(input, imageUrls);

      // Crear mensaje de respuesta
      const assistantMessage: ChatMessage = {
        id: `temp-response-${Date.now()}`,
        chat_id: chatId,
        role: 'assistant',
        content: response,
        created_at: new Date().toISOString(),
      };

      // Actualizar UI con la respuesta
      setMessages((prev) => [...prev, assistantMessage]);

      // Guardar respuesta en la base de datos
      await supabase.from('messages').insert({
        chat_id: chatId,
        role: 'assistant',
        content: response,
      });
    } catch (err) {
      console.error('Error en el chat:', err);
      // Mostrar mensaje de error en el chat
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          chat_id: chatId,
          role: 'assistant',
          content: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.',
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Imágenes seleccionadas */}
      <div className="flex p-4 space-x-2 overflow-x-auto bg-gray-50">
        {images.map((image) => (
          <div key={image.id} className="flex-shrink-0">
            <img
              src={image.url}
              alt={image.name}
              className="object-cover w-16 h-16 rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <FiImage className="w-12 h-12 mb-4" />
            <p className="text-lg">
              Haz una pregunta sobre las imágenes seleccionadas
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block max-w-3/4 p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Formulario de entrada */}
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Escribe tu pregunta sobre las imágenes..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Procesando
              </span>
            ) : (
              <FiSend />
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 