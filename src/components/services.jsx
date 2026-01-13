import { useRef, useEffect, useState } from 'react';
import { FaCode, FaMobile, FaRocket, FaLightbulb, FaDatabase, FaBrain } from 'react-icons/fa';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

const services = [
  {
    icon: FaCode,
    title: 'Web Development',
    description: 'Building modern, responsive web applications using React, Next.js, and cutting-edge technologies. From SPAs to full-stack solutions.',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    icon: FaMobile,
    title: 'UI/UX Design',
    description: 'Creating beautiful, intuitive interfaces that prioritize user experience. Pixel-perfect designs that convert visitors into users.',
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.1)',
  },
  {
    icon: FaRocket,
    title: 'Performance Optimization',
    description: 'Optimizing applications for speed and efficiency. Lighthouse scores, Core Web Vitals, and smooth user experiences.',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    icon: FaDatabase,
    title: 'Backend Development',
    description: 'Building robust APIs and server-side solutions with Django, Node.js, and PostgreSQL. Scalable architecture for growing applications.',
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
  },
  {
    icon: FaBrain,
    title: 'AI Integration',
    description: 'Integrating AI and machine learning capabilities into applications. From chatbots to intelligent data processing solutions.',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
  },
  {
    icon: FaLightbulb,
    title: 'Technical Consulting',
    description: 'Providing expert guidance on technology choices, architecture decisions, and best practices for your projects.',
    color: '#EC4899',
    bgColor: 'rgba(236, 72, 153, 0.1)',
  },
];

const technologies = [
  { name: 'HTML', icon: './html.png' },
  { name: 'CSS', icon: './css.png' },
  { name: 'Tailwind', icon: './tailwind.png' },
  { name: 'JavaScript', icon: './javascript.png' },
  { name: 'Vite', icon: './vite.svg' },
  { name: 'React', icon: './react.png' },
  { name: 'Python', icon: './python.png' },
  { name: 'Django', icon: './django.png' },
  { name: 'Figma', icon: './figma.png' },
  { name: 'CorelDraw', icon: './coreldraw.png' },
  { name: 'Photoshop', icon: './photoshop.png' },
];

export default function Services() {
  const [hoveredService, setHoveredService] = useState(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { containerRef: servicesRef, isVisible: servicesVisible, getItemStyle } = useStaggerAnimation(services.length, {
    threshold: 0.1,
    staggerDelay: 100,
  });
  const { ref: techRef, isVisible: techVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      id="services"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
            top: '0%',
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
            Services
          </div>
          <h2 className="section-title">
            What I <span className="text-gradient-static">Offer</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive solutions to bring your digital ideas to life with modern technologies and best practices.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={servicesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                className="group p-8 rounded-2xl transition-all duration-500 cursor-pointer"
                style={{
                  ...getItemStyle(index),
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)',
                  transform: hoveredService === index ? 'translateY(-8px)' : servicesVisible ? 'translateY(0)' : 'translateY(30px)',
                  boxShadow: hoveredService === index ? `0 20px 40px ${service.bgColor}` : 'none',
                }}
                data-cursor="pointer"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: service.bgColor,
                  }}
                >
                  <IconComponent
                    size={24}
                    style={{ color: service.color }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold mb-3 font-display transition-colors duration-300"
                  style={{
                    color: hoveredService === index ? service.color : 'var(--text-primary)',
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="leading-relaxed text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {service.description}
                </p>

                {/* Decorative line */}
                <div
                  className="mt-6 h-1 rounded-full transition-all duration-500"
                  style={{
                    background: service.color,
                    width: hoveredService === index ? '60%' : '30%',
                    opacity: hoveredService === index ? 1 : 0.3,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Technologies Section */}
        <div
          ref={techRef}
          className={`transition-all duration-700 ${
            techVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Tech Header */}
          <div className="text-center mb-12">
            <div className="section-label inline-flex mx-auto">
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-secondary)' }} />
              Tech Stack
            </div>
            <h3
              className="text-2xl md:text-3xl font-bold font-display"
              style={{ color: 'var(--text-primary)' }}
            >
              Technologies I Work With
            </h3>
          </div>

          {/* Tech Grid */}
          <div
            className="p-8 md:p-12 rounded-3xl"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
            }}
          >
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-6 md:gap-8">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-110"
                  style={{
                    opacity: techVisible ? 1 : 0,
                    transform: techVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${index * 50}ms`,
                  }}
                  data-cursor="pointer"
                >
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg"
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-primary)',
                    }}
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-8 h-8 md:w-10 md:h-10 object-contain"
                    />
                  </div>
                  <span
                    className="text-xs font-medium text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
