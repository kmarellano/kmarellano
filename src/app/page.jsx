import React from 'react';
import {
  HeroSection,
  TechnicalSection,
  WorkSection,
  BlogSection,
  PersonalSection,
} from './_components';

const About = () => {
  return (
    <main className="min-h-screen bg-white h-screen snap-y snap-mandatory overflow-y-scroll">
      <HeroSection />
      <TechnicalSection />
      <WorkSection />
      <BlogSection />
      <PersonalSection />
    </main>
  );
};

export default About;
