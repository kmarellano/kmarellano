'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SOCIALS } from '@/configs';

const NAV_ITEMS = [
  { href: '#home', label: 'HOME' },
  { href: '#skills', label: 'SKILLS' },
  { href: '#personal', label: 'PERSONAL PROJECTS' },
  { href: '#side', label: 'SIDE PROJECTS' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-8 left-8 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
        <span className="sr-only">Menu</span>
      </Button>

      <nav
        className={cn(
          'fixed inset-0 z-40 bg-background transition-transform duration-500 ease-in-out -translate-y-full',
          {
            'translate-y-0': isOpen,
          }
        )}
      >
        <div className="mx-auto max-w-screen-xl h-full p-8">
          <div className="flex flex-col justify-center h-full space-y-10">
            <div className="space-y-12">
              {NAV_ITEMS.map((link, i) => (
                <div key={link.href} className="group text-6xl font-bold">
                  <Link
                    href={link.href}
                    className="block relative overflow-hidden"
                    onClick={() => setIsOpen(false)}
                  >
                    <span
                      className={cn(
                        'relative block transition-transform duration-500 group-hover:-translate-y-full text-primary/60'
                      )}
                    >
                      {link.label}
                    </span>
                    <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full text-primary">
                      {link.label}
                    </span>
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex justify-start gap-4">
              <div className="group text-6xl font-bold">
                <div className="block relative overflow-hidden">
                  <span
                    className={cn(
                      'relative block transition-transform duration-500 group-hover:-translate-y-full text-primary/60'
                    )}
                  >
                    CONTACT ME
                  </span>
                  <span className="absolute top-full left-0 transition-transform duration-500 group-hover:-translate-y-full text-primary flex gap-x-8">
                    {Object.values(SOCIALS).map(({ href, Icon, isMail }) => (
                      <Link
                        key={href}
                        href={isMail ? `mailto:${href}` : href}
                        className="text-muted-foreground hover:text-primary"
                        rel="noopener noreferrer"
                        target="_blank"
                        aria-label={
                          isMail ? `Email: ${href}` : `Visit: ${href}`
                        }
                      >
                        <Icon className="w-12 h-auto" />
                      </Link>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
