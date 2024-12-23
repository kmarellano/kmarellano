import React from 'react';
import {
  NavHeader,
  HeroSection,
  ExpertiseSection,
  AboutSection,
  PortfolioSection,
  TestimonialSection,
} from './_components';

const About = () => {
  return (
    <React.Fragment>
      {/* <NavHeader /> */}
      <main className="min-h-screen bg-white h-screen snap-y snap-mandatory overflow-y-scroll">
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
      </main>
    </React.Fragment>
  );
};

export default About;
