'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { checkSupabaseConfig } from '../lib/check-supabase';

export default function SupabaseSetupGuide() {
  const [checking, setChecking] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);

  const handleCheck = async () => {
    setChecking(true);
    try {
      await checkSupabaseConfig();
      setCheckComplete(true);
    } catch (error) {
      console.error('Error al verificar configuración:', error);
    } finally {
      setChecking(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-8">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Configuración de Supabase</CardTitle>
        <CardDescription className="text-center">
          Sigue estos pasos para configurar Supabase correctamente
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">1. Ejecuta el script SQL</h3>
          <p>
            Debes ejecutar el script SQL que se encuentra en <code>supabase/setup.sql</code> en el editor SQL de Supabase.
            Este script configura la autenticación sin confirmación de correo electrónico y crea las tablas necesarias.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto">
            <pre className="text-sm">
              <code>
                {`-- Configurar la autenticación para permitir registro sin confirmación de correo electrónico
UPDATE auth.config
SET confirm_email_identity_verification = false,
    enable_signup = true;

-- Crear tablas necesarias...
-- (Ver el archivo completo en supabase/setup.sql)`}
              </code>
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">2. Configurar el almacenamiento</h3>
          <p>
            Crea un bucket llamado <code>images</code> en Supabase Storage y configura las políticas de seguridad.
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Ve a la sección "Storage" en el menú lateral</li>
            <li>Crea un nuevo bucket llamado "images"</li>
            <li>En la configuración del bucket, asegúrate de que:
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>"Public" esté desactivado (para que las imágenes sean privadas)</li>
                <li>"RLS" esté activado (para aplicar políticas de seguridad)</li>
              </ul>
            </li>
            <li>Crea las siguientes políticas de seguridad para el bucket "images":
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>Política para SELECT: <code>auth.uid() = owner</code></li>
                <li>Política para INSERT: <code>auth.uid() = owner</code></li>
                <li>Política para UPDATE: <code>auth.uid() = owner</code></li>
                <li>Política para DELETE: <code>auth.uid() = owner</code></li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">3. Configurar la autenticación</h3>
          <p>
            Configura la autenticación en Supabase para permitir el registro sin confirmación de correo electrónico.
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Ve a la sección "Authentication" en el menú lateral</li>
            <li>Haz clic en "Settings"</li>
            <li>En la pestaña "Email", asegúrate de que:
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>"Enable Email Signup" esté activado</li>
                <li>"Confirm Email" esté desactivado</li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">4. Verificar la configuración</h3>
          <p>
            Haz clic en el botón "Verificar configuración" para comprobar si Supabase está configurado correctamente.
            Los resultados se mostrarán en la consola del navegador.
          </p>
          <Button 
            onClick={handleCheck} 
            disabled={checking}
            className="w-full"
          >
            {checking ? 'Verificando...' : 'Verificar configuración'}
          </Button>
          {checkComplete && (
            <p className="text-sm text-green-600">
              Verificación completada. Revisa la consola del navegador para ver los resultados.
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Para más información, consulta la documentación de Supabase en{' '}
          <a 
            href="https://supabase.com/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            supabase.com/docs
          </a>
        </p>
      </CardFooter>
    </Card>
  );
} 