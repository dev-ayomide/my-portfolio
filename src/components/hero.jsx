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
      className="relative min-h-[100svh] flex flex-col pt-32 pb-8"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="wrap w-full relative z-10 flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto">
          <div className="lg:col-span-8">
            <p className="eyebrow fade-up" style={{ '--delay': '0.15s' }}>
              Software engineer, Lagos
            </p>

            <h1 className="display-hero mt-4" style={{ color: 'var(--text-primary)' }}>
              <span className="rise-mask">
                <span style={{ animationDelay: '0.28s' }}>Ayomide</span>
              </span>
              <span className="rise-mask">
                <span style={{ animationDelay: '0.4s' }}>Taiwo</span>
              </span>
            </h1>

            <p className="lede mt-6 max-w-lg fade-up" style={{ '--delay': '0.6s' }}>
              I&apos;m a software engineer and Computer Science student at Redeemer&apos;s
              University. I build systems for fintech and enterprise products, mostly in
              Python and TypeScript.
            </p>

            <div
              className="flex flex-wrap items-center gap-x-7 gap-y-4 mt-9 fade-up"
              style={{ '--delay': '0.75s' }}
            >
              <button onClick={() => scrollTo('work')} className="btn-solid">
                See my work
                <FaArrowDown size={10} />
              </button>
              <button
                onClick={handleDownload}
                className="link-line text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                Download résumé
                <ArrowUpRight size={9} />
              </button>
            </div>
          </div>

          <Portrait />
        </div>

        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 fade-up"
          style={{ '--delay': '0.9s', borderTop: '1px solid var(--border-primary)' }}
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line text-[13px]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {s.label}
              <ArrowUpRight size={8} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portrait() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className="lg:col-span-4">
      {/* Observe the wrapper: the clip-path on .wipe shrinks its own intersection box. */}
      <div ref={ref} className="w-full max-w-[220px] sm:max-w-[260px] mx-auto lg:mr-0 lg:ml-auto">
        <div className={`wipe ${isVisible ? 'is-visible' : ''}`}>
          <div
            className="relative overflow-hidden rounded-full"
            style={{
              aspectRatio: '1 / 1',
              border: '1px solid var(--border-primary)',
            }}
          >
            <img
              src="/mypic.jpg"
              alt="Ayomide Taiwo"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 15%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
