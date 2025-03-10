import React from 'react';
import Link from 'next/link';
import { Button } from './button';
import { cn } from '../../lib/utils';

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
  image?: string;
}

export function Hero({
  title,
  description,
  primaryAction,
  secondaryAction,
  image,
  className,
  ...props
}: HeroProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-background py-24 sm:py-32',
        className
      )}
      {...props}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <svg
          className="absolute left-[calc(50%-18rem)] top-[calc(50%-40rem)] transform-gpu blur-3xl"
          viewBox="0 0 1108 632"
          aria-hidden="true"
        >
          <path
            fill="url(#gradient)"
            fillOpacity=".25"
            d="M235.233 402.609c-7.162 0-12.969-5.807-12.969-12.969 0-7.162 5.807-12.969 12.969-12.969 7.162 0 12.969 5.807 12.969 12.969 0 7.162-5.807 12.969-12.969 12.969zm45.391 0c-7.162 0-12.969-5.807-12.969-12.969 0-7.162 5.807-12.969 12.969-12.969 7.162 0 12.969 5.807 12.969 12.969 0 7.162-5.807 12.969-12.969 12.969zm-45.391 45.391c-7.162 0-12.969-5.807-12.969-12.969 0-7.162 5.807-12.969 12.969-12.969 7.162 0 12.969 5.807 12.969 12.969 0 7.162-5.807 12.969-12.969 12.969zm45.391 0c-7.162 0-12.969-5.807-12.969-12.969 0-7.162 5.807-12.969 12.969-12.969 7.162 0 12.969 5.807 12.969 12.969 0 7.162-5.807 12.969-12.969 12.969z"
          />
          <defs>
            <linearGradient
              id="gradient"
              x1="1220.59"
              x2="-85.053"
              y1="432.766"
              y2="638.714"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4F46E5" />
              <stop offset={1} stopColor="#80CAFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="mx-auto max-w-2xl lg:col-span-7 lg:mx-0 lg:pt-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {description}
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              {primaryAction && (
                <Button asChild size="lg">
                  <Link href={primaryAction.href}>{primaryAction.text}</Link>
                </Button>
              )}
              {secondaryAction && (
                <Button asChild variant="outline" size="lg">
                  <Link href={secondaryAction.href}>{secondaryAction.text}</Link>
                </Button>
              )}
            </div>
          </div>
          
          {image && (
            <div className="mt-16 sm:mt-24 lg:col-span-5 lg:mt-0">
              <div className="relative overflow-hidden rounded-xl shadow-xl ring-1 ring-gray-400/10">
                <img
                  src={image}
                  alt="App screenshot"
                  className="w-full"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-30"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 