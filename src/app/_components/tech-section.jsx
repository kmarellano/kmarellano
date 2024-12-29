import { Badge } from '@/components/ui/badge';
import { SectionWrapper } from '@/components/wrapper/section-wrapper';

const fetchSkills = async () => {
  const response = await fetch(`${process.env.PUBLIC_API_URL}/api/admin/tech`, {
    cache: 'force-cache',
    next: { revalidate: 60 * 60 * 8 },
  });
  if (!response.ok) throw new Error('Failed to fetch ');
  return response.json();
};

export async function TechnicalSection() {
  const skills = await fetchSkills();

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
            {skills.map(({ _id, name }) => (
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
