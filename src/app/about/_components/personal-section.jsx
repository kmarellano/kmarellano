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

export function PersonalSection() {
  return (
    <SectionWrapper className="flex min-h-svh" id="personal">
      {/* Editor's Pick */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Side Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {editorsPicks.map((post, index) => (
            <Card key={index}>
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <span className="text-sm text-primary font-medium">
                  {post.category}
                </span>
                <h3 className="font-semibold mt-2">{post.title}</h3>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex items-center space-x-2">
                  <div className="relative w-8 h-8">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {post.author.name}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}

const editorsPicks = [
  {
    title: 'The 3 Eyeshadow palettes I own & How to downsize your stash',
    category: 'Beauty',
    image: '/placeholder.svg',
    author: {
      name: 'Isabella Ava',
      avatar: '/placeholder.svg',
    },
  },
  {
    title: '2 New outfit formulas to add to your Capsule Wardrobe',
    category: 'Fashion',
    image: '/placeholder.svg',
    author: {
      name: 'Charlotte Mia',
      avatar: '/placeholder.svg',
    },
  },
  {
    title: 'How to create a sustainable and healthy lifestyle',
    category: 'Lifestyle',
    image: '/placeholder.svg',
    author: {
      name: 'Sophie Grace',
      avatar: '/placeholder.svg',
    },
  },
];
