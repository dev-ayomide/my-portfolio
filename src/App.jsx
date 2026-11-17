import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Each area loads its own code: visitors never download the admin, and vice versa.
const SiteLayout = lazy(() => import('./site/Site').then((m) => ({ default: m.SiteLayout })));
const Home = lazy(() => import('./site/Site').then((m) => ({ default: m.Home })));
const CaseStudyPage = lazy(() => import('./site/Site').then((m) => ({ default: m.CaseStudyPage })));
const AdminArea = lazy(() => import('./AdminArea'));

const Blank = () => <div style={{ minHeight: '100vh', background: 'var(--bg, #0e0e0d)' }} />;

function App() {
  return (
    <Router>
      <Suspense fallback={<Blank />}>
        <Routes>
          <Route path="/admin/*" element={<AdminArea />} />
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
