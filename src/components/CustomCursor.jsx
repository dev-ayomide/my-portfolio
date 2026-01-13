import { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef(null);

  // Particle class
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.life = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      // Green/cyan gradient colors
      const colors = ['16, 185, 129', '52, 211, 153', '6, 182, 212', '34, 211, 238'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= this.decay;
      this.size *= 0.98;
    }

    draw(ctx) {
      if (this.life <= 0) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.life * 0.6})`;
      ctx.fill();
    }
  }

  const createParticles = useCallback((x, y) => {
    // Create 1-2 particles per frame for subtle effect
    for (let i = 0; i < 2; i++) {
      particlesRef.current.push(new Particle(x, y));
    }
    // Limit total particles for performance
    if (particlesRef.current.length > 50) {
      particlesRef.current = particlesRef.current.slice(-50);
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.update();
      particle.draw(ctx);
      return particle.life > 0;
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse move handler
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseRef.current = { x: clientX, y: clientY };
      
      setIsVisible(true);

      // Move cursor dot
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
      }

      // Move cursor ring with slight delay effect
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
      }

      // Create particles on move
      createParticles(clientX, clientY);
    };

    // Check for interactive elements
    const handleMouseOver = (e) => {
      const interactiveElements = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
      const target = e.target;
      
      if (
        interactiveElements.includes(target.tagName) ||
        target.classList.contains('cursor-pointer') ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Start animation loop
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, createParticles]);

  // Hide custom cursor on touch devices
  const isTouchDevice = typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Cursor Dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: '8px',
          height: '8px',
          marginLeft: '-4px',
          marginTop: '-4px',
          backgroundColor: '#10b981',
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
        }}
      />
      
      {/* Cursor Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: isHovering ? '50px' : '32px',
          height: isHovering ? '50px' : '32px',
          marginLeft: isHovering ? '-25px' : '-16px',
          marginTop: isHovering ? '-25px' : '-16px',
          border: `2px solid ${isHovering ? '#06b6d4' : 'rgba(16, 185, 129, 0.5)'}`,
          borderRadius: '50%',
          backgroundColor: isHovering ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
          transition: 'width 0.3s ease, height 0.3s ease, margin 0.3s ease, border-color 0.3s ease, background-color 0.3s ease',
        }}
      />
      
      {/* Global style to hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
        
        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
