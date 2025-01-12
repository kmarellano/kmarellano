import React from 'react';
import {
  HeroSection,
  TechnicalSection,
  WorkSection,
  BlogSection,
  PersonalSection,
  CertificationSection,
} from './_components';
import { Navigation } from '@/components/ui/navigation';

const About = () => {
  return (
    <main className="min-h-screen bg-white h-screen snap-y snap-mandatory overflow-y-scroll">
      <CertificationSection />

      <HeroSection />
      <TechnicalSection />
      <WorkSection />
      <BlogSection />
      <PersonalSection />
      <Navigation />
    </main>
  );
};

export default About;
