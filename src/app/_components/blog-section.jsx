'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

export function BlogSection() {
  const blogPosts = [
    {
      category: 'Technology',
      title: 'AI: Shaping the Future of How We Live and Work',
      description:
        'Dive into the revolutionary impact of artificial intelligence on our daily lives, transforming everything from communication to productivity.',
      image: '/placeholder.svg',
      link: '/blog/ai-in-everyday-life',
    },
    {
      category: 'Beauty',
      title: 'Redefining Beauty: Finding Perfection in Imperfection',
      description:
        'Discover the concept of beauty in embracing imperfections, where true authenticity shines through flaws and uniqueness.',
      image: '/placeholder.svg',
      link: '/blog/beauty-in-flaws',
    },
    {
      category: 'Travel',
      title: 'Off the Beaten Path: Secret Destinations to Discover',
      description:
        'Step away from the crowd and explore secret destinations around the world that offer unparalleled adventure and beauty.',
      image: '/placeholder.svg',
      link: '/blog/hidden-travel-gems',
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
    <SectionWrapper className="bg-muted min-h-svh" id="blogs">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Personal Blogs (WIP)</h2>
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
                    <h3 className="text-6xl font-bold leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-xl">
                      {post.description}
                    </p>
                  </div>
                  <div className="relative h-[400px]">
                    <Link
                      href={post.link}
                      onClick={() => {
                        setCurrentSlide(index);
                        resetTimer();
                      }}
                    >
                      <Image
                        src={post.image}
                        alt={`Image for ${post.title}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </Link>
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
                      <p className="font-semibold text-sm text-muted">
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
