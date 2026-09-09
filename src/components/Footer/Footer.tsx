import { useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Footer() {
  const prefersReducedMotion = useReducedMotion();

  const scrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [prefersReducedMotion]);

  return (
    <footer className="border-t border-border-hairline bg-void py-10" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left font-mono text-xs text-text-tertiary">
          <span>&copy; {new Date().getFullYear()} Edward Geraldo Kristian</span>
          <span className="hidden sm:inline">•</span>
          <span>Dual-Stack iOS &amp; Web Architect</span>
        </div>

        <a
          href="#hero"
          onClick={scrollToTop}
          className="group flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-accent transition-colors"
          aria-label="Back to top of page"
        >
          <span>BACK TO TOP</span>
          <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
