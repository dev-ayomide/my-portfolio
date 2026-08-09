import { useState, useEffect, useMemo, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { ArrowUpRight } from './icons';
import { projectsService } from '../services/projectsService';
import ProjectModal from './ProjectModal';

/**
 * Curated running order. Anything not listed falls in behind, newest first,
 * so new work added from the admin panel still shows up without a code change.
 */
const RUNNING_ORDER = [
  'campor',
  'fusion',
  'seeforme',
  'runacos web design hackathon',
  'gcg3 community platform',
  'kingdom scholars academy website',
  'chart capstone limited website',
  'arbitrum token app',
  'recipe recommender',
  'event ticketing generator',
];

const rank = (project) => {
  const i = RUNNING_ORDER.indexOf((project.title || '').trim().toLowerCase());
  return i === -1 ? RUNNING_ORDER.length + 1 : i;
};

const FEATURED_COUNT = 3;

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error: err } = await projectsService.getProjects();
        if (err) setError('Failed to load projects');
        else setProjects(data || []);
      } catch {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))],
    [projects]
  );

  const ordered = useMemo(() => {
    const list = category === 'All' ? projects : projects.filter((p) => p.category === category);
    return [...list].sort((a, b) => {
      const diff = rank(a) - rank(b);
      if (diff !== 0) return diff;
      return new Date(b.created_at) - new Date(a.created_at);
    });
  }, [projects, category]);

  const featured = ordered.slice(0, FEATURED_COUNT);
  const rest = ordered.slice(FEATURED_COUNT);

  const openModal = (project) => {
    const index = ordered.findIndex((p) => p.id === project.id);
    setSelectedProject(project);
    setSelectedIndex(index === -1 ? 0 : index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 400);
  };

  return (
    <>
      <section id="work" className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="wrap">
          {/* Heading + filters */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-20">
            <div className="max-w-2xl">
              <span className="section-cap">Selected work</span>
              <h2 className="display-lg">
                Things I&apos;ve <span className="serif-italic">built</span>.
              </h2>
              <p className="lede mt-5">
                Client products, hackathon builds and experiments — each one shipped, not mocked up.
                Open any project for the full story.
              </p>
            </div>

            {categories.length > 1 && (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {categories.map((cat) => {
                  const active = cat === category;
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className="link-line font-mono text-[10px] tracking-[0.16em] uppercase"
                      style={{
                        color: active ? 'var(--text-primary)' : 'var(--text-tertiary)',
                      }}
                    >
                      <span className="roll">
                        <span className="roll__inner" data-label={cat}>
                          {cat}
                        </span>
                      </span>
                      <span className="text-[9px]">
                        (
                        {cat === 'All'
                          ? projects.length
                          : projects.filter((p) => p.category === cat).length}
                        )
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {loading && <SkeletonRows />}

          {!loading && error && (
            <div className="py-20 text-center">
              <p className="lede mb-6">{error}</p>
              <button onClick={() => window.location.reload()} className="btn-outline">
                Try again
              </button>
            </div>
          )}

          {!loading && !error && ordered.length === 0 && (
            <p className="lede py-20 text-center">Nothing here yet — check another category.</p>
          )}

          {!loading && !error && ordered.length > 0 && (
            <>
              {/* Featured case studies */}
              <div className="space-y-20 md:space-y-32">
                {featured.map((project, i) => (
                  <FeatureRow
                    key={project.id}
                    project={project}
                    flip={i % 2 === 1}
                    onOpen={() => openModal(project)}
                  />
                ))}
              </div>

              {/* The rest, as an index */}
              {rest.length > 0 && (
                <ProjectIndex projects={rest} onOpen={openModal} />
              )}
            </>
          )}

          {/* GitHub outro */}
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-14"
          >
            <p className="lede">Plenty more experiments live on GitHub.</p>
            <a
              href="https://github.com/dev-ayomide"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline self-start"
            >
              Browse the repos
              <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        projects={ordered}
        currentIndex={selectedIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNavigate={(project, index) => {
          setSelectedProject(project);
          setSelectedIndex(index);
        }}
      />
    </>
  );
}

/* ---------------------------------------------------------------- */

function FeatureRow({ project, flip, onOpen }) {
  const award = project.is_hackathon
    ? [project.hackathon_position, 'Hackathon'].filter(Boolean).join(' · ')
    : null;
  const summary = project.short_summary || project.description;
  const features = (project.key_features || []).slice(0, 3);

  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
      {/* Visual */}
      <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <button
          onClick={onOpen}
          className="group block w-full text-left relative overflow-hidden mono-hover"
          style={{
            border: '1px solid var(--border-primary)',
            background: 'var(--bg-tertiary)',
            aspectRatio: '16 / 10',
          }}
          aria-label={`Open ${project.title} case study`}
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="mono-img absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03]"
          />
          {award && (
            <span
              className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.14em] uppercase px-2.5 py-1"
              style={{ background: 'var(--inv-bg)', color: 'var(--inv-text)' }}
            >
              {award}
            </span>
          )}

          {/* Hover affordance */}
          <span
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'rgba(10,10,10,0.35)' }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-medium transition-transform duration-500 group-hover:translate-y-0 translate-y-2"
              style={{ background: '#fff', color: '#0a0a0a' }}
            >
              View case study
              <FaArrowRight size={9} />
            </span>
          </span>
        </button>
      </div>

      {/* Copy */}
      <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <span className="eyebrow">{project.category || 'Project'}</span>

        <h3 className="display-md mt-3">{project.title}</h3>

        <p
          className="mt-3 text-sm leading-relaxed"
          style={{
            color: 'var(--text-secondary)',
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {summary}
        </p>

        {features.length > 0 && (
          <ul className="mt-5 space-y-2">
            {features.map((feature, i) => (
              <li
                key={i}
                className="flex gap-3 text-[13px]"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span
                  className="mt-2 h-px w-3 flex-shrink-0"
                  style={{ background: 'var(--border-secondary)' }}
                />
                <span className="flex-1">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {project.technologies?.length > 0 && (
          <p
            className="mt-5 font-mono text-[10px] leading-relaxed tracking-[0.06em]"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {project.technologies.join('  ·  ')}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
          <button
            onClick={onOpen}
            className="link-line link-line--static text-[13px] font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            Case study
            <FaArrowRight size={10} />
          </button>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line text-[13px]"
              style={{ color: "var(--text-secondary)" }}
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
              className="link-line text-[13px]"
              style={{ color: "var(--text-secondary)" }}
            >
              GitHub
              <ArrowUpRight size={10} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- */

function ProjectIndex({ projects, onOpen }) {
  const [hovered, setHovered] = useState(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const lastImage = useRef(null);

  // Warm the cache so the hover preview never flashes an empty frame.
  useEffect(() => {
    projects.forEach((project) => {
      if (!project.image) return;
      const img = new Image();
      img.src = project.image;
    });
  }, [projects]);

  const handleMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  if (hovered?.image) lastImage.current = hovered.image;

  return (
    <div className="mt-20 md:mt-32">
      <div className="flex items-baseline justify-between gap-3 mb-6">
        <span className="eyebrow">More work</span>
        <span className="eyebrow">{projects.length} projects</span>
      </div>

      <div
        ref={containerRef}
        className="relative"
        onMouseMove={handleMove}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Cursor-following preview (desktop) */}
        <div
          className="hidden lg:block pointer-events-none absolute z-20 overflow-hidden"
          style={{
            width: '260px',
            aspectRatio: '16 / 10',
            left: pointer.x,
            top: pointer.y,
            transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0.92})`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.35s ease, transform 0.35s ease',
            border: '1px solid var(--border-secondary)',
          }}
        >
          {lastImage.current && (
            <img
              src={lastImage.current}
              alt=""
              className="w-full h-full object-cover object-top"
              style={{ filter: 'grayscale(1)' }}
            />
          )}
        </div>

        {projects.map((project, i) => (
          <button
            key={project.id}
            onClick={() => onOpen(project)}
            onMouseEnter={() => setHovered(project)}
            className="row-invert group w-full text-left grid grid-cols-12 items-center gap-4 py-4 md:py-5"
            style={{
              borderTop: '1px solid var(--border-primary)',
              borderBottom:
                i === projects.length - 1 ? '1px solid var(--border-primary)' : 'none',
            }}
          >
            <span className="col-span-10 md:col-span-5 flex items-baseline gap-3 min-w-0">
              <span className="row-invert__title text-[15px] md:text-lg font-medium tracking-tight truncate">
                {project.title}
              </span>
              {project.is_hackathon && project.hackathon_position && (
                <span className="tag">{project.hackathon_position}</span>
              )}
            </span>

            <span className="row-invert__muted hidden md:block md:col-span-4 font-mono text-[10px] truncate">
              {(project.technologies || []).slice(0, 3).join(' · ')}
            </span>

            <span className="eyebrow row-invert__muted hidden md:block md:col-span-2">
              {project.category || 'Project'}
            </span>

            <span className="row-invert__title col-span-2 md:col-span-1 flex justify-end transition-transform duration-500 group-hover:translate-x-1">
              <ArrowUpRight size={12} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

function SkeletonRows() {
  return (
    <div className="space-y-20">
      {[0, 1].map((i) => (
        <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-pulse">
          <div
            className="lg:col-span-7"
            style={{ background: 'var(--bg-tertiary)', aspectRatio: '16 / 10' }}
          />
          <div className="lg:col-span-5 space-y-4 pt-2">
            <div className="h-3 w-24" style={{ background: 'var(--bg-tertiary)' }} />
            <div className="h-9 w-3/4" style={{ background: 'var(--bg-tertiary)' }} />
            <div className="h-3 w-full" style={{ background: 'var(--bg-tertiary)' }} />
            <div className="h-3 w-5/6" style={{ background: 'var(--bg-tertiary)' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
