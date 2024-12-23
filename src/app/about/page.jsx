import React from 'react';
import { HeroSection, TechnicalSection, WorkSection } from './_components';

const About = () => {
  return (
    <React.Fragment>
      <main className="min-h-screen bg-white h-screen snap-y snap-mandatory overflow-y-scroll">
        <HeroSection />
        <TechnicalSection />
        <WorkSection />
      </main>
    </React.Fragment>
  );
};

export default About;
