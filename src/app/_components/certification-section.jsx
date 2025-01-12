'use client';

import { useEffect, useState, useCallback } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionWrapper } from '@/components/wrapper/section-wrapper';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn, fetcher, formatMonthYY } from '@/lib/utils';

export function CertificationSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const { data: certificates } = useSWR('/api/admin/cert', fetcher);

  const handleNavigation = (location) => {
    window.open(location, '_blank');
  };

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

  const getTranslateX = (index) => {
    const halfLength = Math.floor(certificates.length / 2);
    const position =
      (index - activeIndex + certificates.length) % certificates.length;

    if (position === 0) return 0;
    if (position <= halfLength) return position * 100;
    return (position - certificates.length) * 100;
  };

  return (
    <SectionWrapper className="bg-muted min-h-svh flex flex-col" id="certs">
      <div className="mt-8">
        <h3 className="text-3xl font-bold">Certifications</h3>
        <main className="relative w-full overflow-hidden">
          <div className="flex items-center justify-center relative min-h-screen">
            <TooltipProvider>
              {certificates?.map((cert, index) => {
                const isActive = index === activeIndex;

                return (
                  <Tooltip key={cert.title + index} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <button
                        className={cn(
                          'absolute transition-all duration-500 w-72 z-0 grayscale',
                          {
                            'z-10 grayscale-0 shadow-md rounded-xl': isActive,
                          }
                        )}
                        style={{
                          transform: `translateX(${getTranslateX(
                            index
                          )}%) scale(${isActive ? 1.1 : 0.8})`,
                          opacity: isActive ? 1 : 0.5,
                        }}
                        onClick={() =>
                          isActive
                            ? handleNavigation(cert.link)
                            : handleCardClick(index)
                        }
                        tabIndex={0}
                      >
                        <Card
                          className={cn(
                            'p-1 cursor-pointer transition-all duration-300 hover:shadow-lg border-muted flex flex-col justify-between h-[450px] bg-background/65 border-2 hover:border-primary/30',
                            {
                              'hover:scale-105': isActive,
                            }
                          )}
                        >
                          <div className="relative w-full h-3/4 overflow-hidden rounded-md bg-gray-100">
                            <Image
                              src={cert.image}
                              alt={cert.title}
                              className="object-contain w-full h-full px-4 py-2"
                              fill
                            />
                          </div>
                          <div className="py-6 flex flex-col justify-center items-center">
                            <p
                              className={cn('font-bold text-base', {
                                'text-lg': isActive,
                              })}
                            >
                              {cert.title}
                            </p>
                            <p
                              className={cn('text-muted-foreground text-xs', {
                                'text-sm': isActive,
                              })}
                            >
                              {cert.issuer}
                            </p>
                            <p
                              className={cn(
                                'text-muted-foreground/80 text-xs italic'
                              )}
                            >
                              {formatMonthYY(cert.date)}
                            </p>
                          </div>
                        </Card>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      align="center"
                      sideOffset={16}
                      className="bg-transparent p-0 text-primary"
                    >
                      {isActive && <p>Click to view certificate!</p>}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </div>

          <Button
            variant="secondary"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background border border-border transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="secondary"
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background  border border-border transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </main>
      </div>
    </SectionWrapper>
  );
}
