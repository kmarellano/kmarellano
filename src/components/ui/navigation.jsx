'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlignJustify,
  X,
  MapPin,
  Twitter,
  Facebook,
  Linkedin,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
        {isOpen ? <X /> : <AlignJustify />}
        <span className="sr-only">Menu</span>
      </Button>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-background transition-transform duration-500 ease-in-out -translate-y-full',
          {
            'translate-y-0': isOpen,
          }
        )}
      >
        <div className="mx-auto max-w-screen-xl h-full p-6">
          <header className="flex items-start justify-between h-full">
            <div className="space-y-12">
              <div className="text-2xl font-bold">kmarellano</div>
              <nav className="space-y-4">
                {[
                  { href: '#home', label: 'HOME' },
                  { href: '#skills', label: 'SKILLS' },
                  { href: '#blogs', label: 'BLOGS' },
                  { href: '#personal', label: 'PERSONAL PROJECTS' },
                ].map((link) => (
                  <div key={link.href} className="group text-6xl font-bold">
                    <Link
                      href={link.href}
                      className={'block relative overflow-hidden'}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="relative block transition-transform duration-500 group-hover:-translate-y-full text-muted-foreground">
                        {link.label}
                      </span>
                      <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full">
                        {link.label}
                      </span>
                    </Link>
                  </div>
                ))}
              </nav>
            </div>

            <div className="space-y-8 text-right">
              <div className="flex justify-end gap-4">
                {[
                  { href: 'https://twitter.com', Icon: Twitter },
                  { href: 'https://facebook.com', Icon: Facebook },
                  { href: 'https://linkedin.com', Icon: Linkedin },
                  { href: 'https://example.com', Icon: Globe },
                ].map(({ href, Icon }) => (
                  <Button key={href} variant="ghost" size="icon" asChild>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Icon className="h-4 w-4" />
                      <span className="sr-only">{href}</span>
                    </a>
                  </Button>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <p>hello@uncut.com</p>
                <p>+44 1234241141</p>
                <p>Some Street 112</p>
                <p>W124XX</p>
                <p>London, UK</p>
                <Button variant="outline" size="sm" className="mt-4">
                  <MapPin className="mr-2 h-4 w-4" />
                  VIEW MAP
                </Button>
              </div>
            </div>
          </header>
        </div>
      </div>
    </React.Fragment>
  );
}
