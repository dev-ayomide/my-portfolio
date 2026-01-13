import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const iconComponents = {
  FaTwitter: FaXTwitter,
  FaGithub,
  FaLinkedin,
  FaInstagram,
};

const SocialIcon = ({ href, icon }) => {
  const IconComponent = iconComponents[icon];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
      style={{
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-primary)',
      }}
      data-cursor="pointer"
    >
      <IconComponent
        size={18}
        className="transition-colors duration-300"
        style={{ color: 'var(--text-secondary)' }}
      />
    </a>
  );
};

export default SocialIcon;
