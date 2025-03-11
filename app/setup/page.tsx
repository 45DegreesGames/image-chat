'use client';

import { PageContainer } from '../../src/components/page-container';
import SupabaseSetupGuide from '../../src/components/SupabaseSetupGuide';

export default function SetupPage() {
  return (
    <PageContainer>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Configuración de Image Chat</h1>
        <SupabaseSetupGuide />
      </div>
    </PageContainer>
  );
} 