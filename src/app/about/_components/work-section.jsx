import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Briefcase, Award, SquareChartGantt } from 'lucide-react';
import { SectionWrapper } from '@/components/wrapper/section-wrapper';

export function WorkSection() {
  const experiences = [
    {
      company: 'Stratpoint Global Outsourcing, Inc.',
      startDate: 2022,
      roles: [
        {
          title: 'Software Engineer CL III',
          date: 'Mar 2024',
          isPromotion: true,
        },
        {
          title: 'Software Engineer CL II',
          date: 'Sep 2022',
          isPromotion: false,
        },
      ],
      projects: [
        {
          name: 'Resource Management Tool',
          description:
            'A tool designed to streamline and automate resource management, replacing the current Resource Request Tracker (Google Sheet) with a more efficient application.',
          techStack: [
            'JavaScript',
            'React',
            'Node.js',
            'Express',
            'Parse',
            'PostgreSQL',
            'Docker',
          ],
        },
        {
          name: 'Cadet Booking Application',
          description:
            'A digital platform that helps cadets and counselors schedule appointments, providing support for cadets to overcome fears and emotional challenges.',
          techStack: [
            'TypeScript',
            'Next.js',
            'NestJS',
            'PostgreSQL',
            'Docker',
            'Kubernetes',
            'Nginx',
          ],
        },
        {
          name: 'Address Standardization',
          description:
            'An application that standardizes addresses to make them accurate, easy to track, and improve delivery efficiency.',
          techStack: [
            'TypeScript',
            'ReactJS',
            'Node.js',
            'Express',
            'Serverless',
            'AWS',
            'AWS Lambda',
            'AWS SQS',
          ],
        },
        {
          name: 'Payment Orchestration for Large Telecom Company',
          description:
            'A centralized payment management that records all transactions and acts as a middle layer for websites. It streamlines payment processing by enabling clients to integrate new payment systems without additional setup, ensuring stability and efficiency.',
          techStack: [
            'JavaScript',
            'ReactJS',
            'Node.js',
            'Express',
            'Serverless',
            'AWS',
            'AWS Lambda',
            'AWS DynamoDB',
            'AWS EC2',
            'AWS S3',
            'Docker',
            'Nginx',
          ],
        },
        {
          name: 'Payment Orchestration Migration',
          description:
            'An upgraded payment orchestration system that transitions from a serverless architecture to a microservices-based design. Built with Kafka and Kubernetes, it enhances scalability, reliability, and performance for efficient payment processing.',
          techStack: [
            'JavaScript',
            'ReactJS',
            'Node.js',
            'Fastify',
            'AWS DynamoDB',
            'Docker',
            'Kubernetes',
            'Kafka',
            'Terraform',
          ],
        },
        {
          name: 'Database Operation Migration for Private Bank',
          description:
            'An application designed to replace end-of-day SQL update scripts with MongoDB real-time triggers, improving data processing speed and efficiency.',
          techStack: ['JavaScript', 'MongoDB', 'MongoDB Atlas', 'Kafka'],
        },
        {
          name: 'Purchase Request System',
          description:
            'A system designed to streamline the approval process for materials needed in property construction. It provides clear budget visualization and ensures accurate receipt tracking for better financial management.',
          techStack: [
            'JavaScript',
            'React',
            'Node.js',
            'Express',
            'PostgreSQL',
            'Docker',
            'Nginx',
          ],
        },
      ],
    },
  ];

  return (
    <SectionWrapper id="projects">
      <div className="mt-8">
        <h3 className="text-3xl font-bold mb-4">Work Experience</h3>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold">
                    {exp.company}
                  </CardTitle>
                  <Badge variant="secondary" className="text-base">
                    {exp.endDate
                      ? `${exp.startDate} - ${exp.endDate}`
                      : `${exp.startDate} - Present`}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {exp.roles.map((role, roleIndex) => (
                    <li
                      key={roleIndex}
                      className="border-l-2 border-muted pl-4 py-2 text-xl"
                    >
                      <div className="flex items-center mb-1 text-xl">
                        {role.isPromotion && (
                          <Award className="mr-2 h-4 w-4 text-yellow-500" />
                        )}
                        <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{role.title}</span>
                      </div>
                      <div className="text-base text-muted-foreground">
                        {role.date}
                      </div>
                    </li>
                  ))}
                </ul>

                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="projects"
                >
                  <AccordionItem value="projects">
                    <AccordionTrigger className="text-2xl">
                      Projects I worked on
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-4">
                        {exp.projects.map((project, projectIndex) => (
                          <li
                            key={projectIndex}
                            className="flex flex-col gap-y-2 border-l-2 border-muted pl-4 text-xl"
                          >
                            <div className="flex items-center">
                              <SquareChartGantt className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span className="font-semibold">
                                {project.name}
                              </span>
                            </div>
                            <p className="text-base text-muted-foreground mb-2">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {project?.techStack?.map((tech, techIndex) => (
                                <Badge
                                  key={techIndex}
                                  // variant="secondary"
                                  className="text-sm"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
