import { useState, useEffect } from 'react';
import { ArrowUpRight } from './icons';

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const scrollable = document.body.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);

      const ids = ['home', 'about', 'work', 'experience', 'contact'];
      const probe = window.scrollY + window.innerHeight * 0.35;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (probe >= el.offsetTop && probe < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const section = document.getElementById(id);
    if (!section) return;
    const y = section.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="navbar fixed top-0 left-0 right-0 z-40"
        style={{
          background: scrolled
            ? theme === 'dark'
              ? 'rgba(10,10,10,0.72)'
              : 'rgba(255,255,255,0.72)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--border-primary)' : 'transparent'}`,
          transition: 'background 0.4s ease, border-color 0.4s ease, padding 0.4s ease',
          paddingTop: scrolled ? '0.8rem' : '1.25rem',
          paddingBottom: scrolled ? '0.8rem' : '1.25rem',
        }}
      >
        {/* Reading progress */}
        <span
          className="progress-rail"
          style={{ width: '100%', transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
          aria-hidden="true"
        />
        <div className="wrap flex items-center justify-between gap-6">
          {/* Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-baseline gap-2.5 group"
          >
            <span
              className="text-[14px] font-medium tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="roll">
                <span className="roll__inner" data-label="Ayomide Taiwo">
                  Ayomide Taiwo
                </span>
              </span>
            </span>
            <span
              className="hidden sm:inline font-mono text-[9px] tracking-[0.18em] uppercase"
              style={{ color: 'var(--text-tertiary)' }}
            >
              AI-Native Software Engineer
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className="group flex items-baseline gap-1.5 text-[13px]"
                  style={{ color: active ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                >
                  <span className="relative">
                    <span className="roll">
                      <span className="roll__inner" data-label={link.label}>
                        {link.label}
                      </span>
                    </span>
                    <span
                      className="absolute left-0 -bottom-1 h-px bg-current transition-all duration-500"
                      style={{ width: active ? '100%' : '0%' }}
                    />
                  </span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5">
            <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />

            {/* Wrapper handles the breakpoint — .btn-solid sets its own display */}
            <span className="hidden sm:block">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="btn-solid h-9 px-4 text-[12.5px]"
              >
                <span className="roll">
                  <span className="roll__inner" data-label="Let's talk">
                    Let&apos;s talk
                  </span>
                </span>
                <ArrowUpRight size={9} />
              </a>
            </span>

            {/* Mobile trigger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full"
              style={{ border: '1px solid var(--border-secondary)' }}
              aria-label="Open menu"
            >
              <span className="block w-3.5 h-px" style={{ background: 'var(--text-primary)' }} />
              <span className="block w-3.5 h-px" style={{ background: 'var(--text-primary)' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-50 md:hidden"
        style={{
          background: 'var(--inv-bg)',
          color: 'var(--inv-text)',
          clipPath: menuOpen ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
          transition: 'clip-path 0.7s cubic-bezier(0.76,0,0.24,1)',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div className="wrap h-full flex flex-col py-7">
          <div className="flex items-center justify-between">
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ color: 'var(--inv-text-3)' }}
            >
              Menu
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ border: '1px solid var(--inv-line)', color: 'var(--inv-text)' }}
              aria-label="Close menu"
            >
              <span className="relative block w-4 h-4">
                <span
                  className="absolute top-1/2 left-0 w-4 h-px rotate-45"
                  style={{ background: 'currentColor' }}
                />
                <span
                  className="absolute top-1/2 left-0 w-4 h-px -rotate-45"
                  style={{ background: 'currentColor' }}
                />
              </span>
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {navLinks.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className="flex items-baseline gap-4 py-3.5"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${180 + index * 70}ms, transform 0.5s ease ${
                    180 + index * 70
                  }ms`,
                }}
              >
                <span className="text-2xl font-medium tracking-tight">{link.label}</span>
              </a>
            ))}
          </div>

          <div
            className="flex items-center justify-between pt-6"
            style={{ borderTop: '1px solid var(--inv-line)' }}
          >
            <a
              href="mailto:ayomidepaul784@gmail.com"
              className="text-sm"
              style={{ color: 'var(--inv-text-2)' }}
            >
              ayomidepaul784@gmail.com
            </a>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="font-mono text-[10px] tracking-[0.18em] uppercase"
              style={{ color: 'var(--inv-text-3)' }}
            >
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
      style={{ border: '1px solid var(--border-secondary)', color: 'var(--text-primary)' }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {/* Half-filled circle: the monochrome way to say "theme" */}
      <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path
          d={theme === 'dark' ? 'M8 1 A7 7 0 0 1 8 15 Z' : 'M8 1 A7 7 0 0 0 8 15 Z'}
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
