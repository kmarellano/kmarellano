'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';
import { SectionWrapper } from '@/components/wrapper/section-wrapper';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PersonalSection() {
  const blogPosts = [
    {
      category: 'Game Development',
      title: 'Fujiten: Harvest the Ten',
      description:
        'Fuji Ten is a fun and intuitive puzzle game where you click and drag apples on a grid to form groups that sum to exactly 10. Think fast, strategize, and master the orchard with various game modes to enjoy!',
      image: '/fujiten.png',
      link: process.env.NEXT_PUBLIC_GAMES_URL,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const timer = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
    resetTimer();
  };

  const handlePaginationClick = (index) => {
    setCurrentSlide(index);
    resetTimer();
  };

  const resetTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(nextSlide, 5000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [currentSlide]);

  return (
    <SectionWrapper className="min-h-svh" id="personal">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Personal Projects</h2>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {blogPosts.map((post, index) => (
              <div
                key={post.title + index}
                className={cn(
                  'w-full flex-shrink-0 transition-opacity duration-1000 ease-liner opacity-100',
                  {
                    'opacity-0': currentSlide !== index,
                  }
                )}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <span className="text-2xl font-medium text-primary">
                      {post.category}
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h3
                            className={cn(
                              'text-6xl font-bold leading-tight',
                              post.link &&
                                'text-primary underline cursor-pointer'
                            )}
                            onClick={() => {
                              if (post.link) {
                                window.open(
                                  post.link,
                                  '_blank',
                                  'noopener,noreferrer'
                                );
                                setCurrentSlide(index);
                                resetTimer();
                              }
                            }}
                          >
                            {post.title}
                          </h3>
                        </TooltipTrigger>
                        {post.link && (
                          <TooltipContent>
                            <p>Click to open {post.title} in a new tab</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                    <p className="text-muted-foreground text-xl">
                      {post.description}
                    </p>
                  </div>
                  <div className="relative h-[400px]">
                    <Image
                      src={post.image}
                      alt={`Image for ${post.title}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-12">
          <TooltipProvider>
            {blogPosts.map((blog, index) => (
              <Tooltip key={blog.title + index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    className={`w-3 h-3 rounded-full ${
                      currentSlide === index
                        ? 'bg-primary'
                        : 'bg-muted-foreground'
                    }`}
                    onClick={() => handlePaginationClick(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="center"
                  sideOffset={16}
                  className="bg-transparent p-0"
                >
                  <Card className="w-64 bg-accent-foreground border-none">
                    <CardContent className="p-4">
                      <div className="relative h-32 mb-2">
                        <Image
                          src={blog.image}
                          alt={`Thumbnail for ${blog.title}`}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <p className="font-semibold text-sm text-muted text-center">
                        {blog.title}
                      </p>
                    </CardContent>
                  </Card>
                  <div className="flex flex-col items-center justify-center">
                    <ChevronDown className="font-semibold text-accent-foreground" />
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </SectionWrapper>
  );
}
