/**
 * App — Portfolio main layout
 *
 * Section structure (one long scrollable page):
 * - Header — sticky / fixed blurred glass navigation with progress bar
 * - Hero [00] — scroll-scrub implementation (11-hero-scroll-scrub.md)
 * - About [01] — bg-panel (04-about-section.md)
 * - Projects [02] — bg-void (05-projects-section.md)
 * - Skills [03] — bg-void + grid (06-skills-section.md)
 * - Contact [04] — bg-void (07-contact-section.md)
 * - Footer — minimal copyright + back-to-top trigger
 */

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrecisionCursor from './components/shared/PrecisionCursor';

function App() {
  return (
    <div className="min-h-screen bg-void text-text-primary selection:bg-violet-mid selection:text-text-primary">
      {/* ── Accessible skip link for keyboard users ── */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-accent focus:text-void focus:font-mono focus:text-xs focus:font-bold focus:rounded-sm focus:shadow-[0_0_24px_rgba(255,46,154,0.6)] focus:outline-none"
      >
        Skip to main content
      </a>

      {/* ── Desktop precision reticle cursor ──────────── */}
      <PrecisionCursor />

      {/* ── Fixed Header / Nav ───────────────────────── */}
      <Header />

      <main id="main-content">
        {/* ── Hero (section [00]) ───────────────────── */}
        <Hero />

        {/* ── About (section [01]) ──────────────────── */}
        <About />

        {/* ── Projects (section [02]) ───────────────── */}
        <Projects />

        {/* ── Skills (section [03]) ─────────────────── */}
        <Skills />

        {/* ── Contact (section [04]) ────────────────── */}
        <Contact />
      </main>

      {/* ── Footer ─────────────────────────────────── */}
      <Footer />
    </div>
  );
}

export default App;
