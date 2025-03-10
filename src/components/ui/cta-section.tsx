import React from 'react';
import Link from 'next/link';
import { Button } from './button';
import { cn } from '../../lib/utils';

interface CTASectionProps extends React.HTMLAttributes<HTMLDivElement> {
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
  variant?: 'default' | 'colored';
}

export function CTASection({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = 'default',
  className,
  ...props
}: CTASectionProps) {
  return (
    <div
      className={cn(
        'py-16 sm:py-24',
        variant === 'colored' ? 'bg-primary' : 'bg-background',
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={cn(
              'text-3xl font-bold tracking-tight sm:text-4xl',
              variant === 'colored' ? 'text-primary-foreground' : 'text-foreground'
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              'mx-auto mt-6 max-w-xl text-lg leading-8',
              variant === 'colored' ? 'text-primary-foreground/80' : 'text-muted-foreground'
            )}
          >
            {description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {primaryAction && (
              <Button
                asChild
                variant={variant === 'colored' ? 'secondary' : 'default'}
                size="lg"
              >
                <Link href={primaryAction.href}>{primaryAction.text}</Link>
              </Button>
            )}
            {secondaryAction && (
              <Button
                asChild
                variant={variant === 'colored' ? 'outline' : 'outline'}
                size="lg"
                className={variant === 'colored' ? 'bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10' : ''}
              >
                <Link href={secondaryAction.href}>{secondaryAction.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 