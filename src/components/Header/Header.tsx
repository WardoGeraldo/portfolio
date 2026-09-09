import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { GlitchText } from '../shared/GlitchText';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/* ────────────────────────────────────────────────────────────
 * Constants
 * ──────────────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { id: 'about', index: '01', label: 'About' },
  { id: 'projects', index: '02', label: 'Projects' },
  { id: 'skills', index: '03', label: 'Skills' },
  { id: 'contact', index: '04', label: 'Contact' },
] as const;

const SECTION_IDS = ['hero', ...NAV_ITEMS.map((n) => n.id)];

/** Scroll threshold (px) before the header gains its solid background. */
const BG_THRESHOLD = 80;

/* ────────────────────────────────────────────────────────────
 * Component
 * ──────────────────────────────────────────────────────────── */

export function Header() {
  const prefersReducedMotion = useReducedMotion();
  const activeSection = useActiveSection(SECTION_IDS);
  const { isHeaderHidden, scrollY } = useScrollDirection(BG_THRESHOLD);
  const scrollProgress = useScrollProgress();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Scrolled past hero — show solid background
  const isScrolled = scrollY > BG_THRESHOLD;

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Trap focus in mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }

      if (e.key === 'Tab') {
        const modal = document.getElementById('mobile-nav');
        if (!modal) return;
        const focusable = modal.querySelectorAll<HTMLElement>('a[tabindex="0"], button');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  /* ── Smooth scroll handler ─────────────────────────────── */
  const scrollToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      setMobileMenuOpen(false);

      if (prefersReducedMotion) {
        el.scrollIntoView();
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [prefersReducedMotion],
  );

  /* ── Header inline styles (transform for hide/reveal) ──── */
  const headerStyle = useMemo<CSSProperties>(() => {
    return {
      transform: isHeaderHidden ? 'translateY(-100%)' : 'translateY(0)',
      transition: prefersReducedMotion
        ? 'none'
        : 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1), background-color 250ms ease, border-color 250ms ease',
    };
  }, [isHeaderHidden, prefersReducedMotion]);

  /* ── Background style (transparent → solid) ────────────── */
  const bgClass = isScrolled
    ? 'bg-void/90 backdrop-blur-[12px] border-b border-border-hairline shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
    : 'border-b border-transparent bg-transparent';

  return (
    <>
      {/* ── Scroll progress bar ──────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <div
          className="h-full origin-left"
          style={{
            transform: `scaleX(${scrollProgress})`,
            background: 'linear-gradient(90deg, var(--violet-mid), var(--accent))',
            transition: prefersReducedMotion ? 'none' : 'transform 80ms linear',
          }}
        />
      </div>

      {/* ── Header ───────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[56px] md:h-[72px] transition-all ${bgClass}`}
        style={headerStyle}
        role="banner"
      >
        <div className="w-full max-w-[1200px] h-full mx-auto px-6 md:px-8 lg:px-16 flex items-center justify-between">
          {/* ── Wordmark (scrolls to top) ──────────────── */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="group relative z-10 cursor-pointer inline-flex items-center py-2 shrink-0"
            aria-label="Scroll to top"
          >
            <GlitchText
              as="span"
              className="text-nav-label text-text-primary tracking-[0.1em]"
              hoverGlitch
              trigger={false}
            >
              EGK
            </GlitchText>
          </a>

          {/* ── Desktop nav ──────────────────────────────── */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Primary navigation"
          >
            <ul className="flex items-center gap-1 list-none" role="list">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="shrink-0">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                      className={`relative flex items-center gap-1 px-2.5 lg:px-3 py-1.5 rounded-sm text-nav-label whitespace-nowrap transition-all duration-200 ${
                        isActive
                          ? 'text-text-primary bg-white/[0.04]'
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.02]'
                      }`}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <span
                        className={`transition-colors duration-200 ${
                          isActive ? 'text-accent font-semibold' : 'text-text-tertiary'
                        }`}
                      >
                        [{item.index}]
                      </span>
                      <span>{item.label}</span>

                      {/* Active indicator line */}
                      {isActive && (
                        <span
                          className="absolute bottom-0 left-2.5 right-2.5 lg:left-3 lg:right-3 h-[2px] bg-accent rounded-full pointer-events-none"
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Desktop CTA ──────────────────────────────── */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            className="hidden md:inline-flex items-center px-4 py-2 rounded-sm bg-accent text-void text-nav-label font-mono font-medium tracking-wide uppercase whitespace-nowrap hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-[0_0_20px_rgba(255,46,154,0.3)] shrink-0"
          >
            Let's talk
          </a>

          {/* ── Mobile hamburger ──────────────────────────── */}
          <button
            ref={hamburgerRef}
            className="relative z-50 md:hidden w-10 h-10 flex items-center justify-center cursor-pointer rounded-sm hover:bg-white/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <div className="relative w-5 h-3.5 flex flex-col justify-between">
              <span
                className="block h-[1.5px] w-full bg-text-primary transition-all duration-300 origin-center"
                style={
                  mobileMenuOpen
                    ? { transform: 'translateY(6px) rotate(45deg)' }
                    : undefined
                }
              />
              <span
                className="block h-[1.5px] w-full bg-text-primary transition-opacity duration-200"
                style={{ opacity: mobileMenuOpen ? 0 : 1 }}
              />
              <span
                className="block h-[1.5px] w-full bg-text-primary transition-all duration-300 origin-center"
                style={
                  mobileMenuOpen
                    ? { transform: 'translateY(-6px) rotate(-45deg)' }
                    : undefined
                }
              />
            </div>
          </button>
        </div>
      </header>

      {/* ── Mobile overlay menu ──────────────────────────── */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal={mobileMenuOpen}
        aria-label="Mobile navigation menu"
        className="fixed inset-0 z-40 md:hidden flex flex-col justify-center transition-all duration-300"
        style={{
          backgroundColor: 'rgba(10, 6, 18, 0.98)',
          backdropFilter: 'blur(16px)',
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
        aria-hidden={!mobileMenuOpen}
      >
        <nav
          className="w-full max-w-[360px] mx-auto px-8 py-12"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-6 list-none" role="list">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <li
                  key={item.id}
                  style={{
                    transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(16px)',
                    opacity: mobileMenuOpen ? 1 : 0,
                    transition: prefersReducedMotion
                      ? 'none'
                      : `transform 400ms cubic-bezier(0.16, 1, 0.3, 1) ${80 + idx * 50}ms, opacity 350ms ease ${80 + idx * 50}ms`,
                  }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className={`flex items-center gap-3 font-mono text-[24px] font-medium tracking-[0.04em] transition-colors duration-200 ${
                      isActive
                        ? 'text-text-primary'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                  >
                    <span
                      className={`text-[16px] font-mono ${
                        isActive ? 'text-accent' : 'text-text-tertiary'
                      }`}
                    >
                      [{item.index}]
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}

            {/* Mobile CTA */}
            <li
              style={{
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(16px)',
                opacity: mobileMenuOpen ? 1 : 0,
                transition: prefersReducedMotion
                  ? 'none'
                  : `transform 400ms cubic-bezier(0.16, 1, 0.3, 1) ${80 + NAV_ITEMS.length * 50}ms, opacity 350ms ease ${80 + NAV_ITEMS.length * 50}ms`,
              }}
              className="mt-6 pt-6 border-t border-border-hairline"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="inline-flex items-center justify-center w-full px-6 py-3 rounded-sm bg-accent text-void font-mono text-sm font-medium tracking-wide uppercase hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
                tabIndex={mobileMenuOpen ? 0 : -1}
              >
                Let's talk
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
