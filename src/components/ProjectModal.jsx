import { useEffect, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaLightbulb, FaRocket, FaChartLine } from 'react-icons/fa';

export default function ProjectModal({ project, isOpen, onClose }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!project) return null;

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className={`modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 ${
        isOpen ? 'active' : ''
      }`}
      style={{
        background: 'rgba(13, 14, 16, 0.7)',
        backdropFilter: 'blur(12px)',
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-primary)',
          opacity: 0.98,
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
          style={{
            background: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
          }}
          aria-label="Close modal"
        >
          <FaTimes size={18} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
          {/* Project Image Header */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 100%)',
              }}
            />
            
            {/* Category Badge */}
            <div className="absolute bottom-6 left-6">
              <span
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: 'var(--accent-primary)',
                  color: 'white',
                }}
              >
                {project.category || 'Web Development'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 space-y-8">
            {/* Title and Tech Stack */}
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4 font-display"
                style={{ color: 'var(--text-primary)' }}
              >
                {project.title}
              </h2>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium"
                    style={{
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-primary)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <p
                className="text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {project.description}
              </p>
            </div>

            {/* Challenge, Solution, Impact Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* The Challenge */}
              {project.challenge && (
                <div
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-primary)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(16, 185, 129, 0.1)' }}
                    >
                      <FaLightbulb className="text-accent-500" style={{ color: '#10b981' }} />
                    </div>
                    <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                      The Challenge
                    </h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}

              {/* The Solution */}
              {project.solution && (
                <div
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-primary)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(6, 182, 212, 0.1)' }}
                    >
                      <FaRocket style={{ color: '#06b6d4' }} />
                    </div>
                    <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                      The Solution
                    </h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}

              {/* The Impact */}
              {project.impact && (
                <div
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-primary)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(16, 185, 129, 0.1)' }}
                    >
                      <FaChartLine style={{ color: '#10B981' }} />
                    </div>
                    <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                      The Impact
                    </h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">
                    {project.impact}
                  </p>
                </div>
              )}
            </div>

            {/* If no challenge/solution/impact, show extended description */}
            {!project.challenge && !project.solution && !project.impact && (
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                }}
              >
                <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--text-primary)' }}>
                  About This Project
                </h3>
                <p style={{ color: 'var(--text-secondary)' }} className="leading-relaxed">
                  {project.fullDescription || project.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-3 group"
                >
                  <FaExternalLinkAlt className="transition-transform group-hover:translate-x-1" />
                  View Live Project
                </a>
              )}
              
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-3 group"
                >
                  <FaGithub size={18} />
                  View Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--bg-tertiary);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--accent-primary);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--accent-secondary);
        }
      `}</style>
    </div>
  );
}
