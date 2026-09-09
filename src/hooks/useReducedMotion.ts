import { useState, useEffect } from 'react';

/**
 * Detects whether the user has requested reduced motion via
 * their OS / browser accessibility settings.
 *
 * Returns `true` when `(prefers-reduced-motion: reduce)` matches,
 * and updates reactively if the preference changes at runtime.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mql.addEventListener('change', handler);
    // Sync in case SSR initial value was stale
    setPrefersReducedMotion(mql.matches);

    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
