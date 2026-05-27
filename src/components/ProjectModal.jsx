import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaTrophy, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ProjectModal({ project, projects = [], currentIndex = 0, isOpen, onClose, onNavigate }) {
  const rightPanelRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < projects.length - 1;

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    const handleArrows = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft' && hasPrev) navigateTo(currentIndex - 1);
      if (e.key === 'ArrowRight' && hasNext) navigateTo(currentIndex + 1);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleArrows);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleArrows);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, hasPrev, hasNext, currentIndex]);

  // Reset scroll position when project changes
  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = 0;
    }
    setImageLoaded(false);
  }, [project?.id]);

  const navigateTo = (index) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      onNavigate(projects[index], index);
      setTransitioning(false);
    }, 180);
  };

  if (!project) return null;

  const hasDetailSections = project.challenge || project.solution || project.impact;
  const hasKeyFeatures = project.key_features?.length > 0;
  const isHackathon = project.is_hackathon;
  const accentColor = isHackathon ? '#f59e0b' : 'var(--accent-primary)';

  return (
    <div
      className="fixed inset-0 z-50"
      style={{
        background: 'rgba(0,0,0,0.96)',
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease',
      }}
    >
      {/* Close button — floats above both panels */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 z-30 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90"
        style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
        aria-label="Close"
      >
        <FaTimes size={13} />
      </button>

      {/* Two-panel layout */}
      <div
        className="flex h-full"
        style={{ maxWidth: '100vw' }}
      >
        {/* ── LEFT PANEL — sticky image ── */}
        <div
          className="hidden md:flex relative flex-shrink-0 flex-col"
          style={{
            width: '55%',
            height: '100vh',
            transform: isOpen ? 'translateX(0)' : 'translateX(-32px)',
            opacity: isOpen ? (transitioning ? 0.4 : 1) : 0,
            transition: transitioning
              ? 'opacity 0.18s ease'
              : 'transform 0.45s cubic-bezier(0.4,0,0.2,1) 0.05s, opacity 0.45s ease 0.05s',
          }}
        >
          {/* Image */}
          <img
            src={project.image}
            alt={project.title}
            onLoad={() => setImageLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.35) 100%)',
            }}
          />

          {/* Top meta — project number + category */}
          <div className="absolute top-6 left-8 flex items-center gap-3 z-10">
            <span
              className="font-mono text-xs font-bold"
              style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em' }}
            >
              {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            {project.category && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>·</span>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: accentColor }}
                >
                  {project.category}
                </span>
              </>
            )}
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-10 space-y-4">
            {/* Hackathon badge */}
            {isHackathon && (
              <div
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{
                  background: 'rgba(245,158,11,0.15)',
                  border: '1px solid rgba(245,158,11,0.3)',
                }}
              >
                <FaTrophy style={{ color: '#f59e0b' }} size={12} />
                <span className="text-xs font-semibold" style={{ color: '#fbbf24' }}>
                  Hackathon{project.hackathon_position ? ` · ${project.hackathon_position}` : ''}
                </span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 flex-wrap">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 hover:brightness-110"
                  style={{ background: 'var(--accent-primary)', color: '#fff' }}
                >
                  <FaExternalLinkAlt size={11} />
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <FaGithub size={14} />
                  GitHub
                </a>
              )}
            </div>

            {/* Prev / Next navigation */}
            {projects.length > 1 && (
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => hasPrev && navigateTo(currentIndex - 1)}
                  disabled={!hasPrev}
                  className="flex items-center gap-2 text-xs font-semibold transition-all duration-200"
                  style={{
                    color: hasPrev ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
                    cursor: hasPrev ? 'pointer' : 'not-allowed',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: hasPrev ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <FaChevronLeft size={11} />
                  </div>
                  Prev
                </button>
                <button
                  onClick={() => hasNext && navigateTo(currentIndex + 1)}
                  disabled={!hasNext}
                  className="flex items-center gap-2 text-xs font-semibold transition-all duration-200"
                  style={{
                    color: hasNext ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
                    cursor: hasNext ? 'pointer' : 'not-allowed',
                  }}
                >
                  Next
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: hasNext ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <FaChevronRight size={11} />
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL — scrollable content ── */}
        <div
          ref={rightPanelRef}
          className="flex-1 overflow-y-auto modal-scrollbar h-full"
          style={{
            background: '#0d0e10',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
            transform: isOpen ? 'translateX(0)' : 'translateX(32px)',
            opacity: isOpen ? (transitioning ? 0.4 : 1) : 0,
            transition: transitioning
              ? 'opacity 0.18s ease'
              : 'transform 0.45s cubic-bezier(0.4,0,0.2,1) 0.1s, opacity 0.45s ease 0.1s',
          }}
        >
          {/* Mobile image */}
          <div
            className="md:hidden relative w-full overflow-hidden"
            style={{ height: '52vw', minHeight: '200px' }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }}
            />
            {/* Mobile prev/next */}
            {projects.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-10">
                <button
                  onClick={() => hasPrev && navigateTo(currentIndex - 1)}
                  disabled={!hasPrev}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: hasPrev ? '#fff' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  <FaChevronLeft size={12} />
                </button>
                <span className="flex items-center text-xs font-mono" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {currentIndex + 1} / {projects.length}
                </span>
                <button
                  onClick={() => hasNext && navigateTo(currentIndex + 1)}
                  disabled={!hasNext}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: hasNext ? '#fff' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  <FaChevronRight size={12} />
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="px-8 md:px-10 py-10 md:py-12 space-y-8" style={{ paddingRight: '24px' }}>

            {/* Header */}
            <div>
              {/* Project number + category — mobile only (desktop shows in left panel) */}
              <div className="md:hidden flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                {project.category && (
                  <>
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>·</span>
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accentColor }}>
                      {project.category}
                    </span>
                  </>
                )}
              </div>

              <h2
                className="text-3xl md:text-4xl font-bold font-display leading-tight mb-2"
                style={{ color: '#fff' }}
              >
                {project.title}
              </h2>

              {project.short_summary && (
                <p
                  className="text-sm md:text-base leading-relaxed italic"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {project.short_summary}
                </p>
              )}

              {/* Mobile hackathon badge */}
              {isHackathon && (
                <div
                  className="md:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-xl mt-3"
                  style={{
                    background: 'rgba(245,158,11,0.12)',
                    border: '1px solid rgba(245,158,11,0.25)',
                  }}
                >
                  <FaTrophy style={{ color: '#f59e0b' }} size={11} />
                  <span className="text-xs font-semibold" style={{ color: '#fbbf24' }}>
                    {project.hackathon_position || 'Hackathon'}
                  </span>
                </div>
              )}
            </div>

            <Divider />

            {/* Tech Stack */}
            <Section label="Tech Stack">
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.72)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Section>

            {/* About */}
            <Section label="About">
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
                {project.description}
              </p>
            </Section>

            {/* Key Features */}
            {hasKeyFeatures && (
              <Section label="Key Features">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.key_features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}
                    >
                      <span
                        className="flex-shrink-0 text-xs font-bold font-mono leading-none mt-0.5"
                        style={{ color: accentColor, minWidth: '18px' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.58)' }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* The Story */}
            {hasDetailSections && (
              <Section label="The Story">
                <div className="relative">
                  <div
                    className="absolute left-[15px] top-5 bottom-5 w-px"
                    style={{
                      background: 'linear-gradient(to bottom, var(--accent-primary), rgba(6,182,212,0.35), transparent)',
                    }}
                  />
                  <div className="space-y-5">
                    {project.challenge && (
                      <NarrativeStep dot="rgba(16,185,129,0.9)" label="Challenge" body={project.challenge} />
                    )}
                    {project.solution && (
                      <NarrativeStep dot="rgba(6,182,212,0.9)" label="Solution" body={project.solution} />
                    )}
                    {project.impact && (
                      <NarrativeStep dot="rgba(16,185,129,0.9)" label="Impact" body={project.impact} />
                    )}
                  </div>
                </div>
              </Section>
            )}

            {/* Fallback */}
            {!hasDetailSections && !hasKeyFeatures && (
              <Section label="More Details">
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
                  {project.fullDescription || project.description}
                </p>
              </Section>
            )}

            {/* Footer CTA — mobile only (desktop has buttons in left panel) */}
            <div className="md:hidden flex gap-3 flex-wrap pt-2">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                  style={{ background: 'var(--accent-primary)', color: '#fff' }}
                >
                  <FaExternalLinkAlt size={11} />
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <FaGithub size={14} />
                  GitHub
                </a>
              )}
            </div>

            {/* Bottom spacer */}
            <div style={{ height: '24px' }} />
          </div>
        </div>
      </div>

      <style>{`
        .modal-scrollbar::-webkit-scrollbar { width: 4px; }
        .modal-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .modal-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16,185,129,0.4);
          border-radius: 4px;
        }
        .modal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16,185,129,0.7);
        }
      `}</style>
    </div>
  );
}

function Divider() {
  return <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />;
}

function Section({ label, children }) {
  return (
    <div>
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function NarrativeStep({ dot, label, body }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: '30px' }}>
        <div
          className="w-[10px] h-[10px] rounded-full flex-shrink-0 mt-1"
          style={{ background: dot, boxShadow: `0 0 8px ${dot}` }}
        />
      </div>
      <div className="pb-1">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          {label}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {body}
        </p>
      </div>
    </div>
  );
}
