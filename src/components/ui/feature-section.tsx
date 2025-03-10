import React from 'react';
import { cn } from '../../lib/utils';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export function FeatureSection({
  title,
  description,
  features,
  columns = 3,
  className,
  ...props
}: FeatureSectionProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  return (
    <div
      className={cn('bg-background py-24 sm:py-32', className)}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Características
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </p>
          {description && (
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        <div className={cn('mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none', 'grid gap-x-8 gap-y-16 grid-cols-1', gridCols[columns])}>
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold leading-8 text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-base leading-7 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 