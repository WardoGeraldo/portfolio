import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Returns the scroll direction ('up' | 'down') and a boolean
 * indicating whether the header should be hidden.
 *
 * Header hides when scrolling down past a threshold (default 80px).
 * Always reveals when scrolling up, and always visible near the top.
 *
 * When prefers-reduced-motion is active, the header never hides
 * (spec: "disable the header hide/show translate").
 */
export function useScrollDirection(threshold = 80): {
  direction: 'up' | 'down';
  isHeaderHidden: boolean;
  scrollY: number;
} {
  const prefersReducedMotion = useReducedMotion();
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setScrollY(currentY);

        if (currentY > lastScrollY.current && currentY > threshold) {
          setDirection('down');
        } else if (currentY < lastScrollY.current) {
          setDirection('up');
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return {
    direction,
    isHeaderHidden: !prefersReducedMotion && direction === 'down' && scrollY > threshold,
    scrollY,
  };
}
