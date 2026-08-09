import { useScrollAnimation } from '../hooks/useScrollAnimation';
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiPostgresql,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiGreensock,
  SiDjango,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiPrisma,
  SiSupabase,
  SiCloudinary,
  SiVercel,
  SiGit,
  SiFigma,
  SiSocketdotio,
} from 'react-icons/si';

const groups = [
  {
    label: 'Languages',
    items: [
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Python', icon: SiPython },
      { name: 'SQL', icon: SiPostgresql },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Framer Motion', icon: SiFramer },
      { name: 'GSAP', icon: SiGreensock },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Django', icon: SiDjango },
      // { name: 'Node.js', icon: SiNodedotjs },
      // { name: 'Express', icon: SiExpress },
      { name: 'Flask', icon: SiFlask },
      { name: 'Socket.IO', icon: SiSocketdotio },
    ],
  },
  {
    label: 'Data & infra',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Prisma', icon: SiPrisma },
      { name: 'Supabase', icon: SiSupabase },
      { name: 'Cloudinary', icon: SiCloudinary },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Git', icon: SiGit },
    ],
  },
  {
    label: 'Design',
    items: [{ name: 'Figma', icon: SiFigma }],
  },
];

export default function TechStack() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="toolkit" className="section pt-0" style={{ background: 'var(--bg-primary)' }}>
      <div className="wrap" ref={ref}>
        <span className="section-cap">Toolkit</span>
        <h2 className="display-lg max-w-2xl">
          The tools I <span className="serif-italic">reach for</span>.
        </h2>

        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 mt-12 md:mt-16 reveal ${
            isVisible ? 'is-visible' : ''
          }`}
        >
          {groups.map((group) => (
            <div key={group.label}>
              <span className="eyebrow">{group.label}</span>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.name}
                      className="group flex items-center gap-2.5 text-sm cursor-default transition-transform duration-300 hover:translate-x-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <Icon
                        size={14}
                        style={{ color: 'var(--text-tertiary)' }}
                        className="transition-colors duration-300 group-hover:text-inherit"
                      />
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
