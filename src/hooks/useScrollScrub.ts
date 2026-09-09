import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * useScrollScrub — tracks scroll progress within a tall spacer element.
 *
 * Implements the eased-follow logic from the spec:
 *   `displayProgress += (targetProgress - displayProgress) * 0.28`
 * per frame, so the visual lags the raw scroll slightly for a smooth
 * "physical" feel rather than snapping 1:1 to scroll.
 */
export function useScrollScrub(spacerRef: React.RefObject<HTMLElement | null>) {
  const [displayProgress, setDisplayProgress] = useState(0)
  const targetProgressRef = useRef(0)
  const displayProgressRef = useRef(0)
  const rafRef = useRef<number>(0)

  const loop = useCallback(() => {
    const dp = displayProgressRef.current
    const tp = targetProgressRef.current
    const next = dp + (tp - dp) * 0.28

    // Only update state if there's meaningful change (avoid re-renders)
    if (Math.abs(next - dp) > 0.0001) {
      displayProgressRef.current = next
      setDisplayProgress(next)
    } else if (Math.abs(next - tp) > 0.0001) {
      // Close enough, snap to target
      displayProgressRef.current = tp
      setDisplayProgress(tp)
    }

    rafRef.current = requestAnimationFrame(loop)
  }, [])

  useEffect(() => {
    const spacer = spacerRef.current
    if (!spacer) return

    const onScroll = () => {
      const rect = spacer.getBoundingClientRect()
      const spacerHeight = spacer.offsetHeight
      const viewportHeight = window.innerHeight

      // How far the spacer has scrolled past the top of the viewport
      // rect.top starts positive (below viewport top), goes negative as we scroll
      const scrolled = -rect.top
      const scrollableDistance = spacerHeight - viewportHeight

      if (scrollableDistance <= 0) {
        targetProgressRef.current = 0
        return
      }

      const raw = scrolled / scrollableDistance
      targetProgressRef.current = Math.max(0, Math.min(1, raw))
    }

    // Start the animation loop
    rafRef.current = requestAnimationFrame(loop)

    // Listen for scroll
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // Initial calculation

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [spacerRef, loop])

  return displayProgress
}
