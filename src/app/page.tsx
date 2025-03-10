'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/home');
      }
    }
  }, [user, loading, router]);

  // No renderizar nada hasta que el componente esté montado en el cliente
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-600">Image Chat</h1>
        <p className="mt-2 text-gray-600">Cargando...</p>
      </div>
    </div>
  );
} 