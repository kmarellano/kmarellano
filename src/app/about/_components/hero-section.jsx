import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Mail, Linkedin, AtSign } from 'lucide-react';
import { SectionWrapper } from '@/components/wrapper/section-wrapper';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function HeroSection() {
  return (
    <SectionWrapper className="flex bg-background min-h-svh" id="home">
      <main className="grid md:grid-cols-2 gap-8 items-center">
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
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Mail className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <AtSign className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="relative group h-svh sm:h-[46rem] hover:cursor-grab">
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Image
                    src="/scaled-smile.png"
                    alt="Profile Image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain drop-shadow-img"
                    priority
                  />
                  <Image
                    src="/scaled-nosmile.png"
                    alt="Profile Image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain drop-shadow-img group-hover:hidden"
                    priority
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="end"
                sideOffset={70}
                sticky="always"
                className="bg-transparent text-accent-foreground p-2 rounded text-2xl"
              >
                Hello!
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </main>
    </SectionWrapper>
  );
}
