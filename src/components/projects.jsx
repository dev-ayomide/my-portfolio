import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaSpinner, FaArrowRight } from 'react-icons/fa';
import { projectsService } from '../services/projectsService';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
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
          console.error('Error:', error);
        } else {
          setProjects(data || []);
        }
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Get unique categories from projects
  const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Handle mouse move for card glow effect
  const handleMouseMove = (e, cardId) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  // Loading state
  if (loading) {
    return (
      <section id="portfolio" className="py-24 md:py-32" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="section-header">
            <div className="section-label">
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-primary)' }} />
              Portfolio
            </div>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              A selection of projects that showcase my skills and passion for building great products.
            </p>
          </div>
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="animate-spin text-4xl" style={{ color: 'var(--accent-primary)' }} />
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="portfolio" className="py-24 md:py-32" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="section-header">
            <div className="section-label">
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-primary)' }} />
              Portfolio
            </div>
            <h2 className="section-title">Featured Projects</h2>
          </div>
          <div className="text-center py-20">
            <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
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
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-[800px] h-[800px] rounded-full opacity-10 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
              top: '50%',
              left: '-20%',
              transform: 'translateY(-50%)',
            }}
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          {/* Section Header */}
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

          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="flex justify-center mb-16">
              <div className="inline-flex items-center gap-3 flex-wrap justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="px-8 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:scale-105"
                    style={{
                      background: selectedCategory === category 
                        ? 'var(--text-primary)' 
                        : 'transparent',
                      color: selectedCategory === category 
                        ? 'var(--bg-primary)' 
                        : 'var(--text-secondary)',
                      border: selectedCategory === category 
                        ? 'none' 
                        : '1px solid var(--border-primary)',
                    }}
                    data-cursor="pointer"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ color: 'var(--text-secondary)' }} className="text-lg">
                No projects found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => openModal(project)}
                  onMouseMove={(e) => handleMouseMove(e, project.id)}
                  onMouseEnter={() => setHoveredCard(project.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="card-glow group cursor-pointer rounded-2xl overflow-hidden"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-primary)',
                    transform: hoveredCard === project.id ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: `${index * 100}ms`,
                    boxShadow: hoveredCard === project.id 
                      ? '0 20px 40px rgba(16, 185, 129, 0.15)' 
                      : 'none',
                    animation: `fadeInUp 0.6s ease-out forwards ${index * 100}ms`,
                    opacity: 0,
                  }}
                  data-cursor="pointer"
                >
                  {/* Project Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay gradient */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(to top, rgba(13, 14, 16, 0.8) 0%, transparent 50%)',
                      }}
                    />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{
                          background: 'rgba(16, 185, 129, 0.9)',
                          color: 'white',
                        }}
                      >
                        {project.category || 'Project'}
                      </span>
                    </div>

                    {/* Quick action buttons - shown on hover */}
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            color: '#0d0e10',
                          }}
                        >
                          <FaGithub size={16} />
                        </a>
                      )}
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          style={{
                            background: 'var(--accent-primary)',
                            color: 'white',
                          }}
                        >
                          <FaExternalLinkAlt size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    {/* Title */}
                    <h3
                      className="text-xl font-bold mb-2 font-display transition-all duration-300"
                      style={{ color: hoveredCard === project.id ? 'var(--accent-primary)' : 'var(--text-primary)' }}
                    >
                      {project.title}
                    </h3>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2.5 py-1 rounded-md text-xs font-medium"
                          style={{
                            background: 'var(--bg-tertiary)',
                            color: 'var(--text-tertiary)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 3 && (
                        <span
                          className="px-2.5 py-1 rounded-md text-xs font-medium"
                          style={{
                            background: 'var(--bg-tertiary)',
                            color: 'var(--accent-primary)',
                          }}
                        >
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed mb-4 line-clamp-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {project.description}
                    </p>

                    {/* View Project Link */}
                    <div
                      className="flex items-center gap-2 text-sm font-semibold group/link"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      View Project
                      <FaArrowRight 
                        size={12} 
                        className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover:translate-x-1" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
