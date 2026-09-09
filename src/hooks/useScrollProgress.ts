import { useState, useEffect, useRef } from 'react';

/**
 * Returns total page scroll progress as a number 0–1.
 * Used for the header's scroll progress bar.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0);
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial value
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}
