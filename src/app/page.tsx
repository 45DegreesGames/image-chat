'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir directamente a la página de inicio
    router.push('/home');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-primary">Image Chat</h1>
        <p className="mt-2 text-muted-foreground">Cargando...</p>
      </div>
    </div>
  );
} 