import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ArrowUpRight } from './icons';

const facts = [
  { label: 'Based in', value: 'Lagos, Nigeria — open to remote' },
  { label: 'Currently', value: 'Co-founder at Campor' },
  { label: 'Studying', value: "B.Sc. Computer Science, Redeemer's University ('27)" },
  { label: 'Focus', value: 'Product engineering, accessibility, AI integrations' },
];

const disciplines = [
  {
    title: 'Frontend engineering',
    body: 'Interfaces built with React, Next.js and TypeScript — typed, responsive, accessible, and fast on the devices people actually use.',
  },
  {
    title: 'Full-stack products',
    body: 'APIs, auth, payments and data with Django, Node and PostgreSQL. I own features end to end rather than handing them over half-built.',
  },
  {
    title: 'AI & integrations',
    body: 'Computer vision, LLM and real-time features wired into real products — from live object detection to speech and search.',
  },
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section id="about" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="wrap" ref={ref}>
        <span className="section-cap">About</span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Statement */}
          <div className={`lg:col-span-7 reveal ${isVisible ? 'is-visible' : ''}`}>
            <h2 className="display-lg">
              I build software that <span className="serif-italic">actually ships</span>.
            </h2>

            <div className="mt-8 space-y-5 max-w-2xl">
              <p className="lede">
                I&apos;m Ayomide Taiwo, a software developer working across web development, AI
                integration and blockchain. I specialise in modern, responsive applications with
                React, Next.js, TypeScript and Django — with a strong bias toward performance and
                accessibility.
              </p>
              <p className="lede">
                My work ranges from SeeForMe, an AI tool that narrates the world for visually
                impaired users, to a token management hub on Arbitrum, to production websites for
                clients. I like problems that force me to learn something new.
              </p>
              <p className="lede">
                Right now I&apos;m studying Computer Science at Redeemer&apos;s University while
                freelancing, shipping for hackathons, and co-founding Campor — a campus marketplace
                where students can trade safely. When I&apos;m not coding, I&apos;m reading or
                somewhere on X.
              </p>
            </div>

            <a
              href="mailto:ayomidepaul784@gmail.com"
              className="link-line link-line--static inline-flex mt-9 text-sm font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              ayomidepaul784@gmail.com
              <ArrowUpRight size={10} />
            </a>
          </div>

          {/* Facts */}
          <div
            className={`lg:col-span-5 lg:pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-7 reveal stagger-2 ${
              isVisible ? 'is-visible' : ''
            }`}
          >
            {facts.map((fact) => (
              <div key={fact.label}>
                <span className="eyebrow">{fact.label}</span>
                <p className="text-sm leading-relaxed mt-1.5" style={{ color: 'var(--text-primary)' }}>
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What I do */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mt-16 md:mt-24">
          {disciplines.map((d, i) => (
            <div
              key={d.title}
              className={`reveal stagger-${i + 1} ${isVisible ? 'is-visible' : ''}`}
            >
              <h3 className="text-base font-medium tracking-tight">{d.title}</h3>
              <p
                className="text-[13px] leading-relaxed mt-2.5 max-w-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
