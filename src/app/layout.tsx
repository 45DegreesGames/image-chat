import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientAuthProvider from '../components/ClientAuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Image Chat - Chatea con tus imágenes usando IA',
  description: 'Sube imágenes y chatea con IA sobre ellas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ClientAuthProvider>{children}</ClientAuthProvider>
      </body>
    </html>
  );
} 