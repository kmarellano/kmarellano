import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SectionWrapper } from '@/components/wrapper/section-wrapper';

export function PersonalSection() {
  const personalProjects = [
    {
      title: 'CodeSync: Open Source Contribution Tracker',
      category: 'Software Development',
      image: '/placeholder.svg',
      author: {
        name: 'Alex Rivers',
        avatar: '/placeholder.svg',
      },
    },
    {
      title: 'DeployMate: Scalable Web App Builder',
      category: 'Software Development',
      image: '/placeholder.svg',
      author: {
        name: 'Jordan Hayes',
        avatar: '/placeholder.svg',
      },
    },
    {
      title: 'DevLink: Remote Collaboration Platform',
      category: 'Software Development',
      image: '/placeholder.svg',
      author: {
        name: 'Taylor Grant',
        avatar: '/placeholder.svg',
      },
    },
  ];

  return (
    <SectionWrapper className="flex min-h-svh" id="personal">
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Side Projects (WIP)</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalProjects.map((post, index) => (
            <Card key={post.title + index} className="bg-secondary">
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
              {/* <CardFooter className="p-4 pt-0">
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
              </CardFooter> */}
            </Card>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}
