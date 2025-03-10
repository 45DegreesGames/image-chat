'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Dashboard from '../../components/Dashboard';
import { PageContainer } from '../../components/page-container';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // No renderizar nada hasta que el componente esté montado en el cliente
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <PageContainer showHeader={false} showFooter={false}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold text-primary">Image Chat</h1>
            <p className="mt-2 text-muted-foreground">Cargando...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!user) {
    return null; // No renderizar nada mientras redirige
  }

  return (
    <PageContainer showHeader={false} showFooter={false}>
      <Dashboard />
    </PageContainer>
  );
} 