/**
 * NodeGraphScene — procedural Three.js node-graph driven by scroll progress.
 *
 * From 11-hero-scroll-scrub.md:
 * - Base scene: points connected by thin lines (node-graph / wireframe motif)
 * - Progress-driven: rotation, camera distance, connection density evolve 0→1
 * - Per-beat color: cyan → magenta → violet → full CMYK split
 * - At progress 0: sparse, slowly rotating. By progress 1: denser/connected
 *
 * Lazy-loaded via dynamic import() per 09-technical-architecture.md.
 */

import * as THREE from 'three'

// ── Color palette (from design tokens) ──────────────────────
const COLORS = {
  void: 0x0a0612,
  violetDeep: 0x2e1065,
  violetBright: 0x7c3aed,
  cyan: 0x00f0ff,
  magenta: 0xff2e9a,
  yellow: 0xffe600,
  textPrimary: 0xf4f1fa,
} as const

// ── Beat color configuration ────────────────────────────────
interface BeatConfig {
  primary: number
  secondary: number
  emissive: number
}

const BEAT_COLORS: BeatConfig[] = [
  { primary: COLORS.cyan, secondary: COLORS.violetDeep, emissive: COLORS.cyan },
  { primary: COLORS.magenta, secondary: COLORS.violetDeep, emissive: COLORS.magenta },
  { primary: COLORS.violetBright, secondary: COLORS.violetDeep, emissive: COLORS.violetBright },
  // Beat 4: full CMYK — uses cyan as primary but we'll add all channels in render
  { primary: COLORS.textPrimary, secondary: COLORS.violetDeep, emissive: COLORS.magenta },
]

// ── Node generation ──────────────────────────────────────────

interface Node {
  position: THREE.Vector3
  basePosition: THREE.Vector3
  velocity: THREE.Vector3
  connections: number[] // indices of connected nodes
  phase: number // random phase offset for animation
}

function generateNodes(count: number, radius: number): Node[] {
  const nodes: Node[] = []

  for (let i = 0; i < count; i++) {
    // Distribute on a sphere surface with some randomness
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    const r = radius * (0.5 + Math.random() * 0.5)

    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)

    const pos = new THREE.Vector3(x, y, z)
    nodes.push({
      position: pos.clone(),
      basePosition: pos.clone(),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002
      ),
      connections: [],
      phase: Math.random() * Math.PI * 2,
    })
  }

  return nodes
}

function computeConnections(nodes: Node[], maxDist: number, maxConnections: number) {
  for (let i = 0; i < nodes.length; i++) {
    const distances: { index: number; dist: number }[] = []

    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue
      const dist = nodes[i].basePosition.distanceTo(nodes[j].basePosition)
      if (dist < maxDist) {
        distances.push({ index: j, dist })
      }
    }

    distances.sort((a, b) => a.dist - b.dist)
    nodes[i].connections = distances.slice(0, maxConnections).map((d) => d.index)
  }
}

// ── Scene class ──────────────────────────────────────────────

export class NodeGraphScene {
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private nodes: Node[]
  private pointsMesh: THREE.Points
  private linesMesh: THREE.LineSegments
  private pointsGeometry: THREE.BufferGeometry
  private linesGeometry: THREE.BufferGeometry
  private pointsMaterial: THREE.PointsMaterial
  private linesMaterial: THREE.LineBasicMaterial
  private clock: THREE.Clock
  private disposed = false

  // CMYK ghost layers for beat 4
  private cyanLinesMesh: THREE.LineSegments | null = null
  private magentaLinesMesh: THREE.LineSegments | null = null
  private cyanPointsMesh: THREE.Points | null = null
  private magentaPointsMesh: THREE.Points | null = null

  // Progress state
  private currentProgress = 0
  private targetBeatColors: BeatConfig = BEAT_COLORS[0]

  // Constants
  private readonly NODE_COUNT = 80
  private readonly GRAPH_RADIUS = 5
  private readonly MAX_CONNECT_DIST = 3.5
  private readonly MAX_CONNECTIONS = 4

