import { FaArrowDown } from 'react-icons/fa6';
import { ArrowUpRight } from './icons';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const socials = [
  { label: 'GitHub', href: 'https://github.com/dev-ayomide' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/taiwoayomide/' },
  { label: 'X', href: 'https://x.com/dev_ayomide' },
  { label: 'Instagram', href: 'https://www.instagram.com/dev_ayomide_/' },
];

export default function Hero() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Taiwo_Ayomide_Resume_latest.pdf';
    link.download = 'Ayomide_Taiwo_Resume.pdf';
    link.click();
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 64,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative grain min-h-[100svh] flex flex-col pt-32 pb-8"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="wrap w-full relative z-10 flex-1 flex flex-col">
        {/* Auto margins centre the composition in whatever room the baseline row leaves. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto">
          {/* Text */}
          <div className="lg:col-span-8">
            <span className="chip-live fade-up" style={{ '--delay': '0.15s' }}>
              <span className="chip-live__dot" />
              Available for work — Lagos, Nigeria
            </span>

            <h1 className="display-hero mt-6" style={{ color: 'var(--text-primary)' }}>
              <span className="rise-mask">
                <span style={{ animationDelay: '0.28s' }}>Ayomide</span>
              </span>
              <span className="rise-mask">
                <span style={{ animationDelay: '0.4s' }}>Taiwo</span>
              </span>
            </h1>

            <p
              className="serif-italic mt-6 fade-up"
              style={{
                '--delay': '0.68s',
                fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                lineHeight: 1.25,
                color: 'var(--text-primary)',
              }}
            >
              AI-native software engineer.
            </p>

            <p className="lede mt-4 max-w-lg fade-up" style={{ '--delay': '0.78s' }}>
              <span style={{ color: 'var(--text-primary)' }}>
                I love building products that solve real problems for real people.
              </span>{' '}
              Fast, end to end, with a founder&apos;s instinct for what to build next.
            </p>

            {/* One primary action. Résumé steps down to a text link so it stops competing. */}
            <div
              className="flex flex-wrap items-center gap-x-7 gap-y-4 mt-9 fade-up"
              style={{ '--delay': '0.88s' }}
            >
              <button onClick={() => scrollTo('work')} className="btn-solid">
                <span className="roll">
                  <span className="roll__inner" data-label="View selected work">
                    View selected work
                  </span>
                </span>
                <FaArrowDown size={10} />
              </button>
              <button
                onClick={handleDownload}
                className="link-line text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span className="roll">
                  <span className="roll__inner" data-label="Résumé">
                    Résumé
                  </span>
                </span>
                <ArrowUpRight size={9} />
              </button>
            </div>
          </div>

          {/* Portrait — its own column, never wedged into the name */}
          <Portrait />
        </div>

        {/* Baseline — socials and the scroll cue sit on the hero's bottom rule */}
        <div
          className="flex items-end justify-between gap-6 pt-6 fade-up"
          style={{ '--delay': '1.02s', borderTop: '1px solid var(--border-primary)' }}
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line font-mono text-[10px] tracking-[0.14em] uppercase"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span className="roll">
                  <span className="roll__inner" data-label={s.label}>
                    {s.label}
                  </span>
                </span>
                <ArrowUpRight size={8} />
              </a>
            ))}
          </div>

          {/* Wrapper handles the breakpoint — .scroll-cue sets its own display */}
          <span className="hidden sm:block">
            <button
              onClick={() => scrollTo('about')}
              className="scroll-cue"
              aria-label="Scroll to about"
            >
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase">Scroll</span>
              <span className="scroll-cue__rail" aria-hidden="true" />
            </button>
          </span>
        </div>
      </div>
    </section>
  );
}

function Portrait() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className="lg:col-span-4">
      {/* The observer sits on this wrapper — a clip-path on the observed node
          collapses its intersection box and the reveal never fires. */}
      <div ref={ref} className="w-full max-w-[220px] sm:max-w-[260px] mx-auto lg:mr-0 lg:ml-auto">
        <div className={`wipe ${isVisible ? 'is-visible' : ''}`}>
          <div
            className="mono-hover relative overflow-hidden rounded-full"
            style={{
              aspectRatio: '1 / 1',
              border: '1px solid var(--border-primary)',
            }}
          >
            <img
              src="/mypic.jpg"
              alt="Ayomide Taiwo"
              className="mono-img w-full h-full object-cover hover:scale-[1.04]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
