import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Search, Moon } from 'lucide-react';
import { SectionWrapper } from '@/components/wrapper/section-wrapper';

export function BlogSection() {
  return (
    <SectionWrapper className="flex bg-muted min-h-svh" id="blog">
      {/* Hero Section */}
      <h2>Personal Blogs</h2>
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-sm font-medium text-primary">Beauty</span>
            <h1 className="text-4xl font-bold leading-tight">
              Create an Art that shows the beauty in everyone&apos;s ideas of
              flaws.
            </h1>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Ea id
              accusantium officia quod quasi necessitatibus.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/placeholder.svg"
              alt="Hero image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
