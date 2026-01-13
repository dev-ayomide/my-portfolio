import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook for scroll-triggered animations
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {boolean} options.triggerOnce - Only trigger animation once
 * @param {number} options.delay - Delay before animation starts (ms)
 * @returns {Object} - { ref, isVisible, hasAnimated }
 */
export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          } else {
            setIsVisible(true);
            setHasAnimated(true);
          }

          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, triggerOnce, delay]);

  return { ref, isVisible, hasAnimated };
}

/**
 * Custom hook for staggered animations on multiple elements
 * @param {number} itemCount - Number of items to animate
 * @param {Object} options - Configuration options
 * @returns {Object} - { containerRef, isVisible, getItemDelay }
 */
export function useStaggerAnimation(itemCount, options = {}) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    staggerDelay = 100,
    initialDelay = 0,
  } = options;

  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, initialDelay);

          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, triggerOnce, initialDelay]);

  const getItemDelay = useCallback(
    (index) => index * staggerDelay,
    [staggerDelay]
  );

  const getItemStyle = useCallback(
    (index) => ({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.6s ease ${getItemDelay(index)}ms, transform 0.6s ease ${getItemDelay(index)}ms`,
    }),
    [isVisible, getItemDelay]
  );

  return { containerRef, isVisible, getItemDelay, getItemStyle };
}

/**
 * Custom hook for parallax scroll effect
 * @param {number} speed - Parallax speed multiplier
 * @returns {Object} - { ref, offset }
 */
export function useParallax(speed = 0.5) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const relativeScroll = scrolled - elementTop + window.innerHeight;
      
      if (relativeScroll > 0) {
        setOffset(relativeScroll * speed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
}

/**
 * Animation class names helper
 */
export const animationClasses = {
  fadeIn: 'opacity-0 [&.visible]:animate-fade-in [&.visible]:opacity-100',
  fadeInUp: 'opacity-0 translate-y-8 [&.visible]:animate-fade-in-up',
  fadeInDown: 'opacity-0 -translate-y-8 [&.visible]:animate-fade-in-down',
  fadeInLeft: 'opacity-0 -translate-x-8 [&.visible]:animate-fade-in-left',
  fadeInRight: 'opacity-0 translate-x-8 [&.visible]:animate-fade-in-right',
  scaleIn: 'opacity-0 scale-95 [&.visible]:animate-scale-in',
};
