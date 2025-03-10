import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientAuthProvider from '../components/ClientAuthProvider';
import { ThemeProvider } from '../components/theme-provider';

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
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientAuthProvider>{children}</ClientAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 