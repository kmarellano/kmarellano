import { Music, Film, Camera, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

export function AboutSection() {
  return (
    <section className="py-16" id="about">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="/placeholder.svg"
              alt="About Me"
              width={400}
              height={500}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">About Me</h2>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              porttitor tempus massa, ut tempor urna condimentum ut. Aliquam
              tempor malesuada ut ornare vel odio magna. Risus commodo viverra
              maecenas accumsan lacus vel facilisis.
            </p>
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="text-[#FF7A41]" />
                <span className="font-medium">Location:</span>
                <span className="text-muted-foreground">
                  Your City, Country
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-[#FF7A41]" />
                <span className="font-medium">Phone:</span>
                <span className="text-muted-foreground">+1 234 567 890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-[#FF7A41]" />
                <span className="font-medium">Email:</span>
                <span className="text-muted-foreground">
                  your.email@example.com
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">My Interests</h3>
              <div className="flex gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-[#FF7A41]/10 rounded-full flex items-center justify-center">
                    <Music className="w-6 h-6 text-[#FF7A41]" />
                  </div>
                  <span className="text-sm">Music</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-[#FF7A41]/10 rounded-full flex items-center justify-center">
                    <Film className="w-6 h-6 text-[#FF7A41]" />
                  </div>
                  <span className="text-sm">Movies</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-[#FF7A41]/10 rounded-full flex items-center justify-center">
                    <Camera className="w-6 h-6 text-[#FF7A41]" />
                  </div>
                  <span className="text-sm">Photography</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
