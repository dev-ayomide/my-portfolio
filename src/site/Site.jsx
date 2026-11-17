import { useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { mountSite, renderCase, setNavigate, setProjects } from './engine';
import { loadProjects } from './lib/projects';
import './site.css';

// Projects load once per visit and are shared by the home page and case-study pages.
let projectsPromise = null;
const getProjects = () => (projectsPromise ||= loadProjects().catch(() => []));

const scrollToHash = (hash) => {
  const el = hash && document.getElementById(hash.replace('#', ''));
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/** Shared chrome: pill nav, ⌘K palette, toast, footer. */
export function SiteLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme = 'dark';
    html.dataset.type = 'serif';
    setNavigate((to) => navigate(to));
    // Links rendered by the engine carry data-nav for client-side routing.
    const onClick = (e) => {
      const a = e.target.closest('[data-nav]');
      if (!a || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      navigate(a.dataset.nav);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  const go = (e, id) => {
    e.preventDefault();
    if (pathname === '/') scrollToHash(`#${id}`);
    else navigate(`/#${id}`);
  };

  return (
    <div className="site">
      <nav className="pillnav" aria-label="Primary">
        <span className="pn-hl" id="pnhl" />
        <a href="/" className="pn-mark" aria-label="Home" onClick={(e) => { e.preventDefault(); navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>A</a>
        {[['about', 'About'], ['work', 'Work'], ['experience', 'Experience']].map(([id, label]) => (
          <a key={id} className="pn-l" data-target={id} href={`/#${id}`} onClick={(e) => go(e, id)}>{label}</a>
        ))}
        <button className="pn-k" id="kbtn" aria-label="Open command menu">⌘K</button>
        <a className="pn-cta" href="/#contact" onClick={(e) => go(e, 'contact')}>
          <span className="roll"><span>Hire me</span><span aria-hidden="true">Hire me</span></span>
        </a>
      </nav>

      <Outlet />

      <footer className="f">
        <div className="wrap">
          <span>© {new Date().getFullYear()} Ayomide Taiwo · Lagos <span id="clock" /></span>
          <span><a className="link" href="/llms.txt">llms.txt</a></span>
        </div>
      </footer>

      <div className="peek" id="peek"><img alt="" /></div>
      <div className="pal" id="pal" role="dialog" aria-modal="true" aria-label="Command menu">
        <div className="pal-p"><input id="palIn" placeholder="Type a command…" autoComplete="off" /><ul id="palList" /></div>
      </div>
      <div className="toast" id="toast" role="status" />
    </div>
  );
}

/** Home: hero (photo → globe), about, work index, experience, contact. */
export function Home() {
  const navigate = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    document.title = 'Ayomide Taiwo — AI Engineer';
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://devayomide.vercel.app/');
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Ayomide Taiwo is an AI-native software engineer in Lagos who builds retrieval systems, LLM assistants and AI agents with guardrails, using Python, TypeScript, pgvector and LangGraph.');
    const off = mountSite((to) => navigate(to));
    let alive = true;
    getProjects().then((list) => {
      if (!alive) return;
      setProjects(list);
      requestAnimationFrame(() => scrollToHash(window.location.hash));
    });
    return () => { alive = false; off(); };
  }, [navigate]);

  useEffect(() => { if (hash) requestAnimationFrame(() => scrollToHash(hash)); }, [hash]);

  return (
    <main>
      <section id="s-hero" />
      <section id="s-about" />
      <section id="s-work" />
      <section id="s-exp" />
      <section id="s-contact" />
    </main>
  );
}

/** /work/:slug — a full case-study page with its own URL. */
export function CaseStudyPage() {
  const { slug } = useParams();
  const ref = useRef(null);

  useEffect(() => {
    let alive = true;
    window.scrollTo(0, 0);
    getProjects().then((list) => {
      if (!alive || !ref.current) return;
      setProjects(list);
      renderCase(ref.current, slug);
    });
    return () => { alive = false; };
  }, [slug]);

  return <div className="cs page" ref={ref} aria-live="polite" />;
}
