import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter, FaEnvelope } from 'react-icons/fa6';

const links = [
  { icon: FaXTwitter, href: 'https://x.com/dev_ayomide', label: 'X' },
  { icon: FaInstagram, href: 'https://www.instagram.com/dev_ayomide_/', label: 'Instagram' },
  { icon: FaGithub, href: 'https://github.com/dev-ayomide', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/taiwoayomide/', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:ayomidepaul784@gmail.com', label: 'Email' },
];

/** 2026 → MMXXVI */
const toRoman = (year) => {
  const map = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let rest = year;
  return map.reduce((out, [value, numeral]) => {
    while (rest >= value) {
      out += numeral;
      rest -= value;
    }
    return out;
  }, '');
};

export default function Footer() {
  return (
    <footer className="inverted pb-12">
      <div className="wrap">
        <div className="rule-inv" />

        <div className="flex flex-col items-center gap-6 pt-12 text-center">
          <p className="text-sm" style={{ color: 'var(--inv-text-2)' }}>
            © {toRoman(new Date().getFullYear())} • Ayomide Taiwo • All rights reserved
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
                  className="transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ color: 'var(--inv-text-2)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--inv-text)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--inv-text-2)';
                  }}
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
