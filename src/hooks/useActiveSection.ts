import { useState, useEffect, useRef } from 'react';

/**
 * Tracks which section is currently in the viewport using
 * IntersectionObserver. Returns the id of the active section.
 *
 * Uses a ~40% threshold so the section is considered "active"
 * when roughly 40% of it is visible — matching the spec's
 * "threshold ~0.4" requirement.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Clean up any previous observer
    observerRef.current?.disconnect();

    const visibleSections = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        }

        // Find the section with the highest intersection ratio
        let bestId = '';
        let bestRatio = 0;
        for (const [id, ratio] of visibleSections) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId) {
          setActiveId(bestId);
        }
      },
      {
        // Shrink the root margins to create a "center band" detection zone
        rootMargin: '-40% 0px -50% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
      },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds]);

  return activeId;
}
