import React from 'react';
import {
  HeroSection,
  TechnicalSection,
  WorkSection,
  SideSection,
  PersonalSection,
  CertificationSection,
} from './_components';
import { Navigation } from '@/components/ui/navigation';

const About = () => {
  return (
    <main className="min-h-screen bg-white h-screen snap-y snap-mandatory overflow-y-scroll">
      <HeroSection />
      <TechnicalSection />
      <WorkSection />
      <CertificationSection />
      <PersonalSection />
      <SideSection />
      <Navigation />
    </main>
  );
};

export default About;
