'use client';

import React from 'react';
import useSWR from 'swr';
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
import { cn, getFullYear, formatMonthYY, fetcher } from '@/lib/utils';

export function WorkSection() {
  const { data } = useSWR('/api/admin/work', fetcher);

  return (
    <SectionWrapper id="projects">
      <div className="mt-8">
        <h3 className="text-3xl font-bold mb-4">Work Experience</h3>
        <div className="space-y-6">
          {data?.map((exp, index) => (
            <Card
              key={exp.company + index}
              className="relative bg-transparent border-none shadow-none"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold">
                    {exp.company}
                  </CardTitle>
                  <Badge variant="secondary" className="text-base">
                    {`${getFullYear(exp.startDate)} - ${
                      exp.endDate ? getFullYear(exp.endDate) : 'Present'
                    }`}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div key={exp.company + index} className="mb-6">
                  <ol className="relative border-l-2 border-muted">
                    {exp?.roles?.map((role, roleIndex) => (
                      <li key={role.title + roleIndex} className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3">
                          {role.isPromotion ? (
                            <Award className="w-3 h-3 text-primary-foreground" />
                          ) : (
                            <Briefcase className="w-3 h-3 text-primary-foreground" />
                          )}
                        </span>
                        <h3 className="flex items-center mb-1 text-lg font-semibold">
                          {role.title}
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-muted-foreground">
                          {formatMonthYY(role.date)}
                        </time>
                      </li>
                    ))}
                  </ol>
                </div>

                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="projects"
                >
                  <AccordionItem value="projects">
                    <AccordionTrigger className="text-2xl font-bold">
                      Projects I worked on
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col space-y-6">
                        {exp?.projects?.map((project, projectIndex) => (
                          <li
                            key={project.name + projectIndex}
                            className="flex flex-col gap-y-2 border-l-2 border-muted pl-4 text-xl hover:bg-background/15 p-4"
                          >
                            <div className="flex items-center">
                              <SquareChartGantt className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span className="font-semibold">
                                {project.name}
                              </span>
                            </div>
                            <p
                              className={cn('text-base text-muted-foreground', {
                                'mb-2': !project.accomplishments,
                              })}
                            >
                              {project.description}
                            </p>

                            {project.accomplishments && (
                              <div className="mb-4">
                                <h5 className="font-semibold text-base mb-2">
                                  Key Accomplishments
                                </h5>
                                <ul className="list-disc list-outside pl-4 text-sm text-muted-foreground space-y-1">
                                  {project.accomplishments.map(
                                    (accomplishment, index) => (
                                      <li key={accomplishment + index}>
                                        {accomplishment}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                            <div className="flex flex-wrap gap-2">
                              {project?.techStack?.map((tech, techIndex) => (
                                <Badge
                                  key={tech + techIndex}
                                  className="text-xs"
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
