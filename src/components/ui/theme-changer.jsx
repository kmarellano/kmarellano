import React from 'react';
import { useTheme } from 'next-themes';
import { COLOR_THEMES } from '@/configs/themes';
import { capitalizeFirstLetter } from '@/lib/utils';
import { Palette } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const ThemeChanger = ({ className }) => {
  const { setTheme } = useTheme();

  return (
    <div className={cn('fixed bottom-4 right-4 z-50', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Palette className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Object.entries(COLOR_THEMES).map(([key, val]) => (
            <DropdownMenuItem onClick={() => setTheme(val)} key={key}>
              {capitalizeFirstLetter(key)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { ThemeChanger };
