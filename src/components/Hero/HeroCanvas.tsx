/**
 * HeroCanvas — React wrapper around the Three.js NodeGraphScene.
 *
 * This component is lazy-loaded (dynamic import) so Three.js doesn't
 * block first paint. The canvas fades in once the scene is ready.
 */

import { useEffect, useRef, useState, memo } from 'react'
import { NodeGraphScene } from './NodeGraphScene'

interface HeroCanvasProps {
  progress: number
}

const HeroCanvas = memo(function HeroCanvas({ progress }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<NodeGraphScene | null>(null)
  const rafRef = useRef<number>(0)
  const [ready, setReady] = useState(false)

  // Initialize Three.js scene
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      const scene = new NodeGraphScene(canvas)
      sceneRef.current = scene

      // Signal ready after a short delay for smooth fade-in
      requestAnimationFrame(() => {
        setReady(true)
      })

      // Render loop
      const animate = () => {
        scene.render()
        rafRef.current = requestAnimationFrame(animate)
      }
      rafRef.current = requestAnimationFrame(animate)

      // Resize handler
      const handleResize = () => scene.resize()
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        cancelAnimationFrame(rafRef.current)
        scene.dispose()
        sceneRef.current = null
      }
    } catch {
      // WebGL unavailable — canvas stays hidden, no error for user
      console.warn('WebGL not available, hero canvas disabled')
    }
  }, [])

  // Sync progress to scene
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setProgress(progress)
    }
  }, [progress])

  return (
    <canvas
      ref={canvasRef}
      className={`
        w-full h-full
        transition-opacity duration-700 ease-out
        ${ready ? 'opacity-100' : 'opacity-0'}
      `}
      aria-hidden="true"
      style={{ display: 'block' }}
    />
  )
})

export default HeroCanvas
