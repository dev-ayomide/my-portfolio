import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1, delay: 200 });

  return (
    <section
      id="about"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
            top: '10%',
            right: '-10%',
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`section-header transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="section-label">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-primary)' }} />
            About
          </div>
          <h2 className="section-title">
            Get To Know <span className="text-gradient-static">Me</span>
          </h2>
          <p className="section-subtitle">
            Building solid and scalable products with exceptional user experiences.
          </p>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="space-y-3">
            {/* <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              I like to craft solid and scalable products with exceptional user experiences, 
              focusing on innovation and problem-solving across various industries.
            </p> */}

            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              I'm Taiwo Ayomide, a software developer with experience in web development, 
              AI integration, and blockchain technologies. I specialize in building modern, responsive 
              applications using React, Next.js, TypeScript, and Django, with a strong focus on creating 
              performant and accessible solutions. From AI-powered tools like SeeForMe for visually 
              impaired users to blockchain projects like my Arbitrum Token Management Hub, I enjoy 
              tackling diverse technical challenges.
            </p>

            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Currently pursuing my B.Sc. in Computer Science at Redeemer's University  
              while actively freelancing, shipping for hackathons. I'm passionate about continuous learning 
              and building products. I'm also the Co-Founder at Campor, 
              a campus-based marketplace platform. When I'm not coding, you'll find me reading, scrolling X or IG lol.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
