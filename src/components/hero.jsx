import { useEffect, useState } from 'react';
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import SocialIcon from './social-icon';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = './Taiwo_Ayomide_Resume_latest.pdf';
    link.download = 'Taiwo_Ayomide_Resume.pdf';
    link.click();
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
            top: '-10%',
            right: '-10%',
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
            bottom: '-5%',
            left: '-10%',
            transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(var(--text-primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Main Heading */}
            <div
              className={`space-y-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.1s' }}
            >
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] font-display"
                style={{ color: 'var(--text-primary)' }}
              >
                Hi, I'm{' '}
                <span className="text-gradient-static">
                  Taiwo
                </span>
                <br />
                <span className="text-gradient-static">
                  Ayomide
                </span>
              </h1>
            </div>

            {/* Role/Title */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.3s' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="h-[2px] w-12"
                  style={{ background: 'var(--accent-primary)' }}
                />
                <h2
                  className="text-xl md:text-2xl font-semibold tracking-wide"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Software Engineer
                </h2>
              </div>
            </div>

            {/* Description */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.4s' }}
            >
              <p
                className="text-lg md:text-xl leading-relaxed max-w-xl"
                style={{ color: 'var(--text-secondary)' }}
              >
                Passionate software engineer crafting{' '}
                <span style={{ color: 'var(--accent-primary)' }}>scalable</span> web applications
                and <span style={{ color: 'var(--accent-secondary)' }}>AI-driven</span> solutions.
                I transform complex problems into elegant, user-centric experiences.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.4s' }}
            >
              <button
                onClick={scrollToContact}
                className="btn-primary group"
              >
                Let's Work Together
                <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={handleDownload}
                className="btn-secondary group"
              >
                <FaDownload className="mr-2" />
                Download Resume
              </button>
            </div>

            {/* Social Links */}
            <div
              className={`flex items-center gap-6 pt-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.5s' }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Find me on
              </span>
              <div className="flex gap-3">
                <SocialIcon href="https://github.com/dev-ayomide" icon="FaGithub" />
                <SocialIcon href="https://www.linkedin.com/in/taiwoayomide/" icon="FaLinkedin" />
                <SocialIcon href="https://www.instagram.com/dev_ayomide_/" icon="FaInstagram" />
                <SocialIcon href="https://x.com/dev_ayomide" icon="FaTwitter" />
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div
            className={`relative order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            {/* Image Container */}
            <div className="relative">
              {/* Decorative ring */}
              <div
                className="absolute -inset-4 rounded-full opacity-20 animate-spin-slow"
                style={{
                  border: '2px dashed var(--accent-primary)',
                }}
              />
              
              {/* Glowing background */}
              <div
                className="absolute -inset-8 rounded-full blur-2xl opacity-30"
                style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(6, 182, 212, 0.3))',
                }}
              />

              {/* Main Image */}
              <div
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden"
                style={{
                  border: '4px solid var(--accent-primary)',
                  boxShadow: '0 0 60px rgba(16, 185, 129, 0.2)',
                  transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
                  transition: 'transform 0.3s ease-out',
                }}
              >
                <img
                  src="/mypic.jpg"
                  alt="Taiwo Ayomide"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
                  }}
                />
              </div>

              {/* Floating badges */}
              <div
                className="absolute -right-8 top-1/4 px-4 py-2 rounded-xl shadow-lg animate-float flex items-center"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)',
                  animationDelay: '0s',
                }}
              >
                <img src="/react.png" alt="React" className="w-6 h-6" />
                <span className="ml-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                  React
                </span>
              </div>

              <div
                className="absolute -left-4 bottom-1/4 px-4 py-2 rounded-xl shadow-lg animate-float flex items-center"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)',
                  animationDelay: '1s',
                }}
              >
                <img src="/python.png" alt="Python" className="w-6 h-6" />
                <span className="ml-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                  Python
                </span>
              </div>

              <div
                className="absolute right-8 -bottom-4 px-4 py-2 rounded-xl shadow-lg animate-float flex items-center"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)',
                  animationDelay: '2s',
                }}
              >
                <span className="text-2xl">🤖</span>
                <span className="ml-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                  AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
