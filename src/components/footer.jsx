import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter, FaEnvelope } from 'react-icons/fa6';

const links = [
  { icon: FaXTwitter, href: 'https://x.com/dev_ayomide', label: 'X' },
  { icon: FaInstagram, href: 'https://www.instagram.com/dev_ayomide_/', label: 'Instagram' },
  { icon: FaGithub, href: 'https://github.com/dev-ayomide', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/taiwoayomide/', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:ayomidepaul784@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="inverted pb-12">
      <div className="wrap">
        <div className="rule-inv" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10">
          <p className="text-sm" style={{ color: 'var(--inv-text-2)' }}>
            © {new Date().getFullYear()} Ayomide Taiwo
          </p>

          <div className="flex items-center gap-7">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="transition-opacity duration-300 opacity-60 hover:opacity-100"
                  style={{ color: 'var(--inv-text)' }}
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
