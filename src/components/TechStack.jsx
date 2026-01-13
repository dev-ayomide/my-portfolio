import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiPython, 
  SiDjango, 
  SiFlask,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiMongodb,
  SiPostgresql,
  SiSupabase,
  SiVercel,
  SiGit,
  SiDocker,
  SiFigma,
  SiCloudinary
} from 'react-icons/si';

const techStack = [
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'Django', icon: SiDjango, color: '#092E20' },
  // { name: 'Flask', icon: SiFlask, color: '#000000' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
  // { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  // { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
  { name: 'Vercel', icon: SiVercel, color: '#000000' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  // { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Cloudinary', icon: SiCloudinary, color: '#3448C5' },
];

export default function TechStack() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1, delay: 100 });

  return (
    <section
      id="techstack"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
            bottom: '10%',
            left: '-10%',
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="section-label inline-flex mx-auto mb-4">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-primary)' }} />
            Tech Stack
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold font-display mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Technologies I Work With
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Tools and technologies I use to bring ideas to life
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div
          ref={contentRef}
          className={`transition-all duration-700 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="group px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-primary)',
                    transitionDelay: contentVisible ? `${index * 30}ms` : '0ms',
                    opacity: contentVisible ? 1 : 0,
                    transform: contentVisible ? 'translateY(0)' : 'translateY(10px)',
                  }}
                  data-cursor="pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon 
                      size={20} 
                      style={{ 
                        color: 'var(--text-secondary)',
                        transition: 'color 0.3s ease',
                      }}
                      className="group-hover:opacity-80"
                    />
                    <span
                      className="text-sm font-medium whitespace-nowrap"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {tech.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
