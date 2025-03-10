'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { FiImage, FiMessageSquare, FiLock } from 'react-icons/fi';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // No renderizar nada hasta que el componente esté montado en el cliente
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navegación */}
      <nav className="bg-white shadow">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-indigo-600">Image Chat</div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="py-12 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h1 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Chatea con tus imágenes usando IA
            </h1>
            <p className="max-w-2xl mt-4 text-xl text-gray-500 lg:mx-auto">
              Sube tus imágenes y haz preguntas sobre ellas. Nuestra IA te responderá con información detallada.
            </p>
            <div className="mt-8">
              <Link
                href="/register"
                className="px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Comenzar ahora
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Características */}
      <div className="py-12">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Características principales</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-indigo-100 rounded-md">
                <FiImage className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-900">Sube tus imágenes</h3>
                <p className="mt-2 text-gray-500">
                  Sube fácilmente tus imágenes a nuestra plataforma segura.
                </p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-indigo-100 rounded-md">
                <FiMessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-900">Chatea con IA</h3>
                <p className="mt-2 text-gray-500">
                  Haz preguntas sobre tus imágenes y recibe respuestas inteligentes.
                </p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-indigo-100 rounded-md">
                <FiLock className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-900">Seguridad garantizada</h3>
                <p className="mt-2 text-gray-500">
                  Tus imágenes y conversaciones están protegidas y son privadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-12 bg-indigo-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="p-8 text-center bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900">¿Listo para comenzar?</h2>
            <p className="max-w-2xl mx-auto mt-4 text-gray-500">
              Regístrate hoy y comienza a chatear con tus imágenes usando la potencia de la IA.
            </p>
            <div className="mt-8">
              <Link
                href="/register"
                className="px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Crear cuenta gratis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500">© 2025 Image Chat. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 