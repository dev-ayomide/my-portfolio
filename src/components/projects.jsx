import { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaSpinner, FaArrowRight } from 'react-icons/fa';
import { projectsService } from '../services/projectsService';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await projectsService.getProjects();
        if (error) {
          setError('Failed to load projects');
        } else {
          setProjects(data || []);
        }
      } catch {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const openModal = (project, index) => {
    setSelectedProject(project);
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 400);
  };

  const handleNavigate = (project, index) => {
    setSelectedProject(project);
    setSelectedIndex(index);
  };

  if (loading) {
    return (
      <section id="portfolio" className="py-24 md:py-32" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <SectionHeader />
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="animate-spin text-4xl" style={{ color: 'var(--accent-primary)' }} />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="py-24 md:py-32" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <SectionHeader />
          <div className="text-center py-20">
            <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>{error}</p>
            <button onClick={() => window.location.reload()} className="btn-primary">Try Again</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="portfolio"
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: 'var(--bg-secondary)' }}
      >
        {/* Ambient background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute rounded-full blur-3xl"
            style={{
              width: '650px', height: '650px',
              background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
              top: '10%', right: '-15%',
            }}
          />
          <div
            className="absolute rounded-full blur-3xl"
            style={{
              width: '500px', height: '500px',
              background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)',
              bottom: '5%', left: '-10%',
            }}
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <SectionHeader />

          {/* Category filter */}
          {categories.length > 1 && (
            <div className="flex justify-center mb-16">
              <div
                className="inline-flex items-center gap-1 p-1 rounded-full"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                }}
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300"
                    style={{
                      background: selectedCategory === cat ? 'var(--accent-primary)' : 'transparent',
                      color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
                      boxShadow: selectedCategory === cat ? '0 0 0 3px rgba(16,185,129,0.25)' : 'none',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects grid — uniform 3-col, aspect-[4/3] */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ color: 'var(--text-secondary)' }} className="text-lg">
                No projects found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isHovered={hoveredCard === project.id}
                  onHover={() => setHoveredCard(project.id)}
                  onLeave={() => setHoveredCard(null)}
                  onClick={() => openModal(project, index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        projects={filteredProjects}
        currentIndex={selectedIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNavigate={handleNavigate}
      />

      <style>{`
        @keyframes cardFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerSweep {
          0%   { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateX(220%)  skewX(-15deg); opacity: 0; }
        }
        .project-card .shimmer-layer::after {
          content: '';
          position: absolute;
          top: -50%;
          left: 0;
          width: 60%;
          height: 200%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.075) 50%, transparent 100%);
          transform: translateX(-100%) skewX(-15deg);
          pointer-events: none;
        }
        .project-card:hover .shimmer-layer::after {
          animation: shimmerSweep 0.65s ease-out forwards;
        }
      `}</style>
    </>
  );
}

function ProjectCard({ project, index, isHovered, onHover, onLeave, onClick }) {
  const isHackathon = project.is_hackathon;
  const accentColor = isHackathon ? '#f59e0b' : 'var(--accent-primary)';
  const glowColor   = isHackathon ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.18)';
  const borderColor = isHackathon ? 'rgba(245,158,11,0.5)' : 'rgba(16,185,129,0.45)';

  return (
    <div
      className="project-card relative cursor-pointer rounded-2xl overflow-hidden"
      style={{
        aspectRatio: '4/3',
        border: isHovered ? `1px solid ${borderColor}` : '1px solid var(--border-primary)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 24px 48px ${glowColor}` : '0 2px 12px rgba(0,0,0,0.12)',
        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease, border-color 0.3s ease',
        animation: `cardFadeUp 0.5s ease-out forwards ${index * 80}ms`,
        opacity: 0,
      }}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Shimmer overlay */}
      <div
        className="shimmer-layer"
        style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 5, pointerEvents: 'none', borderRadius: 'inherit' }}
      />

      {/* Full-bleed image */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: isHovered ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1)',
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: isHovered
            ? 'linear-gradient(to top, rgba(4,4,6,0.97) 0%, rgba(4,4,6,0.68) 42%, rgba(4,4,6,0.15) 100%)'
            : 'linear-gradient(to top, rgba(4,4,6,0.92) 0%, rgba(4,4,6,0.48) 38%, rgba(4,4,6,0.06) 100%)',
          transition: 'background 0.4s ease',
        }}
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: '3px',
          background: accentColor,
          transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'bottom',
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          zIndex: 6,
        }}
      />

      {/* Project number — top-left */}
      <div
        className="absolute top-4 left-5 font-mono font-bold select-none z-10"
        style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.2)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Badge — top-right */}
      <div className="absolute top-4 right-4 z-10">
        {isHackathon ? (
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(245,158,11,0.9)', color: '#fff' }}
          >
            🏆 {project.hackathon_position || 'Hackathon'}
          </span>
        ) : project.category ? (
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(16,185,129,0.85)', color: '#fff' }}
          >
            {project.category}
          </span>
        ) : null}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        {/* Description peek — slides up on hover */}
        <div
          style={{
            overflow: 'hidden',
            maxHeight: isHovered ? '52px' : '0px',
            opacity: isHovered ? 1 : 0,
            marginBottom: isHovered ? '8px' : '0',
            transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <p
            className="text-xs leading-relaxed"
            style={{
              color: 'rgba(255,255,255,0.58)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.short_summary || project.description}
          </p>
        </div>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.technologies?.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{
                background: 'rgba(255,255,255,0.09)',
                backdropFilter: 'blur(8px)',
                color: 'rgba(255,255,255,0.72)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 3 && (
            <span className="px-2 py-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Title + action icons */}
        <div className="flex items-end justify-between gap-3">
          <h3
            className="font-bold text-base leading-tight font-display flex-1 min-w-0"
            style={{ color: '#fff' }}
          >
            {project.title}
          </h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(6px)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <FaGithub size={13} />
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: 'var(--accent-primary)', color: '#fff' }}
              >
                <FaExternalLinkAlt size={11} />
              </a>
            )}
          </div>
        </div>

        {/* View Project CTA */}
        <div
          className="flex items-center gap-1.5 mt-2"
          style={{
            color: accentColor,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(4px)',
            transition: 'all 0.3s ease 0.06s',
          }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase">View Project</span>
          <FaArrowRight size={9} />
        </div>
      </div>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="section-header">
      <div className="section-label">
        <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-primary)' }} />
        Portfolio
      </div>
      <h2 className="section-title">
        Featured <span className="text-gradient-static">Projects</span>
      </h2>
      <p className="section-subtitle">
        A selection of projects that showcase my skills and passion for building great digital experiences.
      </p>
    </div>
  );
}
