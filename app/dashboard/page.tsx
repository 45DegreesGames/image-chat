'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../src/context/AuthContext';
import Dashboard from '../../src/components/Dashboard';
import { PageContainer } from '../../src/components/page-container';

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Mover la lógica de redirección aquí para evitar errores de renderizado en el servidor
    const checkAuth = async () => {
      try {
        const { user, loading } = useAuth();
        setIsLoading(loading);
        setIsAuthenticated(!!user);
        
        if (!loading && !user) {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        router.push('/login');
      }
    };
    
    if (mounted) {
      checkAuth();
    }
  }, [router, mounted]);

  // No renderizar nada hasta que el componente esté montado en el cliente
  if (!mounted) {
    return (
      <PageContainer showHeader={false} showFooter={false}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold">Image Chat</h1>
            <p className="mt-2">Cargando...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (isLoading) {
    return (
      <PageContainer showHeader={false} showFooter={false}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold">Image Chat</h1>
            <p className="mt-2">Cargando...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!isAuthenticated) {
    return null; // No renderizar nada mientras redirige
  }

  return (
    <PageContainer showHeader={false} showFooter={false}>
      <Dashboard />
    </PageContainer>
  );
} 