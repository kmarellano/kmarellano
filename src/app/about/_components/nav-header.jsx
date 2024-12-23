'use client';

import React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const SECTIONS = [
  {
    key: 'Home',
    value: 'home',
  },
  {
    key: 'About me',
    value: 'about',
  },
  {
    key: 'Projects',
    value: 'projects',
  },
  {
    key: 'Blog',
    value: 'blogs',
  },
];

export function NavHeader() {
  return (
    <header>
      <div className="container mx-auto py-4">
        <NavigationMenu>
          <NavigationMenuList>
            {SECTIONS.map(({ key, value }) => (
              <NavigationMenuItem key={key}>
                <Link href={`#${value}`} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {key}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
