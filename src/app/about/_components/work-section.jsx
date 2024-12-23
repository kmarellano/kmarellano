import Image from 'next/image';
import { SectionWrapper } from '@/components/wrapper/section-wrapper';

export function WorkSection() {
  return (
    <SectionWrapper id="projects">
      <div className="container px-4">
        <h2 className="text-2xl font-bold text-center mb-12">Recent Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="group relative overflow-hidden rounded-lg"
            >
              <Image
                src="/placeholder.svg"
                alt={`Portfolio ${item}`}
                width={400}
                height={300}
                className="w-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">View Project</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
