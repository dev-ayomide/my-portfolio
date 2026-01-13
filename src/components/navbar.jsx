import { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ['home', 'about', 'portfolio', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const y = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`navbar fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          background: scrolled
            ? theme === 'dark'
              ? 'rgba(13, 14, 16, 0.8)'
              : 'rgba(250, 250, 250, 0.8)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="group"
            >
              <span
                className="text-xl font-bold font-display"
                style={{ color: 'var(--text-primary)' }}
              >
                Dev Ayomide
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group overflow-hidden"
                  style={{
                    color: activeSection === link.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {/* Hover background */}
                  <span
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    style={{ background: 'var(--bg-tertiary)' }}
                  />
                  {/* Label */}
                  <span className="relative z-10">{link.label}</span>
                  {/* Active indicator */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                      activeSection === link.id ? 'w-6 opacity-100' : 'w-0 opacity-0'
                    }`}
                    style={{ background: 'var(--accent-primary)' }}
                  />
                </a>
              ))}
            </div>

            {/* Right side - Theme toggle & Menu */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle - Desktop Only */}
              <button
                onClick={toggleTheme}
                className="hidden md:flex relative w-12 h-12 rounded-xl items-center justify-center transition-all duration-300 hover:scale-105"
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-primary)',
                }}
                aria-label="Toggle theme"
              >
                <FaSun
                  className={`absolute transition-all duration-500 ${
                    theme === 'light'
                      ? 'rotate-0 opacity-100'
                      : 'rotate-90 opacity-0'
                  }`}
                  size={18}
                />
                <FaMoon
                  className={`absolute transition-all duration-500 ${
                    theme === 'dark'
                      ? 'rotate-0 opacity-100'
                      : '-rotate-90 opacity-0'
                  }`}
                  size={18}
                />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-primary)',
                }}
                aria-label="Open menu"
              >
                <FaBars size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(13, 14, 16, 0.95)',
            backdropFilter: 'blur(20px)',
          }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute inset-y-0 right-0 w-full max-w-sm transition-transform duration-500 ease-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            background: 'var(--bg-secondary)',
            borderLeft: '1px solid var(--border-primary)',
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
            style={{
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-primary)',
            }}
            aria-label="Close menu"
          >
            <FaTimes size={18} />
          </button>

          {/* Mobile Links */}
          <div className="flex flex-col h-full justify-center px-8 space-y-2">
            {navLinks.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className="py-4 text-3xl font-bold font-display transition-all duration-300 hover:translate-x-2"
                style={{
                  color: activeSection === link.id ? 'var(--accent-primary)' : 'var(--text-primary)',
                  transitionDelay: `${index * 50}ms`,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Theme Toggle */}
            <div className="pt-8 flex items-center gap-4">
              <span style={{ color: 'var(--text-secondary)' }} className="text-sm">
                Theme
              </span>
              <button
                onClick={toggleTheme}
                className="w-16 h-8 rounded-full relative transition-all duration-300"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                }}
              >
                <div
                  className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
                    theme === 'dark' ? 'left-1' : 'left-8'
                  }`}
                  style={{ background: 'var(--accent-primary)' }}
                >
                  {theme === 'dark' ? (
                    <FaMoon size={12} color="white" />
                  ) : (
                    <FaSun size={12} color="white" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
