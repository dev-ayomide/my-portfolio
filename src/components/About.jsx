import { useScrollAnimation } from '../hooks/useScrollAnimation';

const facts = [
  { label: 'Based in', value: 'Lagos, Nigeria. Happy to work remotely.' },
  { label: 'Currently', value: 'Co-founder at Campor, Technical Director at RUNTECHSPACE' },
  { label: 'Studying', value: "B.Sc. Computer Science, Redeemer's University. Graduating 2027." },
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section id="about" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="wrap" ref={ref}>
        <span className="section-cap">About</span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className={`lg:col-span-7 reveal ${isVisible ? 'is-visible' : ''}`}>
            <h2 className="display-lg">Hi, I&apos;m Ayomide.</h2>

            <div className="mt-8 space-y-5 max-w-2xl">
              <p className="lede">
                I started out on the frontend and gradually moved toward backend and payments.
                Most days now I&apos;m in Python or TypeScript, working with FastAPI, NestJS,
                PostgreSQL and Redis. I still do frontend work in React and Next.js when a
                project needs it.
              </p>
              <p className="lede">
                The work I find most interesting is the kind where getting it wrong is
                expensive: ledgers that have to balance, transfers that can&apos;t be lost, and
                AI features that shouldn&apos;t show one department another department&apos;s
                data. My side project NairaLedger came out of that. It&apos;s a payments API built
                around idempotency, row-level locking and a settlement queue with retries.
              </p>
              <p className="lede">
                Outside of work I run the technical side of RUNTECHSPACE, our campus tech
                community, and I&apos;m building StreetGuard, a street-safety app for Lagos, as
                part of the Millennium Fellowship.
              </p>
            </div>
          </div>

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
      </div>
    </section>
  );
}
