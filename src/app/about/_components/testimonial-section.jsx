import { Star } from 'lucide-react';
import Image from 'next/image';

export function TestimonialSection() {
  return (
    <section className="py-16" id="testimonial">
      <div className="container px-4">
        <h2 className="text-2xl font-bold text-center mb-12">
          My Client Saying
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/placeholder.svg"
                  alt={`Client ${item}`}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium">Client Name</h3>
                  <p className="text-sm text-muted-foreground">Position</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua."
              </p>
              <div className="flex gap-1 text-[#FF7A41]">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
