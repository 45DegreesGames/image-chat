import React from 'react';
import Link from 'next/link';
import { cn } from '../lib/utils';

interface SiteFooterProps extends React.HTMLAttributes<HTMLElement> {}

export function SiteFooter({ className, ...props }: SiteFooterProps) {
  return (
    <footer
      className={cn('border-t bg-background', className)}
      {...props}
    >
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Image Chat</h3>
            <p className="text-sm text-muted-foreground">
              Chatea con tus imágenes usando IA. Sube tus imágenes y haz preguntas sobre ellas.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Producto</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Recursos</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Image Chat. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                Twitter
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const productLinks = [
  { label: 'Características', href: '/features' },
  { label: 'Precios', href: '/pricing' },
  { label: 'Casos de uso', href: '/use-cases' },
  { label: 'Testimonios', href: '/testimonials' },
];

const resourceLinks = [
  { label: 'Documentación', href: '/docs' },
  { label: 'Guías', href: '/guides' },
  { label: 'Blog', href: '/blog' },
  { label: 'Soporte', href: '/support' },
];

const legalLinks = [
  { label: 'Términos de servicio', href: '/terms' },
  { label: 'Política de privacidad', href: '/privacy' },
  { label: 'Cookies', href: '/cookies' },
]; 