import { useState, useEffect, useCallback } from 'react';
import { GlitchText } from '../shared/GlitchText';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useInView } from '../../hooks/useInView';

const EMAIL_ADDRESS = 'edwardgkristian@gmail.com';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/edwardgk',
    handle: '@edwardgk',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/edward-geraldo-kristian',
    handle: 'in/edward-geraldo',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: 'Curriculum Vitae',
    url: '#contact',
    handle: 'PDF [Latest]',
    icon: (
      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({ threshold: 0.15 });
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live Jakarta, ID timezone clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopied(true);
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-void border-t border-border-hairline overflow-hidden pt-24 pb-32"
      aria-label="Contact"
    >
      {/* Bookending violet radial illumination behind contact card */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[480px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, var(--violet-bright) 0%, rgba(10, 6, 18, 0) 70%)',
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 text-center max-w-[840px] mx-auto">
        {/* Kicker & Location Status Header */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono mb-4 text-text-tertiary"
          style={{
            opacity: isInView || prefersReducedMotion ? 1 : 0,
            transform: isInView || prefersReducedMotion ? 'translateY(0)' : 'translateY(16px)',
            transition: prefersReducedMotion
              ? 'none'
              : 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="flex items-center gap-1.5 text-accent">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            [04] // Contact
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-channel-cyan" />
            AVAILABLE FOR OPPORTUNITIES
          </span>
          <span>•</span>
          <span className="text-text-secondary">
            JAKARTA, ID // {currentTime ? `${currentTime} GMT+7` : 'GMT+7'}
          </span>
        </div>

        {/* Big Glitch Resolve Headline */}
        <h2 className="text-section-h2 text-text-primary text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          <GlitchText as="span" trigger={isInView} hoverGlitch delay={120}>
            Let's build something extraordinary.
          </GlitchText>
        </h2>

        <p
          className="text-body text-text-secondary text-base sm:text-lg max-w-[600px] mx-auto mb-10"
          style={{
            opacity: isInView || prefersReducedMotion ? 1 : 0,
            transform: isInView || prefersReducedMotion ? 'translateY(0)' : 'translateY(16px)',
            transition: prefersReducedMotion
              ? 'none'
              : 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 180ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 180ms',
          }}
        >
          Whether you are exploring a native iOS product, high-scale web architecture, 
          or deep telemetry pipelines, my inbox is always open.
        </p>

        {/* Primary Interactive Email Box */}
        <div
          className="relative inline-flex flex-col sm:flex-row items-center justify-center gap-3 p-2 sm:p-2.5 rounded-sm bg-panel-raised border border-border-hairline shadow-[0_12px_32px_rgba(0,0,0,0.5)] mb-10 hover:border-violet-mid transition-all"
          style={{
            opacity: isInView || prefersReducedMotion ? 1 : 0,
            transform: isInView || prefersReducedMotion ? 'translateY(0)' : 'translateY(20px)',
            transition: prefersReducedMotion
              ? 'none'
              : 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 240ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 240ms, border-color 250ms ease',
          }}
        >
          <a
            href={`mailto:${EMAIL_ADDRESS}`}
            className="group relative flex items-center gap-3 px-5 py-3 font-mono text-base sm:text-lg text-text-primary hover:text-accent transition-colors"
          >
            <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="tracking-wide font-medium">{EMAIL_ADDRESS}</span>
            <span className="text-xs text-text-tertiary hidden md:inline">↗</span>

            {/* Underline draw-in hover state */}
            <span
              className="absolute bottom-1.5 left-5 right-5 h-[1.5px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 pointer-events-none"
              style={{ transition: prefersReducedMotion ? 'none' : undefined }}
            />
          </a>

          {/* Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-4 py-2.5 rounded-sm bg-white/[0.04] hover:bg-accent hover:text-void border border-border-hairline text-text-secondary font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
            aria-label="Copy email address to clipboard"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-channel-cyan fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-channel-cyan font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Secondary Channels Row */}
        <div
          className="flex flex-wrap items-center justify-center gap-3"
          style={{
            opacity: isInView || prefersReducedMotion ? 1 : 0,
            transform: isInView || prefersReducedMotion ? 'translateY(0)' : 'translateY(16px)',
            transition: prefersReducedMotion
              ? 'none'
              : 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 320ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 320ms',
          }}
        >
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target={item.url.startsWith('http') ? '_blank' : undefined}
              rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-2 px-4 py-2 rounded-sm border border-border-hairline bg-panel/50 hover:bg-white/[0.04] hover:border-violet-mid text-text-secondary hover:text-text-primary font-mono text-xs tracking-wide transition-all duration-200"
            >
              {item.icon}
              <span>{item.name}</span>
              <span className="text-[10px] text-text-tertiary hidden sm:inline">[{item.handle}]</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
