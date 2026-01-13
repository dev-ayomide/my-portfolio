import { useState } from 'react';
import { FaBriefcase, FaGraduationCap, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

const experiences = [
  {
    id: 1,
    role: 'Co-Founder',
    company: 'Campor',
    location: 'Remote',
    period: 'Oct 2025 - Present',
    description: 'Co-founded Campor, a campus-based online marketplace that enables students to buy, sell, and trade goods and services safely within the university. Leading frontend development and product design.',
    achievements: [
      'Co-founded and launched campus marketplace platform',
      'Built secure, user-friendly interface for student transactions',
      'Established safe trading ecosystem within university',
    ],
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Supabase'],
    type: 'work',
  },
  {
    id: 2,
    role: 'Freelance Frontend Developer',
    company: 'Self-Employed',
    location: 'Remote',
    period: 'Jan 2022 - Present',
    description: 'Designing and building modern, responsive websites for various clients across different industries. Focus on creating performant, accessible, and visually appealing web experiences.',
    achievements: [
      'Delivered 10+ successful client projects',
      'Improved website performance scores by 40% on average',
      'Established long-term partnerships with 5 recurring clients',
    ],
    technologies: ['React', 'Tailwind CSS', 'Django', 'TypeScript'],
    type: 'work',
  },
  {
    id: 3,
    role: 'Frontend Developer Intern',
    company: 'HNG',
    location: 'Remote',
    period: 'Feb 2024 – March 2024',
    description: 'Worked on fast-paced frontend projects in a competitive internship environment. Built an AI-powered text processing tool using Chrome\'s AI APIs.',
    achievements: [
      'Built AI-powered translation & summarization tool',
      'Collaborated with 50+ developers in agile sprints',
      'Completed all project milestones ahead of schedule',
    ],
    technologies: ['React', 'Tailwind CSS', 'Chrome AI APIs'],
    type: 'work',
  },
  {
    id: 4,
    role: 'Full-Stack Developer Intern',
    company: 'JETA Communications',
    location: 'Ogun, Nigeria',
    period: 'Oct 2022 - Aug 2023',
    description: 'Gained comprehensive hands-on experience in full-stack development. Developed multiple production-ready web projects including a CBT application.',
    achievements: [
      'Built a complete CBT application from scratch',
      'Developed responsive landing pages for clients',
      'Collaborated on team dictionary application project',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'Django'],
    type: 'work',
  },
  {
    id: 5,
    role: 'Stackie (Developer)',
    company: 'StackUp',
    location: 'Remote',
    period: 'Jan 2024 - Present',
    description: 'Active participant in technical quests and bounty challenges. Continuously enhancing skills through practical projects and hackathon participation.',
    achievements: [
      'Completed 20+ technical quests',
      'Built Recipe Recommender App during hackathon',
      'Earned recognition for AI integration projects',
    ],
    technologies: ['React', 'AI/ML', 'API Integration'],
    type: 'work',
  },
];

const education = {
  degree: 'B.Sc. Computer Science',
  school: "Redeemer's University",
  location: 'Ede, Osun State',
  period: 'Oct 2023 – Oct 2027',
  status: 'Expected October 2027',
  description: 'Pursuing a comprehensive Computer Science degree with focus on software engineering, algorithms, and emerging technologies.',
  highlights: [
    'Participating in coding competitions',
    'Building projects alongside coursework',
  ],
};

export default function Experience() {
  const [hoveredExp, setHoveredExp] = useState(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { containerRef: expRef, isVisible: expVisible, getItemStyle } = useStaggerAnimation(experiences.length, {
    threshold: 0.1,
    staggerDelay: 150,
  });
  const { ref: eduRef, isVisible: eduVisible } = useScrollAnimation({ threshold: 0.2, delay: 200 });

  return (
    <section
      id="experience"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            bottom: '10%',
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
            Experience
          </div>
          <h2 className="section-title">
            My <span className="text-gradient-static">Journey</span>
          </h2>
          <p className="section-subtitle">
            A timeline of my professional growth and the experiences that shaped my development career.
          </p>
        </div>

        {/* Experience Timeline */}
        <div ref={expRef} className="relative mb-24">
          {/* Timeline Line */}
          <div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{
              background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary))',
              transform: 'translateX(-50%)',
            }}
          />

          {/* Experience Items */}
          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                style={getItemStyle(index)}
                onMouseEnter={() => setHoveredExp(exp.id)}
                onMouseLeave={() => setHoveredExp(null)}
              >
                {/* Timeline Dot */}
                <div
                  className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full hidden md:block transition-all duration-300"
                  style={{
                    background: hoveredExp === exp.id ? 'var(--accent-primary)' : 'var(--bg-card)',
                    border: '3px solid var(--accent-primary)',
                    transform: 'translateX(-50%)',
                    boxShadow: hoveredExp === exp.id ? '0 0 20px rgba(16, 185, 129, 0.5)' : 'none',
                  }}
                />

                {/* Card */}
                <div
                  className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}
                >
                  <div
                    className="p-6 md:p-8 rounded-2xl transition-all duration-500"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-primary)',
                      transform: hoveredExp === exp.id ? 'translateY(-4px)' : 'translateY(0)',
                      boxShadow: hoveredExp === exp.id ? '0 20px 40px rgba(16, 185, 129, 0.1)' : 'none',
                    }}
                    data-cursor="pointer"
                  >
                    {/* Role & Company */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3
                          className="text-xl font-bold font-display mb-1"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {exp.role}
                        </h3>
                        <p
                          className="font-semibold"
                          style={{ color: 'var(--accent-primary)' }}
                        >
                          {exp.company}
                        </p>
                      </div>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'rgba(16, 185, 129, 0.1)',
                        }}
                      >
                        <FaBriefcase style={{ color: 'var(--accent-primary)' }} size={20} />
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div
                        className="flex items-center gap-2 text-sm"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        <FaCalendar size={12} />
                        {exp.period}
                      </div>
                      <div
                        className="flex items-center gap-2 text-sm"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        <FaMapMarkerAlt size={12} />
                        {exp.location}
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ background: 'var(--accent-primary)' }}
                          />
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg text-xs font-medium"
                          style={{
                            background: 'var(--bg-tertiary)',
                            color: 'var(--text-tertiary)',
                            border: '1px solid var(--border-primary)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        {/* <div
          ref={eduRef}
          className={`transition-all duration-700 ${
            eduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Education Header */}
          {/* <div className="text-center mb-12">
            <div className="section-label inline-flex mx-auto">
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-secondary)' }} />
              Education
            </div>
            <h3
              className="text-2xl md:text-3xl font-bold font-display"
              style={{ color: 'var(--text-primary)' }}
            >
              Academic Background
            </h3>
          </div> */}

          {/* Education Card */}
          {/* <div
            className="max-w-3xl mx-auto p-8 md:p-10 rounded-3xl"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
            }}
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              {/* Icon */}
              {/* <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))',
                  border: '1px solid var(--border-primary)',
                }}
              >
                <FaGraduationCap size={32} style={{ color: 'var(--accent-secondary)' }} />
              </div> */}

              {/* Content */}
              {/* <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3
                    className="text-2xl font-bold font-display"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {education.school}
                  </h3>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: 'rgba(6, 182, 212, 0.1)',
                      color: 'var(--accent-secondary)',
                    }}
                  >
                    {education.status}
                  </span>
                </div>

                <p
                  className="text-lg font-semibold mb-2"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  {education.degree}
                </p>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    <FaCalendar size={12} />
                    {education.period}
                  </div>
                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    <FaMapMarkerAlt size={12} />
                    {education.location}
                  </div>
                </div>

                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {education.description}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {education.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: 'var(--accent-secondary)' }}
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div> */}
            {/* </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
