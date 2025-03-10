'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { PageContainer } from '../../components/page-container';
import { Hero } from '../../components/ui/hero';
import { FeatureSection } from '../../components/ui/feature-section';
import { CTASection } from '../../components/ui/cta-section';
import { FiImage, FiMessageSquare, FiLock, FiZap, FiCloud, FiSmile } from 'react-icons/fi';

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
    <PageContainer>
      <Hero
        title="Chatea con tus imágenes usando IA"
        description="Sube tus imágenes y haz preguntas sobre ellas. Nuestra IA te responderá con información detallada basada en el contenido visual."
        primaryAction={{
          text: "Comenzar ahora",
          href: "/register",
        }}
        secondaryAction={{
          text: "Saber más",
          href: "#features",
        }}
        image="/dashboard-preview.png"
      />

      <FeatureSection
        id="features"
        title="Todo lo que necesitas para interactuar con tus imágenes"
        description="Image Chat te permite extraer información valiosa de tus imágenes a través de una interfaz conversacional intuitiva."
        features={[
          {
            title: "Subida sencilla",
            description: "Sube tus imágenes fácilmente mediante arrastrar y soltar o selección de archivos.",
            icon: <FiImage className="h-6 w-6" />,
          },
          {
            title: "Chat inteligente",
            description: "Haz preguntas sobre tus imágenes y recibe respuestas precisas basadas en su contenido.",
            icon: <FiMessageSquare className="h-6 w-6" />,
          },
          {
            title: "Seguridad garantizada",
            description: "Tus imágenes y conversaciones están protegidas y son completamente privadas.",
            icon: <FiLock className="h-6 w-6" />,
          },
          {
            title: "Respuestas rápidas",
            description: "Obtén respuestas en segundos gracias a nuestra integración con la API de Gemini.",
            icon: <FiZap className="h-6 w-6" />,
          },
          {
            title: "Almacenamiento en la nube",
            description: "Accede a tus imágenes y conversaciones desde cualquier dispositivo.",
            icon: <FiCloud className="h-6 w-6" />,
          },
          {
            title: "Experiencia personalizada",
            description: "Interfaz intuitiva y adaptada a tus necesidades para una mejor experiencia.",
            icon: <FiSmile className="h-6 w-6" />,
          },
        ]}
        columns={3}
      />

      <CTASection
        title="¿Listo para comenzar?"
        description="Regístrate hoy y comienza a chatear con tus imágenes usando la potencia de la IA."
        primaryAction={{
          text: "Crear cuenta gratis",
          href: "/register",
        }}
        secondaryAction={{
          text: "Iniciar sesión",
          href: "/login",
        }}
        variant="colored"
      />
    </PageContainer>
  );
} 