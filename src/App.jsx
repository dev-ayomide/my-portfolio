import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Services from "./components/services";
import Projects from "./components/projects";
import Experience from "./components/experience";
import Contact from "./components/contact";
import Footer from "./components/footer";
import AdminProjects from "./components/AdminProjects";
import AdminMessages from "./components/AdminMessages";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={
            <div style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)", minHeight: "100vh" }}>
              <AdminProjects />
            </div>
          } />
          <Route path="/admin/messages" element={
            <div style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)", minHeight: "100vh" }}>
              <AdminMessages />
            </div>
          } />
          <Route path="/" element={
            <>
              <Navbar />
              <main style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
                <section id="home">
                  <Hero />
                </section>
                <section id="services">
                  <Services />
                </section>
                <section id="portfolio">
                  <Projects />
                </section>
                <section id="experience">
                  <Experience />
                </section>
                <section id="contact">
                  <Contact />
                </section>
                <section id="footer">
                  <Footer />
                </section>
              </main>
            </>
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;