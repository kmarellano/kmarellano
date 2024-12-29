import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SectionWrapper } from '@/components/wrapper/section-wrapper';
import { Music, Film, Camera, Phone, Mail, MapPin } from 'lucide-react';

const SKILLS = [
  'JavaScript',
  'React',
  'Node.js',
  'TypeScript',
  'Express',
  'Fastify',
  'Next.js',
  'NestJS',
  'Serverless',
  'REST',
  'GraphQL',
  'AWS',
  'Prisma',
  'SQL Databases',
  'NoSQL Databases',
  'Git',
  'CI/CD',
  'Docker',
  'Kubernetes',
  'Microservices',
  'Redis',
  'Jest',
  'Mocha',
  'Chai',
  'Kafka',
  'Terraform',
  'Nginx',
  'ArgoCD',
  'Grafana',
  'Prometheus',
];

export function TechnicalSection() {
  return (
    <SectionWrapper className="bg-muted" id="skills">
      <div className="container px-4">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Technical Stack</h2>
          <p className="text-2xl text-muted-foreground">
            Not just a full stack developer, but a whole stack developer. I'm
            obsessed with coding, diving into new technologies, and always
            pushing my skills to the next level. They call it addiction—I call
            it being extra passionate with a side of commitment!
          </p>
        </div>
        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="text-lg border-primary"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
