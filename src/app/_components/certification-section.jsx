'use client';

import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionWrapper } from '@/components/wrapper/section-wrapper';

const certificates = [
  {
    title: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    title: 'React Developer',
    issuer: 'Meta',
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    title: 'Full Stack Developer',
    issuer: 'FreeCodeCamp',
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    title: 'Python Professional',
    issuer: 'Python Institute',
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    title: 'Tests Professional',
    issuer: 'Python Institute',
    image: '/placeholder.svg?height=400&width=300',
  },
];

export function CertificationSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const resetTimer = useCallback(() => {
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 50);
  }, []);

  useEffect(() => {
    let timer;
    if (autoplay) {
      timer = setInterval(() => {
        setActiveIndex((current) => (current + 1) % certificates.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [autoplay]);

  const prev = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? certificates.length - 1 : current - 1
    );
    resetTimer();
  }, [resetTimer]);

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % certificates.length);
    resetTimer();
  }, [resetTimer]);

  const handleCardClick = useCallback(
    (index) => {
      setActiveIndex(index);
      resetTimer();
    },
    [resetTimer]
  );

  const maxCertification = 5;

  return (
    <SectionWrapper className="bg-muted min-h-svh flex flex-col" id="certs">
      <main className="flex-1 flex items-center justify-center">
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center justify-center relative h-[500px]">
            {certificates.map((cert, index) => {
              const position =
                (index - activeIndex + certificates.length) %
                certificates.length;
              const isActive = position === 0;

              let translateX = 0;
              if (position === 1 || position === -(maxCertification - 1))
                translateX = 100;
              else if (position === -1 || position === maxCertification - 1)
                translateX = -100;
              else if (position === 2 || position === -(maxCertification - 2))
                translateX = 200;
              else if (position === -2 || position === maxCertification - 2)
                translateX = -200;

              return (
                <button
                  key={index}
                  className={cn(
                    'absolute transition-all duration-500 w-72 z-0',
                    {
                      'z-10': isActive,
                    }
                  )}
                  style={{
                    transform: `translateX(${translateX}%) scale(${
                      isActive ? 1.1 : 0.8
                    })`,
                    opacity: isActive ? 1 : 0.7,
                  }}
                  onClick={() => handleCardClick(index)}
                  tabIndex={0}
                >
                  <Card
                    className={cn(
                      'p-1 cursor-pointer transition-all duration-300 hover:shadow-lg border-muted',
                      { 'border-primary': isActive }
                    )}
                  >
                    <div className="aspect-[3/4] relative">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="object-cover w-full h-full rounded-md"
                      />
                      <div
                        className={cn(
                          'absolute bottom-0 left-0 right-0 bg-background/90 p-4 text-center transition-opacity duration-300 opacity-70',
                          { 'opacity-100': isActive }
                        )}
                      >
                        <h3
                          className={cn('font-bold text-base', {
                            'text-lg': isActive,
                          })}
                        >
                          {cert.title}
                        </h3>
                        <p
                          className={cn('text-muted-foreground text-xs', {
                            'text-sm': isActive,
                          })}
                        >
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background border border-border transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background border border-border transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </main>
    </SectionWrapper>
  );
}
