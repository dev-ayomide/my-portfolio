import { useState, useEffect } from 'react';
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
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router>
      {/* Custom Cursor - Only on desktop */}
      <CustomCursor />
      
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      <Routes>
        {/* Admin Routes */}
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

        {/* Main Portfolio Route */}
        <Route
          path="/"
          element={
            <div
              className="relative"
              style={{
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            >
              <Navbar />
              
              <main>
                <section id="home">
                  <Hero />
                </section>

                <section id="about">
                  <About />
                </section>

                <TechStack />

                <section id="portfolio">
                  <Projects />
                </section>

                <section id="experience">
                  <Experience />
                </section>

                <section id="contact">
                  <Contact />
                </section>
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
