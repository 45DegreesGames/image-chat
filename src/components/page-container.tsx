import React from 'react';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import { cn } from '../lib/utils';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export function PageContainer({
  children,
  showHeader = true,
  showFooter = true,
  className,
  ...props
}: PageContainerProps) {
  return (
    <div className="flex min-h-screen flex-col" {...props}>
      {showHeader && <SiteHeader />}
      <main className={cn('flex-1', className)}>{children}</main>
      {showFooter && <SiteFooter />}
    </div>
  );
} 