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

const ThemeChanger = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="absolute h-[1.2rem] w-[1.2rem]" />
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
  );
};

export { ThemeChanger };
