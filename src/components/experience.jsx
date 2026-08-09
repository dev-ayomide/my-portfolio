import { useState } from 'react';
import { useStaggerAnimation, useScrollAnimation } from '../hooks/useScrollAnimation';

const experiences = [
  {
    id: 1,
    role: 'Co-Founder',
    company: 'Campor',
    location: 'Remote',
    period: 'Oct 2025 — Present',
    current: true,
    description:
      'Co-founded Campor, a campus marketplace where students buy, sell and trade goods and services safely inside their university. I lead frontend development and product design.',
    achievements: [
      'Launched the platform and its first student cohort',
      'Designed a trust-first flow for student-to-student transactions',
      'Own the frontend architecture end to end',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  },
  {
    id: 2,
    role: 'Freelance Frontend Developer',
    company: 'Self-employed',
    location: 'Remote',
    period: 'Jan 2023 — Present',
    current: true,
    description:
      'Designing and building modern, responsive websites for clients across industries, with a focus on performance, accessibility and clean handover.',
    achievements: [
      'Delivered 10+ client projects',
      'Improved performance scores by ~40% on average',
      'Five recurring clients on long-term work',
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Django'],
  },
  {
    id: 3,
    role: 'Frontend Developer Intern',
    company: 'HNG',
    location: 'Remote',
    period: 'Feb 2024 — Mar 2024',
    description:
      "Fast-paced, competitive internship track. Built an AI-powered text processing tool on Chrome's built-in AI APIs.",
    achievements: [
      'Shipped an AI translation & summarisation tool',
      'Collaborated with 50+ developers across agile sprints',
      'Cleared every milestone ahead of schedule',
    ],
    technologies: ['React', 'Tailwind CSS', 'Chrome AI APIs'],
  },
  {
    id: 4,
    role: 'Full-Stack Developer Intern',
    company: 'JETA Communications',
    location: 'Ogun, Nigeria',
    period: 'Oct 2022 — Aug 2023',
    description:
      'Hands-on full-stack work across several production projects, including a computer-based testing application.',
    achievements: [
      'Built a complete CBT application from scratch',
      'Developed responsive landing pages for clients',
      'Collaborated on a team dictionary application',
    ],
    technologies: ['JavaScript', 'Python', 'Django', 'HTML5', 'CSS3'],
  },
  {
    id: 5,
    role: 'Stackie (Developer)',
    company: 'StackUp',
    location: 'Remote',
    period: 'Jan 2024 — Present',
    current: true,
    description:
      'Technical quests and bounty challenges — a steady way to keep sharpening skills on unfamiliar stacks.',
    achievements: [
      'Completed 20+ technical quests',
      'Built a Recipe Recommender during a hackathon',
      'Recognised for AI integration work',
    ],
    technologies: ['React', 'AI / ML', 'API integration'],
  },
];

const education = {
  degree: 'B.Sc. Computer Science',
  school: "Redeemer's University",
  location: 'Ede, Osun State',
  period: 'Oct 2023 — Oct 2027',
};

export default function Experience() {
  const [active, setActive] = useState(null);
  const { containerRef, getItemStyle } = useStaggerAnimation(experiences.length, {
    threshold: 0.05,
    staggerDelay: 90,
  });
  const { ref: eduRef, isVisible: eduVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="experience" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="wrap">
        <span className="section-cap">Experience</span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-16">
          <h2 className="display-lg lg:col-span-7">
            Where I&apos;ve <span className="serif-italic">worked</span>.
          </h2>
          {/* <p className="lede lg:col-span-5 lg:pt-3">
            Four years of building — internships, client work, hackathons, and now a product of my
            own.
          </p> */}
        </div>

        {/* Timeline */}
        <div ref={containerRef}>
          {experiences.map((exp, index) => (
            <article
              key={exp.id}
              style={{ ...getItemStyle(index), borderTop: '1px solid var(--border-primary)' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 py-8 md:py-10"
              onMouseEnter={() => setActive(exp.id)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Meta */}
              <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start gap-3 lg:gap-2">
                <span className="num">{exp.period}</span>
                <span className="eyebrow">{exp.location}</span>
                {exp.current && (
                  <span className="tag tag-solid lg:mt-2">Current</span>
                )}
              </div>

              {/* Body */}
              <div className="lg:col-span-9">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3
                    className="text-lg md:text-xl font-medium tracking-tight transition-transform duration-500"
                    style={{
                      transform: active === exp.id ? 'translateX(6px)' : 'translateX(0)',
                    }}
                  >
                    {exp.role}
                  </h3>
                  <span className="eyebrow">— {exp.company}</span>
                </div>

                <p
                  className="mt-4 leading-relaxed max-w-2xl"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {exp.description}
                </p>

                <ul className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2.5 max-w-3xl">
                  {exp.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span
                        className="mt-2 h-px w-3 flex-shrink-0"
                        style={{ background: 'var(--border-secondary)' }}
                      />
                      {achievement}
                    </li>
                  ))}
                </ul>

                <p
                  className="mt-5 font-mono text-[11px] tracking-[0.06em]"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {exp.technologies.join('  ·  ')}
                </p>
              </div>
            </article>
          ))}

          {/* Education */}
          <div
            ref={eduRef}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 py-8 md:py-10 reveal ${
              eduVisible ? 'is-visible' : ''
            }`}
            style={{
              borderTop: '1px solid var(--border-primary)',
              borderBottom: '1px solid var(--border-primary)',
            }}
          >
            <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start gap-3 lg:gap-2">
              <span className="num">{education.period}</span>
              <span className="eyebrow">{education.location}</span>
            </div>
            <div className="lg:col-span-9 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-lg md:text-xl font-medium tracking-tight">
                {education.degree}
              </h3>
              <span className="eyebrow">— {education.school}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
