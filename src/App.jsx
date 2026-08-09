import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Hero from './components/hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/projects';
import Experience from './components/experience';
import Contact from './components/contact';
import Footer from './components/footer';
import AdminProjects from './components/AdminProjects';
import AdminMessages from './components/AdminMessages';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin */}
        <Route
          path="/admin"
          element={
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
              <AdminProjects />
            </div>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
              <AdminMessages />
            </div>
          }
        />

        {/* Portfolio */}
        <Route
          path="/"
          element={
            <div
              className="relative"
              style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
            >
              <Navbar />

              <main>
                <Hero />
                <About />
                <TechStack />
                <Projects />
                <Experience />
                <Contact />
              </main>

              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
