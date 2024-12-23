import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Facebook, Mail, Linkedin, AtSign } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="flex bg-background min-h-svh" id="home">
      <div className="container mx-auto my-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <span className="text-primary text-2xl">Hi, I am</span>
              <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-8xl">
                Kurt
              </h1>
              <p className="text-3xl text-muted-foreground">
                Full Stack Developer
              </p>
            </div>
            <p className="text-muted-foreground max-w-lg text-2xl">
              An outgoing programming nerd who enjoys exploring and learning new
              things, whether online or out in the real world.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Mail className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <AtSign className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="relative h-[500px]">
            <Image
              src="/test.png"
              alt="Profile Image"
              fill
              className="object-contain drop-shadow-img"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