  constructor(canvas: HTMLCanvasElement) {
    // ── Renderer ──
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor(0x000000, 0)

    // ── Scene ──
    this.scene = new THREE.Scene()

    // ── Camera ──
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    this.camera.position.set(0, 0, 12)

    // ── Generate nodes ──
    this.nodes = generateNodes(this.NODE_COUNT, this.GRAPH_RADIUS)
    computeConnections(this.nodes, this.MAX_CONNECT_DIST, this.MAX_CONNECTIONS)

    // ── Points ──
    this.pointsGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(this.NODE_COUNT * 3)
    const sizes = new Float32Array(this.NODE_COUNT)

    for (let i = 0; i < this.NODE_COUNT; i++) {
      positions[i * 3] = this.nodes[i].position.x
      positions[i * 3 + 1] = this.nodes[i].position.y
      positions[i * 3 + 2] = this.nodes[i].position.z
      sizes[i] = 2 + Math.random() * 2
    }

    this.pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.pointsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    this.pointsMaterial = new THREE.PointsMaterial({
      color: COLORS.cyan,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    this.pointsMesh = new THREE.Points(this.pointsGeometry, this.pointsMaterial)
    this.scene.add(this.pointsMesh)

    // ── Lines ──
    this.linesGeometry = new THREE.BufferGeometry()
    this.linesMaterial = new THREE.LineBasicMaterial({
      color: COLORS.cyan,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    this.linesMesh = new THREE.LineSegments(this.linesGeometry, this.linesMaterial)
    this.scene.add(this.linesMesh)

    // ── Clock ──
    this.clock = new THREE.Clock()

    // Initial update
    this.updateLines(0)
    this.resize()
  }

  resize() {
    const canvas = this.renderer.domElement
    const parent = canvas.parentElement
    if (!parent) return

    const width = parent.clientWidth
    const height = parent.clientHeight

    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  /**
   * Update the scene state based on scroll progress (0-1).
   * Called from the React component's scroll handler.
   */
  setProgress(progress: number) {
    this.currentProgress = progress

    // Determine which beat we're in
    const beatIndex = Math.min(3, Math.floor(progress * 4))
    this.targetBeatColors = BEAT_COLORS[beatIndex]
  }

  /**
   * Update line geometry — connections become denser as progress increases.
   */
  private updateLines(progress: number) {
    const linePositions: number[] = []
    const connectionThreshold = this.MAX_CONNECT_DIST * (0.5 + progress * 0.5)

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i]
      for (const j of node.connections) {
        const other = this.nodes[j]
        const dist = node.position.distanceTo(other.position)

        if (dist < connectionThreshold) {
          linePositions.push(
            node.position.x, node.position.y, node.position.z,
            other.position.x, other.position.y, other.position.z
          )
        }
      }
    }

    this.linesGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    )
    this.linesGeometry.computeBoundingSphere()
  }

  /**
   * Create/update CMYK ghost layers for beat 4's chromatic split effect.
   */
  private updateCMYKGhosts(active: boolean, intensity: number) {
    if (active && !this.cyanLinesMesh) {
      // Create ghost line meshes
      const cyanMat = new THREE.LineBasicMaterial({
        color: COLORS.cyan,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const magentaMat = new THREE.LineBasicMaterial({
        color: COLORS.magenta,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      this.cyanLinesMesh = new THREE.LineSegments(this.linesGeometry, cyanMat)
      this.magentaLinesMesh = new THREE.LineSegments(this.linesGeometry, magentaMat)

      // Ghost point meshes
      const cyanPointMat = new THREE.PointsMaterial({
        color: COLORS.cyan,
        size: 0.06,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const magentaPointMat = new THREE.PointsMaterial({
        color: COLORS.magenta,
        size: 0.06,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      this.cyanPointsMesh = new THREE.Points(this.pointsGeometry, cyanPointMat)
      this.magentaPointsMesh = new THREE.Points(this.pointsGeometry, magentaPointMat)

      this.scene.add(this.cyanLinesMesh)
      this.scene.add(this.magentaLinesMesh)
      this.scene.add(this.cyanPointsMesh)
      this.scene.add(this.magentaPointsMesh)
    }

    if (this.cyanLinesMesh && this.magentaLinesMesh &&
        this.cyanPointsMesh && this.magentaPointsMesh) {
      const offset = intensity * 0.15
      this.cyanLinesMesh.position.set(-offset, offset, 0)
      this.magentaLinesMesh.position.set(offset, -offset, 0)
      this.cyanPointsMesh.position.set(-offset, offset, 0)
      this.magentaPointsMesh.position.set(offset, -offset, 0)

      const vis = active && intensity > 0.01
      this.cyanLinesMesh.visible = vis
      this.magentaLinesMesh.visible = vis
      this.cyanPointsMesh.visible = vis
      this.magentaPointsMesh.visible = vis

      if (vis) {
        ;(this.cyanLinesMesh.material as THREE.LineBasicMaterial).opacity = intensity * 0.15
        ;(this.magentaLinesMesh.material as THREE.LineBasicMaterial).opacity = intensity * 0.15
        ;(this.cyanPointsMesh.material as THREE.PointsMaterial).opacity = intensity * 0.6
        ;(this.magentaPointsMesh.material as THREE.PointsMaterial).opacity = intensity * 0.6
      }
    }
  }

  /**
   * Main render loop tick — called every frame.
   */
  render() {
    if (this.disposed) return

    const elapsed = this.clock.getElapsedTime()
    const progress = this.currentProgress
    const beatIndex = Math.min(3, Math.floor(progress * 4))
    const beatLocal = (progress * 4) % 1 // 0-1 within current beat

    // ── Animate node positions (subtle drift) ──
    const posAttr = this.pointsGeometry.getAttribute('position') as THREE.BufferAttribute
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i]
      // Gentle sine drift around base position
      const driftScale = 0.3
      node.position.x = node.basePosition.x + Math.sin(elapsed * 0.5 + node.phase) * driftScale
      node.position.y = node.basePosition.y + Math.cos(elapsed * 0.4 + node.phase * 1.3) * driftScale
      node.position.z = node.basePosition.z + Math.sin(elapsed * 0.3 + node.phase * 0.7) * driftScale * 0.5

      posAttr.setXYZ(i, node.position.x, node.position.y, node.position.z)
    }
    posAttr.needsUpdate = true

    // ── Update connections (denser with progress) ──
    this.updateLines(progress)

    // ── Rotate scene based on progress + time ──
    const baseRotationSpeed = 0.08
    const progressRotation = progress * Math.PI * 0.5
    this.pointsMesh.rotation.y = elapsed * baseRotationSpeed + progressRotation
    this.pointsMesh.rotation.x = Math.sin(elapsed * 0.05) * 0.1 + progress * 0.2
    this.linesMesh.rotation.copy(this.pointsMesh.rotation)

    // ── Camera distance (pulls in as progress increases) ──
    const baseDist = 12
    const closeDist = 8
    this.camera.position.z = baseDist - (baseDist - closeDist) * progress

    // ── Color transitions ──
    const colors = this.targetBeatColors

    // Smoothly interpolate point color
    const currentColor = new THREE.Color(this.pointsMaterial.color)
    const targetColor = new THREE.Color(colors.primary)
    currentColor.lerp(targetColor, 0.08)
    this.pointsMaterial.color.copy(currentColor)

    // Lines follow but dimmer
    const lineColor = new THREE.Color(colors.primary)
    const currentLineColor = new THREE.Color(this.linesMaterial.color)
    currentLineColor.lerp(lineColor, 0.08)
    this.linesMaterial.color.copy(currentLineColor)

    // Line opacity increases with progress (network "coming together")
    this.linesMaterial.opacity = 0.12 + progress * 0.18
    this.pointsMaterial.opacity = 0.7 + progress * 0.3

    // ── Beat 4: CMYK chromatic split ──
    const isBeat4 = beatIndex === 3
    const cmykIntensity = isBeat4 ? beatLocal : 0
    this.updateCMYKGhosts(isBeat4, cmykIntensity)

    // Sync ghost rotations
    if (this.cyanLinesMesh) {
      this.cyanLinesMesh.rotation.copy(this.linesMesh.rotation)
      this.magentaLinesMesh!.rotation.copy(this.linesMesh.rotation)
      this.cyanPointsMesh!.rotation.copy(this.pointsMesh.rotation)
      this.magentaPointsMesh!.rotation.copy(this.pointsMesh.rotation)
    }

    // ── Point size pulses subtly ──
    this.pointsMaterial.size = 0.06 + Math.sin(elapsed * 2) * 0.02 + progress * 0.04

    // ── Render ──
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.disposed = true
    this.pointsGeometry.dispose()
    this.linesGeometry.dispose()
    this.pointsMaterial.dispose()
    this.linesMaterial.dispose()

    // Dispose ghost layers
    if (this.cyanLinesMesh) {
      ;(this.cyanLinesMesh.material as THREE.Material).dispose()
      ;(this.magentaLinesMesh!.material as THREE.Material).dispose()
      ;(this.cyanPointsMesh!.material as THREE.Material).dispose()
      ;(this.magentaPointsMesh!.material as THREE.Material).dispose()
    }

    this.renderer.dispose()
  }
}
