import React from 'react';
import { cn } from '@/lib/utils';

export function SectionWrapper({ children, id, className }) {
  return (
    <section
      className={cn('flex bg-background min-h-svh snap-start', className)}
      id={id}
    >
      <div className="container mx-auto my-auto px-4">{children}</div>
    </section>
  );
}
