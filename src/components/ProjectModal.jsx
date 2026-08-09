import { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaXmark } from 'react-icons/fa6';
import { ArrowUpRight } from './icons';

export default function ProjectModal({
  project,
  projects = [],
  currentIndex = 0,
  isOpen,
  onClose,
  onNavigate,
}) {
  const panelRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < projects.length - 1;

  const navigateTo = (index) => {
    if (transitioning || !projects[index]) return;
    setTransitioning(true);
    setTimeout(() => {
      onNavigate(projects[index], index);
      setTransitioning(false);
    }, 180);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) navigateTo(currentIndex - 1);
      if (e.key === 'ArrowRight' && hasNext) navigateTo(currentIndex + 1);
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, hasPrev, hasNext, currentIndex]);

  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0;
    setImageLoaded(false);
  }, [project?.id]);

  if (!project) return null;

  const award = project.is_hackathon
    ? [project.hackathon_position, 'Hackathon'].filter(Boolean).join(' · ')
    : null;
  const hasStory = project.challenge || project.solution || project.impact;
  const features = project.key_features || [];

  return (
    <div
      className="fixed inset-0 z-50"
      style={{
        background: 'var(--bg-primary)',
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        transition: 'opacity 0.35s ease, visibility 0.35s ease',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-90"
        style={{
          background: 'var(--inv-bg)',
          color: 'var(--inv-text)',
        }}
        aria-label="Close"
      >
        <FaXmark size={13} />
      </button>

      <div className="flex h-full">
        {/* Visual panel */}
        <div
          className="hidden md:block relative flex-shrink-0"
          style={{
            width: '52%',
            height: '100vh',
            background: '#0a0a0a',
            opacity: isOpen ? (transitioning ? 0.3 : 1) : 0,
            transition: 'opacity 0.35s ease',
          }}
        >
          {/* Contained so a full page screenshot stays readable, not cropped to a detail */}
          <img
            src={project.image}
            alt={project.title}
            onLoad={() => setImageLoaded(true)}
            className="absolute inset-0 w-full h-full object-contain p-10 mono-img"
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />

          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(10,10,10,0.95) 20%, transparent 100%)',
            }}
          />

          <div className="absolute top-7 left-8 flex items-center gap-3">
            {award && (
              <span
                className="font-mono text-[10px] tracking-[0.14em] uppercase px-2 py-1"
                style={{ background: '#fff', color: '#0a0a0a' }}
              >
                {award}
              </span>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between gap-6">
            <div className="flex flex-wrap gap-3">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300"
                  style={{ background: '#fff', color: '#0a0a0a', border: '1px solid #fff' }}
                >
                  Live site
                  <ArrowUpRight size={10} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
                  style={{
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.4)',
                  }}
                >
                  GitHub
                  <ArrowUpRight size={10} />
                </a>
              )}
            </div>

            {projects.length > 1 && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <NavButton
                  onClick={() => navigateTo(currentIndex - 1)}
                  disabled={!hasPrev}
                  label="Previous project"
                >
                  <FaArrowLeft size={11} />
                </NavButton>
                <NavButton
                  onClick={() => navigateTo(currentIndex + 1)}
                  disabled={!hasNext}
                  label="Next project"
                >
                  <FaArrowRight size={11} />
                </NavButton>
              </div>
            )}
          </div>
        </div>

        {/* Content panel */}
        <div
          ref={panelRef}
          className="flex-1 overflow-y-auto h-full"
          style={{
            background: 'var(--bg-primary)',
            opacity: isOpen ? (transitioning ? 0.3 : 1) : 0,
            transition: 'opacity 0.35s ease',
          }}
        >
          {/* Mobile visual */}
          <div
            className="md:hidden relative w-full overflow-hidden"
            style={{ height: '56vw', minHeight: '210px' }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-top mono-img"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent 65%)' }}
            />
            {award && (
              <span
                className="absolute bottom-4 left-5 font-mono text-[10px] tracking-[0.14em] uppercase px-2 py-1"
                style={{ background: '#fff', color: '#0a0a0a' }}
              >
                {award}
              </span>
            )}
          </div>

          <div className="px-6 md:px-12 lg:px-16 py-10 md:py-16 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="eyebrow">{project.category || 'Project'}</span>
            </div>

            <h2 className="display-md mt-4">{project.title}</h2>

            {project.short_summary && (
              <p className="lede mt-4">{project.short_summary}</p>
            )}

            <div className="rule my-9" />

            <Block label="Overview">
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>
            </Block>

            {features.length > 0 && (
              <Block label="Key features">
                <ul>
                  {features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex gap-4 py-3 text-sm leading-relaxed"
                      style={{
                        borderTop: '1px solid var(--border-primary)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <span
                        className="mt-2.5 h-px w-3 flex-shrink-0"
                        style={{ background: 'var(--border-secondary)' }}
                      />
                      <span className="flex-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {hasStory && (
              <Block label="The story">
                <div className="space-y-6">
                  {project.challenge && <Story label="Challenge" body={project.challenge} />}
                  {project.solution && <Story label="Solution" body={project.solution} />}
                  {project.impact && <Story label="Impact" body={project.impact} />}
                </div>
              </Block>
            )}

            {project.technologies?.length > 0 && (
              <Block label="Built with">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </Block>
            )}

            {/* Mobile actions */}
            <div className="md:hidden flex flex-wrap gap-3 pt-4">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-solid"
                >
                  Live site
                  <ArrowUpRight size={10} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  GitHub
                  <ArrowUpRight size={10} />
                </a>
              )}
            </div>

            {/* Mobile pager */}
            {projects.length > 1 && (
              <div
                className="md:hidden flex items-center justify-between mt-10 pt-6"
                style={{ borderTop: '1px solid var(--border-primary)' }}
              >
                <button
                  onClick={() => navigateTo(currentIndex - 1)}
                  disabled={!hasPrev}
                  className="link-line text-sm disabled:opacity-30"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <FaArrowLeft size={10} /> Prev
                </button>
                <span className="eyebrow">
                  {currentIndex + 1} of {projects.length}
                </span>
                <button
                  onClick={() => navigateTo(currentIndex + 1)}
                  disabled={!hasNext}
                  className="link-line text-sm disabled:opacity-30"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Next <FaArrowRight size={10} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({ onClick, disabled, label, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
      style={{
        border: '1px solid rgba(255,255,255,0.35)',
        color: disabled ? 'rgba(255,255,255,0.3)' : '#fff',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function Block({ label, children }) {
  return (
    <section className="mb-10">
      <p className="eyebrow mb-4">{label}</p>
      {children}
    </section>
  );
}

function Story({ label, body }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <span className="eyebrow col-span-12 sm:col-span-3 pt-1">{label}</span>
      <p
        className="col-span-12 sm:col-span-9 text-sm leading-relaxed"
        style={{ color: 'var(--text-secondary)' }}
      >
        {body}
      </p>
    </div>
  );
}
