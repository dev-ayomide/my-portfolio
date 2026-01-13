import { FaGithub, FaLinkedin, FaInstagram, FaHeart, FaArrowUp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/dev-ayomide', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/taiwoayomide/', label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://www.instagram.com/dev_ayomide_/', label: 'Instagram' },
  { icon: FaXTwitter, href: 'https://x.com/dev_ayomide', label: 'X (Twitter)' },
];

// const navLinks = [
//   { label: 'Home', href: '#home' },
//   { label: 'Services', href: '#services' },
//   { label: 'Work', href: '#portfolio' },
//   { label: 'Experience', href: '#experience' },
//   { label: 'Contact', href: '#contact' },
// ];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId.replace('#', ''));
    if (section) {
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const y = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative pt-20 pb-8 overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-full h-px top-0"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--accent-primary), var(--accent-secondary), transparent)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-16">
          {/* Brand & Description */}
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/dev_ayomide_logo.png" 
                alt="Dev Ayomide Logo" 
                className="w-12 h-12"
              />
              <span
                className="text-2xl font-bold font-display"
                style={{ color: 'var(--text-primary)' }}
              >
                Dev Ayomide
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Software Engineer passionate about building exceptional digital experiences. 
              Let's create something amazing together.
            </p>
          </div>

          {/* Navigation Links */}
          {/* <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-sm font-medium transition-colors duration-300 hover:text-accent-primary"
                style={{ color: 'var(--text-secondary)' }}
                data-cursor="pointer"
              >
                {link.label}
              </a>
            ))}
          </nav> */}

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-primary)',
                    color: 'var(--text-secondary)',
                  }}
                  aria-label={item.label}
                  data-cursor="pointer"
                >
                  <IconComponent size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ background: 'var(--border-primary)' }}
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p
            className="text-sm flex items-center gap-1"
            style={{ color: 'var(--text-tertiary)' }}
          >
            © {currentYear} Dev Ayomide. Crafted with{' '}
            <FaHeart className="text-accent-500 mx-1" style={{ color: 'var(--accent-primary)' }} size={12} />{' '}
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm font-medium transition-all duration-300"
            style={{ color: 'var(--text-secondary)' }}
            data-cursor="pointer"
          >
            Back to top
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-primary)',
              }}
            >
              <FaArrowUp size={12} style={{ color: 'var(--accent-primary)' }} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
