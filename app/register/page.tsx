'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../src/context/AuthContext';
import RegisterForm from '../../src/components/RegisterForm';
import { PageContainer } from '../../src/components/page-container';

export default function RegisterPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Mover la lógica de redirección aquí para evitar errores de renderizado en el servidor
    const checkAuth = async () => {
      try {
        const { user, loading } = useAuth();
        if (!loading && user) {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
      }
    };
    
    if (mounted) {
      checkAuth();
    }
  }, [router, mounted]);

  // No renderizar nada hasta que el componente esté montado en el cliente
  if (!mounted) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold">Image Chat</h1>
            <p className="mt-2">Cargando...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <RegisterForm />
      </div>
    </PageContainer>
  );
} 