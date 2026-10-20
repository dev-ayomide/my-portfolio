import { useScrollAnimation } from '../hooks/useScrollAnimation';
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiPostgresql,
  SiFastapi,
  SiNestjs,
  SiPrisma,
  SiSqlalchemy,
  SiPytest,
  SiRedis,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiDocker,
  SiLinux,
  SiLangchain,
} from 'react-icons/si';

const groups = [
  {
    label: 'Languages',
    items: [
      { name: 'Python', icon: SiPython },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'SQL', icon: SiPostgresql },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'FastAPI', icon: SiFastapi },
      { name: 'NestJS', icon: SiNestjs },
      { name: 'SQLAlchemy', icon: SiSqlalchemy },
      { name: 'Prisma', icon: SiPrisma },
      { name: 'Pytest', icon: SiPytest },
    ],
  },
  {
    label: 'Data',
    items: [
      { name: 'PostgreSQL + pgvector', icon: SiPostgresql },
      { name: 'Redis', icon: SiRedis },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    label: 'Tools & AI',
    items: [
      { name: 'Git', icon: SiGit },
      { name: 'Docker', icon: SiDocker },
      { name: 'Linux', icon: SiLinux },
      { name: 'LangGraph', icon: SiLangchain },
    ],
  },
];

export default function TechStack() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="toolkit" className="section pt-0" style={{ background: 'var(--bg-primary)' }}>
      <div className="wrap" ref={ref}>
        <span className="section-cap">Toolkit</span>
        <h2 className="display-lg max-w-2xl">What I work with</h2>

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
