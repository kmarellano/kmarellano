'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeChanger } from '@/components/ui/theme-changer';

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider {...props}>
      <ThemeChanger />
      {children}
    </NextThemesProvider>
  );
}
