'use client';

import useSWR from 'swr';
import { Badge } from '@/components/ui/badge';
import { SectionWrapper } from '@/components/wrapper/section-wrapper';
import { fetcher } from '@/lib/utils';

export function TechnicalSection() {
  const { data } = useSWR('/api/admin/tech', fetcher);

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
            {data?.map(({ _id, name }) => (
              <Badge
                key={_id}
                variant="outline"
                className="text-lg border-primary"
              >
                {name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
