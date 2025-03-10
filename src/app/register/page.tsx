'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import RegisterForm from '../../components/RegisterForm';
import { PageContainer } from '../../components/page-container';

export default function RegisterPage() {
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

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold text-primary">Image Chat</h1>
            <p className="mt-2 text-muted-foreground">Cargando...</p>
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