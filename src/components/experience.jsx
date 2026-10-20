import { useState } from 'react';
import { useStaggerAnimation, useScrollAnimation } from '../hooks/useScrollAnimation';

const experiences = [
  {
    id: 1,
    role: 'AI Intern, Software Engineering',
    company: 'Heirs Technologies',
    location: 'Victoria Island, Lagos',
    period: 'Jul 2026 – Sep 2026',
    description:
      "Added AI knowledge retrieval to the group's ITIL 4 IT service management platform, which 15 organisations across banking, insurance and energy use.",
    achievements: [
      'Built the retrieval pipeline over 2,400+ past tickets (1,318 deduplicated resolutions). Tuned confidence thresholds so the system decides between answering, leaving a private note for an analyst, or escalating to a person.',
      'Wrote 231 automated tests for the release and rolled it out in four stages behind environment flags.',
      "Designed the AI assistant's data access on the internal risk and audit platform: scoped per department, read-only and fail-closed, so no one can pull another department's data through chat.",
    ],
    technologies: ['NestJS', 'PostgreSQL + pgvector', 'Prisma', 'Redis / BullMQ'],
  },
  {
    id: 2,
    role: 'Contract Software Engineer',
    company: 'Platnova',
    location: 'Remote',
    period: 'Aug 2025 – Mar 2026',
    description:
      'Worked on a fintech payments product, on both the customer app and the internal admin platform.',
    achievements: [
      'Customer app: deposit flows, virtual card issuance, and speeding up transfer methods.',
      'Admin platform: KYB compliance reviews, merchant wallets, settlement workflows and audit trails.',
    ],
    technologies: ['React', 'Vite'],
  },
  {
    id: 3,
    role: 'Co-Founder & Frontend Engineer',
    company: 'Campor',
    location: "Redeemer's University",
    period: 'Oct 2025 – Present',
    current: true,
    description:
      "A marketplace where students at Redeemer's buy and sell from each other. It's live. I lead the frontend, a lot of the product decisions, and onboarding new users.",
    achievements: [],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  },
];

const education = {
  degree: 'B.Sc. Computer Science',
  school: "Redeemer's University",
  location: 'Ede, Osun State',
  period: 'Oct 2023 – Jul 2027',
  note: "Dean's List twice. Gold Scholar 2023/24, Bronze Scholar 2024/25.",
};

const awards = [
  { place: '2nd', event: 'Interswitch × Enyata Buildathon', detail: 'Out of 500+ teams, for Fusion' },
  { place: '1st', event: 'RUNACOSS Web Design Contest' },
  { place: '2nd', event: 'DATICAN AI in Medicine' },
  { place: 'Winner', event: 'ALATPay Buildathon' },
  { place: 'Top 10', event: 'Canton Construct Ideathon', detail: '938 participants' },
  { place: '10th', event: 'StackUp September Coding Challenge' },
  { place: 'Bounty', event: 'Hedera Origin Bounty (DoraHacks)' },
  { place: 'Bounty', event: 'Arbitrum Builders Bounty' },
];

export default function Experience() {
  const [active, setActive] = useState(null);
  const { containerRef, getItemStyle } = useStaggerAnimation(experiences.length, {
    threshold: 0.05,
    staggerDelay: 90,
  });
  const { ref: eduRef, isVisible: eduVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: awardsRef, isVisible: awardsVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section id="experience" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="wrap">
        <span className="section-cap">Experience</span>

        <h2 className="display-lg mb-12 md:mb-16">Where I&apos;ve worked</h2>

        <div ref={containerRef}>
          {experiences.map((exp, index) => (
            <article
              key={exp.id}
              style={{ ...getItemStyle(index), borderTop: '1px solid var(--border-primary)' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 py-8 md:py-10"
              onMouseEnter={() => setActive(exp.id)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start gap-3 lg:gap-2">
                <span className="num">{exp.period}</span>
                <span className="eyebrow">{exp.location}</span>
                {exp.current && <span className="tag tag-solid lg:mt-2">Current</span>}
              </div>

              <div className="lg:col-span-9">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3
                    className="text-lg md:text-xl font-medium tracking-tight transition-transform duration-500"
                    style={{
                      transform: active === exp.id ? 'translateX(6px)' : 'translateX(0)',
                    }}
                  >
                    {exp.company}
                  </h3>
                  <span className="eyebrow">{exp.role}</span>
                </div>

                <p
                  className="mt-4 leading-relaxed max-w-2xl"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {exp.description}
                </p>

                {exp.achievements.length > 0 && (
                  <ul className="mt-5 space-y-2.5 max-w-2xl">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-sm leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <span
                          className="mt-2.5 h-px w-3 flex-shrink-0"
                          style={{ background: 'var(--border-secondary)' }}
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-5 text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
                  {exp.technologies.join(', ')}
                </p>
              </div>
            </article>
          ))}

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
            <div className="lg:col-span-9">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg md:text-xl font-medium tracking-tight">
                  {education.school}
                </h3>
                <span className="eyebrow">{education.degree}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {education.note}
              </p>
            </div>
          </div>
        </div>

        <div
          ref={awardsRef}
          className={`mt-16 md:mt-24 reveal ${awardsVisible ? 'is-visible' : ''}`}
        >
          <h3 className="display-md mb-6">Hackathons &amp; awards</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {awards.map((a) => (
              <li
                key={a.event}
                className="flex items-baseline gap-4 py-3 text-sm"
                style={{ borderTop: '1px solid var(--border-primary)' }}
              >
                <span className="w-14 flex-shrink-0 font-medium">{a.place}</span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {a.event}
                  {a.detail && (
                    <span style={{ color: 'var(--text-tertiary)' }}>. {a.detail}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
