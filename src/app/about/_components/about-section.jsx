import { Music, Film, Camera, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/wrapper/section-wrapper';

export function AboutSection() {
  return (
    <SectionWrapper className="bg-muted" id="about">
      <div className="container px-4">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Technical Stack</h2>
          <p className="text-2xl text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            porttitor tempus massa, ut tempor urna condimentum ut. Aliquam
            tempor malesuada ut ornare vel odio magna. Risus commodo viverra
            maecenas accumsan lacus vel facilisis.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
