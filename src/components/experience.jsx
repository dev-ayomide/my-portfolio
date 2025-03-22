import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

export default function Experience() {
  const experiences = [
    {
      id: 1,
      role: "Freelance Frontend Developer",
      company: "Dev",
      period: "Jan 2022 - Present",
      description:
        "Designed and built modern, responsive websites for various clients, Improved website performance and accessibility for better user experience.",
      technologies: ["React", "Tailwind CSS", "Django"],
    },
    {
      id: 2,
      role: "Frontend Developer Intern",
      company: "HNG",
      period: "Feb 2024 – March 2024",
      description:
        "Worked on fast-paced frontend projects, including an AI-powered text processing tool using Chrome’s AI APIs for translation, summarization, and language detection. Built responsive web applications with React.js and Tailwind CSS while collaborating in an agile team environment.",
      technologies: ["React", "Tailwind CSS", "AI Api"],
    },
    {
      id: 3,
      role: "Full-Stack Developer Intern",
      company: "JETA Communications",
      period: "Oct 2022 - August 2023",
      description:
        "Gained hands-on experience in HTML, CSS, JavaScript, Python, and Django. Developed and designed multiple web projects, including a movie website, landing pages, and a CBT (Computer-Based Testing) application. Collaborated with a team to build a dictionary application.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Python", "Django"],
    },
    {
      id: 4,
      role: "Stackie",
      company: "StackUp",
      period: "Jan 2024 - present",
      description:
        "Completed technical quests and bounty challenges, enhancing skills in frontend development, API integration, and AI applications. Built a Recipe Recommender App during a StackUp Hackathon, developing a responsive UI in React.js with AI-powered features.",
      technologies: ["HTML", "CSS", "JavaScript", "React", "AI"],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-gray-950 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center ">
          <p className="text-sm uppercase text-gray-400">EXPERIENCE</p>
          <div className="w-16 h-0.5 bg-green-primary mx-auto my-2"></div>
          <h2 className="text-4xl font-bold">MY EXPERIENCE</h2>
          <p className="text-gray-300 text-lg max-w-3xl">
            My journey as a frontend developer, showcasing my
            growth and the impact I've made.
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-green-primary" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-green-primary" />

                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  } ml-6 md:ml-0`}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{exp.role}</CardTitle>
                      <CardDescription>
                        {exp.company} | {exp.period}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 py-12 text-white">
        <div className="text-center mb-2">
          <p className="text-sm uppercase tracking-wider text-gray-400">
            EDUCATION
          </p>
          <div className="w-16 h-0.5 bg-green-primary mx-auto my-2"></div>
          <h1 className="text-4xl font-bold">MY EDUCATION</h1>
        </div>

        <div className="bg-gray-900 m-4 p-4 md:p-12 rounded-lg flex flex-col md:flex-row items-center md:w-1/2">
          <div className="gap-2 flex flex-col">
            <div className="border-white border-2 rounded-full text-center w-3/4 md:w-[60%]">
              Expected October 2027
            </div>
            <h1 className="text-3xl font-bold text-white">
              Redeemer's University
            </h1>
            B.Sc. Computer Science <br/>
            Oct 2023 – Oct 2027
          </div>
        </div>
      </div>
    </section>
  );
}
