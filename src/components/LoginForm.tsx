import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { signIn } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Verificar si el usuario viene de la página de registro
    const registered = searchParams.get('registered');
    if (registered === 'true') {
      setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión con tus credenciales.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await signIn(email, password);
    } catch (err: any) {
      console.error('Error al iniciar sesión:', err);
      setError('Error al iniciar sesión. Verifica tus credenciales o la configuración de Supabase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Image Chat</CardTitle>
        <CardDescription className="text-center">
          Inicia sesión para continuar
        </CardDescription>
      </CardHeader>
      
      {error && (
        <div className="px-6 mb-4">
          <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md">
            <p>{error}</p>
            <p className="mt-2">
              Si es la primera vez que usas la aplicación, es posible que necesites 
              <Link href="/setup" className="font-medium text-red-700 hover:underline ml-1">
                configurar Supabase
              </Link>.
            </p>
          </div>
        </div>
      )}

      {success && (
        <div className="px-6 mb-4">
          <div className="p-3 text-sm text-green-600 bg-green-100 rounded-md">
            {success}
          </div>
        </div>
      )}

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <p className="text-sm text-muted-foreground">
          ¿No tienes una cuenta?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Regístrate
          </Link>
        </p>
        <p className="text-sm text-muted-foreground">
          ¿Problemas con la configuración?{' '}
          <Link href="/setup" className="font-medium text-primary hover:underline">
            Ver guía de configuración
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
} 